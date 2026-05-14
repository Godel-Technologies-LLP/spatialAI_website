import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const WireframeMaterial = () => (
    <meshBasicMaterial 
      color="#000000" 
      wireframe 
      transparent 
      opacity={0.15} 
    />
);

const Hourglass = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1, 1, 16, 1]} />
        <WireframeMaterial />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <coneGeometry args={[1, 1, 16, 1]} />
        <WireframeMaterial />
      </mesh>
      <mesh>
        <cylinderGeometry args={[1.1, 1.1, 2.2, 16, 1, true]} />
        <WireframeMaterial />
      </mesh>
    </group>
  );
};

const Torus = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.2, 0.4, 16, 64]} />
      <WireframeMaterial />
    </mesh>
  );
};

const Waveform = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const geometry = useMemo(() => new THREE.PlaneGeometry(4, 4, 16, 16), []);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
            meshRef.current.position.z = Math.sin(state.clock.getElapsedTime()) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 3, 0, 0]}>
            <WireframeMaterial />
        </mesh>
    );
};

interface BentoVisualProps {
  type: 'hourglass' | 'torus' | 'waveform';
}

const BentoVisual = ({ type }: BentoVisualProps) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[180px] cursor-grab active:cursor-grabbing">
      {isInView ? (
        <Canvas dpr={1} gl={{ antialias: false }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
          <ambientLight intensity={0.5} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {type === 'hourglass' && <Hourglass />}
            {type === 'torus' && <Torus />}
            {type === 'waveform' && <Waveform />}
          </Float>
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center opacity-10">
           <div className="w-24 h-24 border border-black/20 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default BentoVisual;
