import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useState } from "react";
import { MeshPhongMaterial, EdgesGeometry, LineSegments, LineBasicMaterial } from "three";
import * as THREE from "three";

function Box({ position, mode }: { position: [number, number, number]; mode: "translate" | "rotate" | "scale" }) {
  return (
    <TransformControls mode={mode}>
      <group position={position}>
        <mesh castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhongMaterial color="orange" />
        </mesh>
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial attach="material" color="white" linewidth={1} />
        </lineSegments>
      </group>
    </TransformControls>
  );
}

export default function App() {
  const [mode, setMode] = useState<"translate" | "rotate" | "scale">("translate");

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* 控制面板 */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          background: "white",
          padding: 8,
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 10,
        }}
      >
        <label style={{ marginRight: 8 }}>Transform mode:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "translate" | "rotate" | "scale")}
          style={{ padding: "4px 8px" }}
        >
          <option value="translate">Translate</option>
          <option value="rotate">Rotate</option>
          <option value="scale">Scale</option>
        </select>
      </div>

      {/* 3D 场景 */}
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} castShadow />
        <gridHelper args={[10, 10]} />
        <Box position={[0, 0.5, 0]} mode={mode} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}