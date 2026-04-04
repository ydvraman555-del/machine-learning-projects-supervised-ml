import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Solar Panel 3D Model
function SolarPanel({ position, rotation }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Panel base */}
      <mesh>
        <boxGeometry args={[1.5, 0.05, 1]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Panel cells */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[1.4, 0.02, 0.9]} />
        <meshStandardMaterial 
          color="#0d2137" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#00d4ff"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Grid lines on panel */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[-0.5 + i * 0.35, 0.04, 0]}>
          <boxGeometry args={[0.02, 0.01, 0.9]} />
          <meshBasicMaterial color="#00d4ff" opacity={0.3} transparent />
        </mesh>
      ))}
      {/* Support stand */}
      <mesh position={[0, -0.3, -0.3]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
    </group>
  );
}

// Wind Turbine 3D Model
function WindTurbine({ position }) {
  const groupRef = useRef();
  const bladesRef = useRef();

  useFrame((state) => {
    if (bladesRef.current) {
      // Rotate blades
      bladesRef.current.rotation.z += 0.05;
    }
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Tower */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 2]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Nacelle */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.2]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      {/* Hub */}
      <mesh position={[0.15, 2, 0]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#cbd5e0" />
      </mesh>
      {/* Blades */}
      <group ref={bladesRef} position={[0.15, 2, 0]}>
        {[0, 120, 240].map((angle, i) => (
          <mesh key={i} rotation={[0, 0, (angle * Math.PI) / 180]}>
            <boxGeometry args={[0.08, 1.2, 0.02]} />
            <meshStandardMaterial color="#e2e8f0" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Oil Rig 3D Model
function OilRig({ position }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Platform base */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.7, 0.2]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      {/* Legs */}
      {[[-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]].map((pos, i) => (
        <mesh key={i} position={[pos[0], -0.5, pos[1]]}>
          <cylinderGeometry args={[0.05, 0.05, 1]} />
          <meshStandardMaterial color="#2d3748" />
        </mesh>
      ))}
      {/* Derrick/Tower */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.15, 1.5, 0.15]} />
        <meshStandardMaterial color="#744210" />
      </mesh>
      {/* Drill pipe */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      {/* Flame at top */}
      <mesh position={[0.1, 1.6, 0]}>
        <sphereGeometry args={[0.08]} />
        <meshBasicMaterial color="#ed8936" />
      </mesh>
    </group>
  );
}

// Clean Energy Scene
function CleanEnergyScene() {
  return (
    <group>
      <SolarPanel position={[-1.5, 0, 0]} rotation={[-0.2, 0.3, 0]} />
      <SolarPanel position={[1.5, 0, 0]} rotation={[-0.2, -0.3, 0]} />
      <WindTurbine position={[0, 0, -1]} />
      <WindTurbine position={[-2.5, 0, -1]} scale={0.8} />
      <WindTurbine position={[2.5, 0, -1]} scale={0.8} />
    </group>
  );
}

// Fossil Fuel Scene
function FossilFuelScene() {
  return (
    <group>
      <OilRig position={[-1, 0, 0]} />
      <OilRig position={[1.5, 0, 0.5]} />
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[4, 4, 0.2]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
    </group>
  );
}

const EnergyVisualization3D = ({ isClean }) => {
  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color={isClean ? '#10b981' : '#ed8936'} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        {isClean ? <CleanEnergyScene /> : <FossilFuelScene />}
      </Canvas>
    </div>
  );
};

export default EnergyVisualization3D;
