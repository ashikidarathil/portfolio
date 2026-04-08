import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlobeWireframe() {
  const meshRef = useRef();
  const lineRef = useRef();

  const { positions } = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.8, 24, 24);
    return { positions: geo };
  }, []);

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    lineRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshStandardMaterial
          color="#915EFF"
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.08}
        />
      </mesh>
      <mesh ref={lineRef}>
        <sphereGeometry args={[1.82, 24, 24]} />
        <meshStandardMaterial
          color="#915EFF"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Rings */}
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[2.1, 0.012, 16, 100]} />
        <meshStandardMaterial color="#00d4ff" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0.8, 0.2]}>
        <torusGeometry args={[2.3, 0.008, 16, 100]} />
        <meshStandardMaterial color="#ff6bff" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

function GlobeCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#915EFF" />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#00d4ff" />
        <GlobeWireframe />
      </Canvas>
    </div>
  );
}

export default GlobeCanvas;
