import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Main Sphere component
function EnergySphere() {
  const meshRef = useRef();
  const wireRef = useRef();
  const ringRef = useRef();

  // Animation loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Main Sphere with Distortion */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 10]} />
          <MeshDistortMaterial
            color="#0a1628"
            emissive="#00d4ff"
            emissiveIntensity={0.5}
            distort={0.3}
            speed={2}
            roughness={0}
            metalness={1}
          />
        </mesh>

        {/* Wireframe Overlay */}
        <mesh ref={wireRef} scale={1.05}>
          <icosahedronGeometry args={[2, 10]} />
          <meshBasicMaterial
            color="#00d4ff"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
      </Float>

      {/* Orbiting Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
      </mesh>

      {/* Static Rings */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>

      {/* Energy Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos((i / 20) * Math.PI * 2) * (3.8 + Math.random() * 0.5),
            (Math.random() - 0.5) * 4,
            Math.sin((i / 20) * Math.PI * 2) * (3.8 + Math.random() * 0.5)
          ]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial 
            color={i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#8b5cf6' : '#10b981'} 
          />
        </mesh>
      ))}
    </group>
  );
}

const Globe3D = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <EnergySphere />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Globe3D;
