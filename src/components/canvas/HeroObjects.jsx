import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

function FloatingOrb({ position = [0, 0, 0], color = "#915EFF", size = 0.6, speed = 1 }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.3 * speed;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.5 * speed;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function TorusKnot({ position = [0, 0, 0], color = "#00d4ff" }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={1.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[0.4, 0.12, 128, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function Octahedron({ position = [0, 0, 0], color = "#ff6bff" }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.4;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.25;
  });

  return (
    <Float speed={2.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#f59e0b" />
      <directionalLight position={[-5, -5, -5]} intensity={0.6} color="#14b8a6" />
      <pointLight position={[0, 3, 0]} intensity={1} color="#f97316" />

      <FloatingOrb position={[2.5, 0.5, -1]} color="#f59e0b" size={0.55} speed={1} />
      <FloatingOrb position={[-2.5, -0.5, -1]} color="#14b8a6" size={0.45} speed={0.8} />
      <TorusKnot position={[2, -1.5, -2]} color="#f97316" />
      <Octahedron position={[-2, 1.5, -1.5]} color="#14b8a6" />
      <FloatingOrb position={[0, 2.2, -3]} color="#fbbf24" size={0.35} speed={1.2} />
    </>
  );
}

function HeroCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <HeroScene />
      </Canvas>
    </div>
  );
}

export default HeroCanvas;
