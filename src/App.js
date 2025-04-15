import React, { useState } from "react";
import * as THREE from "three"; 
import { Canvas, useThree } from "@react-three/fiber"; 
import {  Stage } from "@react-three/drei"; 
import "./App.css";
import Furniture from "./src/components/Furniture";
import { jsPDF } from "jspdf";
import { OrbitControls } from "@react-three/drei";
import autoTable from "jspdf-autotable";



const loadTexture = (path) => {
  if (!path) return new THREE.Texture();
  const textureLoader = new THREE.TextureLoader();
  return textureLoader.load(path);
};

const textureOptions = {
  "Sötét Fa": "Darkwood.jpg",
  "Natúr Fa": "wood.jpg",
  "Fehér Fa": "white.jpg",
  "Fenyő Fa": "Oak.jpg",
  "Természetes Fa": "natural.jpg"
};


const drawertextureOptions = {
 "Sötét Fa": "Darkwood.jpg",
  "Natúr Fa": "wood.jpg",
  "Fehér Fa": "white.jpg",
  "Fenyő Fa": "Oak.jpg",
  "Természetes Fa": "natural.jpg"
};


function App() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [thickness, setThickness] = useState("");
  const [result, setResult] = useState(null);
  const [selectedModel, setSelectedModel] = useState("egyajtos");
  const [shelfCount, setShelfCount] = useState(1);
  const [selectedTexture, setSelectedTexture] = useState("wood.jpg");
  const [drawerselectedTexture, setdrawerSelectedTexture] = useState("Darkwood.jpg");
  const [ishandle, setHandle] = useState(false);
  const [isbox, setBox] = useState(false);

  
