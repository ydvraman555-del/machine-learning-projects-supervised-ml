import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function EnergyResultSphere({ isClean, confidence }) {
  const meshRef = useRef();
  const particlesRef = useRef();

  // Color based on result
  const mainColor = isClean ? '#10b981' : '#ef4444';
  const glowColor = isClean ? '#34d399' : '#f87171';
  
  // Distortion intensity based on confidence (0.5 to 2.0)
  const distortionIntensity = 0.5 + (confidence * 1.5);

  // Create distorted geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5, 5);
    const positions = geo.attributes.position.array;
    
    // Add noise/distortion to vertices based on confidence
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      const noise = Math.sin(x * 3) * Math.cos(y * 3) * Math.sin(z * 3);
      const distortion = noise * distortionIntensity * 0.15;
      
      positions[i] += x * distortion;
      positions[i + 1] += y * distortion;
      positions[i + 2] += z * distortion;
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [distortionIntensity]);

  // Create particles
  const particlesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 100;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2 + Math.random() * 0.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      // Auto rotation
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Pulsing scale based on confidence
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02 * confidence;
      meshRef.current.scale.setScalar(pulse);
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.002;
    }
  });

  return (
    <group>
      {/* Main Sphere */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={mainColor}
          metalness={0.8}
          roughness={0.2}
          emissive={glowColor}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh geometry={geometry} scale={1.02}>
        <meshBasicMaterial
          color={glowColor}
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh scale={0.8}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent={true}
          opacity={0.2}
        />
      </mesh>

      {/* Outer glow */}
      <mesh scale={1.3}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent={true}
          opacity={0.1}
        />
      </mesh>

      {/* Orbiting Particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          color={glowColor}
          size={0.05}
          transparent={true}
          opacity={0.8}
        />
      </points>

      {/* Energy rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshBasicMaterial color={glowColor} transparent opacity={0.5} />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshBasicMaterial color={mainColor} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

const ResultOrb3D = ({ isClean, confidence }) => {
  return (
    <div className="w-full h-[350px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={isClean ? '#10b981' : '#ef4444'} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color={isClean ? '#34d399' : '#f87171'} />
        
        <EnergyResultSphere isClean={isClean} confidence={confidence} />
      </Canvas>
    </div>
  );
};

export default ResultOrb3D;
