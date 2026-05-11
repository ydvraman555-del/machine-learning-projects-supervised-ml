import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ReactorCore() {
  const coreRef = useRef();
  const shellRef = useRef();
  const ringsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.3;
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = -t * 0.2;
      shellRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Central Energy Sphere */}
        <mesh ref={coreRef} scale={1.3}>
          <icosahedronGeometry args={[1.5, 10]} />
          <MeshDistortMaterial
            color="#ff9d00"
            emissive="#ffcc00"
            emissiveIntensity={2}
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
          />
        </mesh>

        {/* Outer Hexagonal Shell */}
        <mesh ref={shellRef} scale={1.6}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffcc00"
            emissiveIntensity={0.5}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Inner Glow Sphere */}
        <Sphere args={[1.2, 32, 32]} scale={1}>
          <meshBasicMaterial color="#ffcc00" transparent opacity={0.15} />
        </Sphere>
      </Float>

      {/* Orbiting Energy Rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ffcc00" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[3.3, 0.015, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Ambient static particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#ff9d00" : "#ffffff"} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

const EnergyCore3D = () => {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ff9d00" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffcc00" />
        <spotLight position={[0, 10, 0]} intensity={1} angle={0.3} penumbra={1} color="#ffffff" />
        
        <ReactorCore />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default EnergyCore3D;
