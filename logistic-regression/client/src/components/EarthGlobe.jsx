import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Earth sphere with texture
function Earth({ onCountryClick }) {
  const meshRef = useRef();
  const atmosphereRef = useRef();
  const cloudsRef = useRef();

  // Create earth texture using canvas (since we don't have external images)
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Create gradient for ocean
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#1a365d');
    gradient.addColorStop(0.5, '#0d1f3c');
    gradient.addColorStop(1, '#1a365d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    // Add some "continents" as shapes
    ctx.fillStyle = '#0f2818';
    // North America-ish
    ctx.beginPath();
    ctx.ellipse(200, 150, 80, 60, 0, 0, Math.PI * 2);
    ctx.fill();
    // South America-ish
    ctx.beginPath();
    ctx.ellipse(280, 300, 50, 90, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // Europe/Africa-ish
    ctx.beginPath();
    ctx.ellipse(520, 200, 60, 120, 0, 0, Math.PI * 2);
    ctx.fill();
    // Asia-ish
    ctx.beginPath();
    ctx.ellipse(750, 180, 120, 80, 0, 0, Math.PI * 2);
    ctx.fill();
    // Australia-ish
    ctx.beginPath();
    ctx.ellipse(850, 350, 50, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Create bump map
  const bumpMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Noise pattern for bump map
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const gray = Math.random() * 100 + 100;
      ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
      ctx.fillRect(x, y, 2, 2);
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Country marker positions (simplified)
  const countryMarkers = useMemo(() => [
    { name: 'United States', lat: 37, lon: -95, pos: [0.5, 0.3, 0.8] },
    { name: 'Brazil', lat: -14, lon: -51, pos: [0.6, -0.4, 0.7] },
    { name: 'United Kingdom', lat: 55, lon: -3, pos: [0.3, 0.6, 0.7] },
    { name: 'India', lat: 20, lon: 78, pos: [-0.2, 0.2, 0.95] },
    { name: 'China', lat: 35, lon: 104, pos: [-0.4, 0.4, 0.85] },
    { name: 'Australia', lat: -25, lon: 133, pos: [-0.7, -0.4, 0.6] },
    { name: 'Germany', lat: 51, lon: 9, pos: [0.35, 0.55, 0.75] },
    { name: 'Japan', lat: 36, lon: 138, pos: [-0.6, 0.45, 0.65] },
  ], []);

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0015;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group>
      {/* Earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpMap}
          bumpScale={0.05}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef} scale={1.02}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="white"
          transparent={true}
          opacity={0.15}
          roughness={1}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Country markers */}
      {countryMarkers.map((country, index) => (
        <mesh
          key={index}
          position={country.pos}
          onClick={() => onCountryClick && onCountryClick(country.name)}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#00d4ff" />
        </mesh>
      ))}

      {/* Energy rings around earth */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.008, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

const EarthGlobe = ({ onCountryClick }) => {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
        <Earth onCountryClick={onCountryClick} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          rotateSpeed={0.5}
          minDistance={4}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
};

export default EarthGlobe;
