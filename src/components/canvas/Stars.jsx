import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarField() {
  const ref = useRef();

  const sphere = useMemo(() => {
    const positions = new Float32Array(6000);
    for (let i = 0; i < 2000; i++) {
      // Random points in a sphere
      const r = 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f59e0b"
          size={0.003}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function StarFieldCanvas() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  );
}

export default StarFieldCanvas;
