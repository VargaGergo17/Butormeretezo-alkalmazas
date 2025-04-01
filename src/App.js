import React, { useState } from "react";
import * as THREE from "three"; // This imports Three.js itself
import { Canvas, useThree } from "@react-three/fiber"; // Canvas and 3D handling
import { PresentationControls, Stage } from "@react-three/drei"; // Controls and stage for 3D
import "./App.css";
import Furniture from "./src/components/Furniture";
import { jsPDF } from "jspdf";
import { OrbitControls } from "@react-three/drei";



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
  const [ishandle, setHandle] = useState(false); // Initialize as a boolean

  
const generatePDF = () => {
    const doc = new jsPDF();
    const parts = calculateParts(parseFloat(width), parseFloat(height), parseFloat(depth), selectedModel, shelfCount);
  
    doc.text("Bútorméretezési terv", 10, 10);
    doc.text("Típus: " + selectedModel, 10, 20);
  
    let y = 30;
    parts.forEach((part) => {
      doc.text(`${part.name}: ${part.width} cm x ${part.height} cm`, 10, y);
      y += 10;
    });
  
    doc.save("butormeretek.pdf");
  };

  const calculateParts = (width, height, depth, selectedModel, shelfCount) => {
    let parts = [];

    switch (selectedModel) {
      case "egyajtos":
        parts = [
          { name: "Oldallap", width: depth, height },
          { name: "Tetolap", width, height: depth },
          { name: "Ajtó", width, height },
        ];
        break;
      case "ketajtos":
        parts = [
          { name: "Oldallap", width: depth, height },
          { name: "Tetőlap", width, height: depth },
          { name: "Ajtó 1", width: width / 2, height },
          { name: "Ajtó 2", width: width / 2, height },
        ];
        break;
      case "fiokos":
        for (let i = 0; i < shelfCount; i++) {
          parts.push({ name: "Fiók" `${i + 1}`, width, height: depth / 2 });
        }
        parts.push({ name: "Oldallap", width: depth, height });
        parts.push({ name: "Tetőlap", width, height: depth });
        break;
      case "polcos":
        parts = [
          { name: "Oldallap", width: depth, height },
          { name: "Tetőlap", width, height: depth },
          { name: "Fiókelőlap", width, height: height / 3 },
        ];
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

    if (numWidth > 0 && numHeight > 0 && numDepth > 0) {
      const parts = calculateParts(numWidth, numHeight, numDepth, selectedModel, shelfCount,numThickness);
      setResult(parts);
    } else {
      alert("Minden mezőt ki kell tölteni érvényes értékekkel!");
    }
  };

 


  return (
    <div className="container">
      <div className="controls">
        <h1>Bútorméretező Alkalmazás</h1>
        <div>
          <select onChange={(e) => setSelectedModel(e.target.value)}>
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
                checked={ishandle} // Use 'checked' for boolean state
                onChange={(e) => setHandle(e.target.checked)} // Update state with 'checked'
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
                  {part.name}: {part.width} cm x {part.height} cm
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
        <Canvas camera={{ position: [4, 2, -8], fov: 10 }} style={{ width: "100%", height: "100%" }}>
          <OrbitControls
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1}
          />
          <PresentationControls speed={1.5} polar={[-0.1, Math.PI / 4]}>
            <Stage intensity={1.5} environment="sunset" adjustCamera={2}>
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
              />
            </Stage>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
              <planeGeometry args={[10, 10]} />
              <meshBasicMaterial color="cyan" />
            </mesh>
            <gridHelper args={[10, 10, `white`, `gray`]} position={[0, -0.8, 0]} />
          </PresentationControls>
        </Canvas>
      </div>
    </div>
  );
}

export default App;