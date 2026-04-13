import { useRef, useMemo } from 'react';
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
      {/* Top Cone */}
      <mesh position={[0, 1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1, 1, 16, 1]} />
        <WireframeMaterial />
      </mesh>
      {/* Bottom Cone */}
      <mesh position={[0, -1, 0]}>
        <coneGeometry args={[1, 1, 16, 1]} />
        <WireframeMaterial />
      </mesh>
      {/* Frame */}
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
        const s = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
        meshRef.current.scale.set(s, s, s);
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
    
    // Create a terrain-like geometry
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(4, 4, 32, 32);
        return geo;
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            const position = meshRef.current.geometry.attributes.position;
            
            for (let i = 0; i < position.count; i++) {
                const x = position.getX(i);
                const y = position.getY(i);
                // Simple wave function
                const z = Math.sin(x * 1.5 + time) * 0.2 + Math.cos(y * 1.5 + time) * 0.2;
                position.setZ(i, z);
            }
            position.needsUpdate = true;
            meshRef.current.rotation.x = -Math.PI / 3;
            meshRef.current.rotation.z = time * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry}>
            <WireframeMaterial />
        </mesh>
    );
};

interface BentoVisualProps {
  type: 'hourglass' | 'torus' | 'waveform';
}

const BentoVisual = ({ type }: BentoVisualProps) => {
  return (
    <div className="w-full h-full min-h-[180px] cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          {type === 'hourglass' && <Hourglass />}
          {type === 'torus' && <Torus />}
          {type === 'waveform' && <Waveform />}
        </Float>
      </Canvas>
    </div>
  );
};

export default BentoVisual;
