import React, { useState } from "react";
import { useLoader } from "@react-three/fiber"; // To load textures
import * as THREE from "three"; 

function Furniture({thickness, width, height, depth, shelfCount, selectedModel, texturePath, drawerTexturePath, handle}) {
  const woodTexture = useLoader(THREE.TextureLoader, `/textures/${texturePath}`);
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;

  const drawerwoodTexture = useLoader(THREE.TextureLoader, `/textures/${drawerTexturePath}`);
  drawerwoodTexture.wrapS = drawerwoodTexture.wrapT = THREE.RepeatWrapping;

  const shelfHeight = height / (shelfCount + 1);
  const doorThickness = 0.02;
  const doorOffset = depth / 2 + doorThickness / 2;
  const handleOffset = 0.02;
  const handleHeight = height / 6; 
  const handleRadius = 0.015; 
  const handleLength = 0.08; 

  const [isDoorOpen, setIsDoorOpen] = useState(false);

  // Door animation logic: rotate 90 degrees when open
  const doorRotation = isDoorOpen ? -Math.PI / 2 : 0;

  const toggleDoor = () => {
    setIsDoorOpen((prevState) => !prevState);
  };

  const shelves = [];
  for (let i = 0; i < shelfCount; i++) {
    shelves.push(
      <mesh key={`shelf-${i}`} position={[0, (i + 1) * shelfHeight - height / 2, 0]}>
        <boxGeometry args={[width-thickness, shelfHeight / 3, depth]} />
        <meshStandardMaterial map={drawerwoodTexture} />
      </mesh>
    );
  }

  const drawers = [];
  const drawerHeight = height / (shelfCount + 1);
  for (let i = 0; i < shelfCount; i++) {
    drawers.push(
      <mesh key={`drawer-${i}`} position={[0, (i + 1) * drawerHeight - height / 2, 0]}>
        <boxGeometry args={[width-thickness, drawerHeight / 3, depth]} />
        <meshStandardMaterial map={drawerwoodTexture} />
      </mesh>
    );
  }

  return (
    <>
      {/* Left Side Panel */}
      <mesh position={[-width / 2, 0, 0]}>
        <boxGeometry args={[thickness, height, depth]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Right Side Panel */}
      <mesh position={[width / 2, 0, 0]}>
        <boxGeometry args={[thickness, height, depth]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Back Panel */}
      <mesh position={[0, 0, -depth / 2]}>
        <boxGeometry args={[width+thickness, height+thickness, thickness]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Top Panel */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width+thickness, thickness, depth]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Bottom Panel */}
      <mesh position={[0, -height / 2, 0]}>
        <boxGeometry args={[width+thickness, thickness, depth]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Door */}
      {selectedModel === "egyajtos" && (
        <group position={[-width / 2, 0, doorOffset]} rotation={[0, doorRotation, 0]}>
          <mesh position={[width / 2, 0, 0]} onClick={toggleDoor}>
            <boxGeometry args={[width+ thickness, height+thickness, doorThickness]} />
            <meshStandardMaterial map={drawerwoodTexture} />
          </mesh>
          {/* Handle */}
          {handle && (
            <mesh position={[width - 0.1, handleHeight, handleOffset]}>
              <cylinderGeometry args={[handleRadius, handleRadius, handleLength, 16]} />
              <meshStandardMaterial color="silver" />
            </mesh>
          )}
        </group>
      )}

      {/* Shelves */}
      {selectedModel === "polcos" && <>{shelves}</>}

      {/* Drawers */}
      {selectedModel === "fiokos" && <>{drawers}</>}

      {selectedModel === "ketajtos" && (
        <>
          <group position={[-width / 2, 0, doorOffset]} rotation={[0, doorRotation, 0]}>
            {/* Left Door */}
            <mesh position={[width / 4, 0, 0]} onClick={toggleDoor}>
              <boxGeometry args={[width / 2, height, doorThickness]} />
              <meshStandardMaterial map={drawerwoodTexture} />
            </mesh>
            {/* Left Handle */}
            {handle && (
              <mesh position={[width / 2, handleHeight, handleOffset]}>
                <cylinderGeometry args={[handleRadius, handleRadius, handleLength, 16]} />
                <meshStandardMaterial color="silver" />
              </mesh>
            )}
          </group>
          <group position={[width / 2, 0, doorOffset]} rotation={[0, -doorRotation, 0]}>
            {/* Right Door */}
            <mesh position={[-width / 4, 0, 0]} onClick={toggleDoor}>
              <boxGeometry args={[width / 2, height, doorThickness]} />
              <meshStandardMaterial map={drawerwoodTexture} />
            </mesh>
            {/* Right Handle */}
            {handle && (
              <mesh position={[-width / 2, handleHeight, handleOffset]}>
                <cylinderGeometry args={[handleRadius, handleRadius, handleLength, 16]} />
                <meshStandardMaterial color="silver" />
              </mesh>
            )}
          </group>
        </>
      )}
    </>
  );
}

export default Furniture;