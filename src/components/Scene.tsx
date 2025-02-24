import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Room() {
  const roomRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (roomRef.current) {
      roomRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={roomRef}>
      <boxGeometry args={[4, 3, 6]} />
      <meshStandardMaterial color="#64748b" transparent opacity={0.7} />
      {/* Simple interior elements */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[4, 0.1, 6]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* Windows */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[0.1, 2, 1]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[0.1, 2, 1]} />
        <meshStandardMaterial color="#0ea5e9" transparent opacity={0.3} />
      </mesh>
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="h-[500px] w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[8, 5, 8]} />
        <OrbitControls enableDamping />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Room />
      </Canvas>
    </div>
  );
}