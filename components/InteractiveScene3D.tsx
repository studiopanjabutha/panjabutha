'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import dynamic from 'next/dynamic';

const MobileControls = dynamic(() => import('./MobileControls'), { ssr: false });

// First Person Controls
function FirstPersonControls({ mobileKeys, setIsDragging }: { mobileKeys: any; setIsDragging: (val: boolean) => void }) {
  const { camera, gl } = useThree();
  const moveSpeed = 0.15;
  const lookSpeed = 0.003;
  
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const rotation = useRef({ y: 0, x: 0 });
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (mobileKeys) {
      keys.current = { ...keys.current, ...mobileKeys };
    }
  }, [mobileKeys]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': keys.current.forward = true; break;
        case 'KeyS': case 'ArrowDown': keys.current.backward = true; break;
        case 'KeyA': case 'ArrowLeft': keys.current.left = true; break;
        case 'KeyD': case 'ArrowRight': keys.current.right = true; break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': keys.current.forward = false; break;
        case 'KeyS': case 'ArrowDown': keys.current.backward = false; break;
        case 'KeyA': case 'ArrowLeft': keys.current.left = false; break;
        case 'KeyD': case 'ArrowRight': keys.current.right = false; break;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
      setIsDragging(true);
      gl.domElement.style.cursor = 'grabbing';
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      setIsDragging(false);
      gl.domElement.style.cursor = 'grab';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;

      rotation.current.y -= deltaX * lookSpeed;
      rotation.current.x -= deltaY * lookSpeed;
      rotation.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, rotation.current.x));

      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const onContextMenu = (e: Event) => {
      e.preventDefault();
    };

    const canvas = gl.domElement;
    
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('contextmenu', onContextMenu);

    // FIXED: Allow scrolling on mobile!
    canvas.style.touchAction = 'pan-y pinch-zoom';  // CHANGED!
    canvas.style.cursor = 'grab';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('contextmenu', onContextMenu);
    };
  }, [gl, setIsDragging]);

  useFrame(() => {
    const euler = new THREE.Euler(rotation.current.x, rotation.current.y, 0, 'YXZ');
    camera.quaternion.setFromEuler(euler);

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(camera.up, direction).normalize();

    if (keys.current.forward) camera.position.addScaledVector(direction, -moveSpeed);
    if (keys.current.backward) camera.position.addScaledVector(direction, moveSpeed);
    if (keys.current.left) camera.position.addScaledVector(right, -moveSpeed);
    if (keys.current.right) camera.position.addScaledVector(right, moveSpeed);

    camera.position.y = 1.6;
  });

  return null;
}

// GLB Model
function BuildingModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 15 / maxDim;
      
      scene.position.sub(center);
      scene.position.y += size.y * scale / 2;
      scene.scale.setScalar(scale);

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // @ts-ignore
          child.raycast = () => {};
        }
      });
    }
  }, [scene]);

  return <primitive object={scene} />;
}

function LoadingPlaceholder() {
  return (
    <group>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ff6600" wireframe />
      </mesh>
      <pointLight position={[0, 3, 0]} intensity={1} />
    </group>
  );
}

function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <gridHelper args={[100, 100, '#cccccc', '#dddddd']} position={[0, 0.01, 0]} />
    </>
  );
}

interface InteractiveScene3DProps {
  modelUrl?: string;
}

export default function InteractiveScene3D({ modelUrl }: InteractiveScene3DProps) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [mobileKeys, setMobileKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const handleMobileMove = (direction: 'forward' | 'backward' | 'left' | 'right', active: boolean) => {
    setMobileKeys(prev => ({ ...prev, [direction]: active }));
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Canvas with touch-action fix */}
      <div style={{ width: '100%', height: '100%', touchAction: 'pan-y pinch-zoom' }}>
        <Canvas shadows style={{ width: '100%', height: '100%' }}>
          <Suspense fallback={<LoadingPlaceholder />}>
            <PerspectiveCamera makeDefault position={[0, 1.6, 10]} fov={75} />
            <FirstPersonControls mobileKeys={mobileKeys} setIsDragging={setIsDragging} />

            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 15, 10]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[0, 5, 0]} intensity={0.5} />

            <Environment preset="city" />
            <Ground />

            {modelUrl ? (
              <BuildingModel url={modelUrl} />
            ) : (
              <group position={[0, 1, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[3, 3, 3]} />
                  <meshStandardMaterial color="#ff0000" wireframe />
                </mesh>
              </group>
            )}
          </Suspense>
        </Canvas>
      </div>

      {/* Mobile Controls */}
      <div className="block md:hidden" style={{ pointerEvents: 'auto' }}>
        <MobileControls onMove={handleMobileMove} />
      </div>

      {/* Instructions */}
      {showInstructions && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0,0,0,0.95)',
          color: 'white',
          padding: '50px 80px',
          borderRadius: '20px',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 100,
          border: '3px solid rgba(255,255,255,0.3)',
          maxWidth: '90%',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '19px' }}>
            <div className="hidden md:block" style={{ backgroundColor: 'rgba(0,200,0,0.2)', padding: '20px', borderRadius: '12px', border: '2px solid rgba(0,255,0,0.5)' }}>
              <p style={{ fontSize: '22px', marginBottom: '8px' }}>🖱️ <strong>HOLD & DRAG MOUSE</strong></p>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>Keep button pressed and move!</p>
            </div>
            <p className="hidden md:block" style={{ fontSize: '18px' }}>
            <strong>W A S D to move</strong>
            </p>
            <p className="md:hidden" style={{ fontSize: '18px' }}>
             <strong>DRAG SCREEN</strong> to look around
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </div>
  );
}