const generatePDF = () => {
  const doc = new jsPDF();
  const parts = calculateParts(parseFloat(width), parseFloat(height), parseFloat(depth), parseFloat(thickness), selectedModel, shelfCount);


  // Header
  doc.setFontSize(18);
  doc.text("Bútorméretezési Terv", 105, 10, { align: "center" });
  doc.setFontSize(12);
  doc.text(`Típus: ${selectedModel}`, 10, 20);
  doc.text(`Dátum: ${new Date().toLocaleDateString()}`, 10, 30);

  // Textúra , részek
  doc.text(`Textúra: ${selectedTexture}`, 10, 40);
  doc.text(`Ajtó Textúra: ${drawerselectedTexture}`, 10, 45);
  doc.text(`Fogantyú: ${ishandle ? "Igen" : "Nem"}`, 10, 50);

  // Table Data
  const tableData = parts.map((part) => [part.name, `${part.width} cm`, `${part.height} cm`, `${part.thickness} cm`]);


  autoTable(doc, {
    head: [["Név", "Szélesség", "Magasság", "Vastagság"]],
    body: tableData,
    startY: 70, 
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Oldal ${i} / ${pageCount}`, 105, 290, { align: "center" });
    doc.text("Generálva a Bútorméretező Alkalmazással", 105, 280, { align: "center" });
  }

  doc.save("butormeretek.pdf");
};

  const calculateParts = (width, height, depth,thickness, selectedModel, shelfCount) => {
    let parts = [];

    switch (selectedModel) {
      case "egyajtos": 
        parts = [
          { name: "Oldallap 1", width: depth, height, thickness },
          { name: "Oldallap 2", width: depth, height, thickness },
          { name: "Hátlap", width, height, thickness },
          { name: "Tetőlap", width, height: depth, thickness },
          { name: "Alaplap", width, height: depth, thickness },
          { name: "Ajtó", width, height, thickness },
        ];
        break;

      case "ketajtos": 
        parts = [
          { name: "Oldallap 1", width: depth, height, thickness },
          { name: "Oldallap 2", width: depth, height, thickness },
          { name: "Hátlap", width, height, thickness },
          { name: "Tetőlap", width, height: depth, thickness },
          { name: "Alaplap", width, height: depth, thickness },
          { name: "Ajtó 1", width: width / 2, height, thickness },
          { name: "Ajtó 2", width: width / 2, height, thickness },
        ];
        break;

      case "fiokos": 
        for (let i = 0; i < shelfCount; i++) {
          parts.push({ name: `Fiók ${i + 1}`, width, height: depth / 2, thickness });
        }
        parts.push({ name: "Oldallap 1", width: depth, height, thickness });
        parts.push({ name: "Oldallap 2", width: depth, height, thickness });
        parts.push({ name: "Hátlap", width, height, thickness });
        parts.push({ name: "Tetőlap", width, height: depth, thickness });
        parts.push({ name: "Alaplap", width, height: depth, thickness });
        break;

      case "polcos": 
        parts = [
          { name: "Oldallap 1", width: depth, height, thickness },
          { name: "Oldallap 2", width: depth, height, thickness },
          { name: "Hátlap", width, height, thickness },
          { name: "Tetőlap", width, height: depth, thickness },
          { name: "Alaplap", width, height: depth, thickness },
        ];
        for (let i = 0; i < shelfCount; i++) {
          parts.push({ name: `Polc ${i + 1}`, width, height: depth, thickness });
        }
        break;

      default:
        parts = [];
    }

    return parts;
  };

  const handleCalculate = () => {
    const numWidth = parseFloat(width);
    const numHeight = parseFloat(height);
    const numDepth = parseFloat(depth);
    const numThickness = parseFloat(thickness);

    if (numWidth > 0 && numHeight > 0 && numDepth > 0 && numThickness > 0) {
      const parts = calculateParts(numWidth, numHeight, numDepth,numThickness, selectedModel, shelfCount);
      setResult(parts);
    } else {
      alert("Minden mezőt ki kell tölteni érvényes értékekkel!");
    }
  };

 


  return (
    <div className="container">
      <div className="controls">
        <h1>Bútorméretező Alkalmazás</h1>
        <div className="model-select">
          <select id="model" onChange={(e) => setSelectedModel(e.target.value)}>
            <option value="egyajtos">Egyajtós szekrény</option>
            <option value="ketajtos">Kétajtós szekrény</option>
            <option value="fiokos">Fiókos szekrény</option>
            <option value="polcos">Polcos szekrény</option>
          </select>
        </div>

        <div className="form-group">
          <label>Test Textúra:</label>
          <select onChange={(e) => setSelectedTexture(e.target.value)}>
          {Object.entries(textureOptions).map(([name, file]) => (
            <option key={file} value={file}>{name}</option>
          ))}
        </select>
        </div>

        <div className="form-group">
          <label>Ajtó Textúra:</label>
          <select onChange={(e) => setdrawerSelectedTexture(e.target.value)}>
          {Object.entries(drawertextureOptions).map(([name, file]) => (
            <option key={file} value={file}>{name}</option>
          ))}
        </select>
        </div>
        

        <div className="form-group">
          <label>Szélesség (cm):</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} min="1" />
        </div>

        <div className="form-group">
          <label>Magasság (cm):</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} min="1" />
        </div>

        <div className="form-group">
          <label>Mélység (cm):</label>
          <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} min="1" />
        </div>
        <div className="form-group">
          <label>Vastagság (cm):</label>
          <input type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} min="1" />
        </div>

        {selectedModel === "fiokos" && (
          <div className="form-group">
            <label>Fiókok száma:</label>
            <input
              type="number"
              value={shelfCount}
              onChange={(e) => setShelfCount(Math.max(1, parseInt(e.target.value)))}
              min="1"
            />
          </div>
        )}
        
        {selectedModel === "polcos" && (
          <div className="form-group">
            <label>Polcok száma:</label>
            <input
              type="number"
              value={shelfCount}
              onChange={(e) => setShelfCount(Math.max(1, parseInt(e.target.value)))}
              min="1"
            />
          </div>
        )}

        <div className="form-group-handle">
          <label>Fogantyú</label>
            <div className="checkbox-wrapper-2">
            <input
                type="checkbox"
                className="ikxBAC"
                checked={ishandle} 
                onChange={(e) => setHandle(e.target.checked)} 
            />
            </div>
            
            <label>1m X 1m - Arány doboz</label>
            <div className="checkbox-wrapper-2">
            <input
                type="checkbox"
                className="ikxBAC"
                checked={isbox} 
                onChange={(e) => setBox(e.target.checked)} 
            />
            </div>
        </div>

        <button onClick={handleCalculate}>Kiszámolás</button>

        {result && (
          <div className="results">
            <h2>Vágási lista:</h2>
            <ul>
              {result.map((part, index) => (
                <li key={index}>
                  {part.name}: {part.width} cm x {part.height} cm x {part.thickness} cm
                </li>
              ))}
            </ul>
            <button onClick={generatePDF} className="pdf-button">
              PDF Letöltése
            </button>
          </div>
        )}
      </div>

      <div className="three-d-panel">
        <div className="three-d-panel-header">
          
          <h1 className="title">3D megjelenítés
            <div className="aurora">
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
          </div></h1>
        </div>
        <Canvas
          camera={{
            position: [3, 3, 6], 
            fov: 50, 
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <Stage intensity={1.5} environment="sunset" adjustCamera={false}>
            
              <gridHelper args={[10, 10]} position={[0, -height / 200 - 0.1, 0]} rotation={[0, 0, 0]} />
            
            <Furniture
              width={width / 100}
              height={height / 100}
              depth={depth / 100}
              thickness={thickness / 100}
              shelfCount={shelfCount}
              selectedModel={selectedModel}
              texturePath={selectedTexture || "wood.jpg"}
              drawerTexturePath={drawerselectedTexture || "Darkwood.jpg"}
              handle={ishandle}
              box={isbox}
            />
          </Stage>
        </Canvas>
      </div>
    </div>
  );
}

export default App;