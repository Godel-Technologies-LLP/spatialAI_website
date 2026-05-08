import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Points, PointMaterial, Preload } from '@react-three/drei';
import * as THREE from 'three';

/**
 * LogicCore Component
 * Memoizes geometry and material to prevent redundant GPU allocations.
 */
const LogicCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Strictly memoize and manage disposal
  const assets = useMemo(() => {
    const outerGeom = new THREE.IcosahedronGeometry(2, 1);
    const outerMat = new THREE.MeshBasicMaterial({ 
      color: "#000000", 
      wireframe: true, 
      transparent: true, 
      opacity: 0.15 
    });
    
    const innerGeom = new THREE.OctahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshBasicMaterial({ 
      color: "#000000", 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3 
    });

    return { outerGeom, outerMat, innerGeom, innerMat };
  }, []);

  // Explicit cleanup on unmount
  useEffect(() => {
    return () => {
      assets.outerGeom.dispose();
      assets.outerMat.dispose();
      assets.innerGeom.dispose();
      assets.innerMat.dispose();
    };
  }, [assets]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = -time * 0.2;
      coreRef.current.rotation.y = -time * 0.25;
      const scale = 1 + Math.sin(time * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={assets.outerGeom} material={assets.outerMat} />
      <mesh ref={coreRef} geometry={assets.innerGeom} material={assets.innerMat} />
      <Sphere args={[0.2, 16, 16]}>
        <meshBasicMaterial color="#000000" />
      </Sphere>
    </group>
  );
};

/**
 * NeuralNetwork Component
 * Manages point cloud memory efficiently.
 */
const NeuralNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const nodes = useMemo(() => {
    const count = 100;
    const tempNodes = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 0.5;
      tempNodes[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      tempNodes[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      tempNodes[i * 3 + 2] = r * Math.cos(phi);
    }
    return tempNodes;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={nodes}>
      <PointMaterial
        transparent
        color="#000000"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
};

const InteractiveScene = () => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <LogicCore />
        <NeuralNetwork />
      </Float>
      <Preload all />
    </Suspense>
  );
};

export const SpatialVisual = () => {
  return (
    <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: true 
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#ffffff', 0);
        }}
      >
        <InteractiveScene />
      </Canvas>
    </div>
  );
};

export default SpatialVisual;

