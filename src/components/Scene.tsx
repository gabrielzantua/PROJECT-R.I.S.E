import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useState, useEffect } from 'react';
import { OrbitControls, Html, Stats, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';

// Debug mode flag - set to false to disable debugging features
const DEBUG_MODE = false;

// Simple loading component
function Loader() {
  return (
    <Html center>
      <div className="text-white text-lg">Loading Scene...</div>
    </Html>
  );
}

// Original MPH Court model
function MPHCourtModel() {
  const modelRef = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load the model
  const { scene, nodes, materials } = useGLTF('./models/model.gltf', undefined, 
    (e) => {
      console.error('Error loading model:', e);
      setError(e.message || 'Failed to load model');
    }
  );
  
  // Set up the model when it's loaded
  useEffect(() => {
    if (scene) {
      console.log('Model loaded successfully:', scene);
      
      // Store the scene in the ref
      if (modelRef.current) {
        // Clear any existing children
        while (modelRef.current.children.length > 0) {
          modelRef.current.remove(modelRef.current.children[0]);
        }
        
        // Add the loaded scene
        modelRef.current.add(scene.clone());
      }
      
      // Adjust scale and position
      scene.scale.set(1, 1, 1);
      scene.position.set(0, 0, 0);
      
      // Apply material adjustments
      scene.traverse((child: any) => {
        if (child.isMesh) {
          console.log('Found mesh:', child.name);
          
          // Enhance the existing material
          if (child.material) {
            child.material.needsUpdate = true;
            child.material.side = THREE.DoubleSide; // Render both sides
          }
          
          // Add shadows
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      setModelLoaded(true);
    }
  }, [scene]);
  
  // Removed the automatic rotation to allow free orbiting
  
  return (
    <>
      <group ref={modelRef} position={[0, 0, 0]} />
      
      {error && (
        <Html position={[0, 0, 0]} center>
          <div className="bg-red-900/70 p-4 rounded text-white">
            Error loading model: {error}
          </div>
        </Html>
      )}
      
      {modelLoaded && DEBUG_MODE && (
        <Html position={[0, 5, 0]}>
          <div className="bg-green-900/70 p-2 rounded text-white text-sm">
            Model loaded successfully
          </div>
        </Html>
      )}
    </>
  );
}

// Fallback model in case the original doesn't load
function FallbackModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Also removing rotation from fallback model
  
  return (
    <group ref={groupRef}>
      {/* Simple box to represent the MPH Court */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[20, 4, 30]} />
        <meshStandardMaterial color="#3b5998" wireframe />
      </mesh>
      
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 40]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      <Html position={[0, 6, 0]} center>
        <div className="bg-yellow-900/70 p-2 rounded text-white text-sm">
          Using fallback model (original model failed to load)
        </div>
      </Html>
    </group>
  );
}

export default function Scene() {
  const [useOriginalModel, setUseOriginalModel] = useState(true);
  const [modelLoadError, setModelLoadError] = useState(false);
  
  // Handle model loading error
  const handleModelError = () => {
    console.error('Failed to load original model, switching to fallback');
    setModelLoadError(true);
    setUseOriginalModel(false);
  };
  
  return (
    <div style={{ width: '100%', height: '100%', background: '#141824', borderRadius: '12px' }}>
      <Canvas
        camera={{ position: [0, 15, 30], fov: 45 }}
        shadows
      >
        <Suspense fallback={<Loader />}>
          {/* Environment and lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight 
            intensity={1.0} 
            position={[10, 20, 15]} 
            castShadow 
            shadow-mapSize-width={2048} 
            shadow-mapSize-height={2048}
          />
          <directionalLight intensity={0.6} position={[-10, 10, -10]} />
          <directionalLight intensity={0.4} position={[0, 10, -20]} />
          
          {/* Add a ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          
          {/* Grid helper */}
          <gridHelper args={[100, 100, 0x444444, 0x222222]} />
          
          {/* Axes helper */}
          <axesHelper args={[10]} />
          
          {/* Display the appropriate model */}
          {useOriginalModel ? (
            <ErrorBoundary onError={handleModelError}>
              <MPHCourtModel />
            </ErrorBoundary>
          ) : (
            <FallbackModel />
          )}
          
          {/* Controls with improved settings for better orbiting */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.8}
            enableZoom
            enablePan={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={100}
          />
          
          {/* Debug information */}
          {DEBUG_MODE && <Stats />}
        </Suspense>
      </Canvas>
      
      {/* Model toggle button */}
      {modelLoadError && (
        <div className="absolute bottom-4 left-4">
          <button 
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            onClick={() => setUseOriginalModel(!useOriginalModel)}
          >
            {useOriginalModel ? "Use Fallback Model" : "Try Original Model"}
          </button>
        </div>
      )}
    </div>
  );
}

// Error boundary component to catch errors in the model loading
class ErrorBoundary extends React.Component<{ children: React.ReactNode, onError: () => void }> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error: any) {
    console.error('Error in component:', error);
    this.props.onError();
  }
  
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}