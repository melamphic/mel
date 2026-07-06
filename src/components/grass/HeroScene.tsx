import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, OrbitControls, Bounds, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/models/lowpoly_medical_room.glb';

/** Locked polar angle — 77° from top, matching the user's chosen diorama angle */
const DIORAMA_POLAR = Math.PI * 0.428;

function MedicalRoom() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    const walk = actions['Armature|Walk'];
    walk?.reset().fadeIn(0.5).play();
    return () => {
      walk?.fadeOut(0.5);
    };
  }, [actions]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

/** Slowly orbiting green accent light for dynamic feel */
function DynamicGreenLight() {
  const light1 = useRef<THREE.SpotLight>(null);
  const light2 = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.3) * 500;
      light1.current.position.z = Math.cos(t * 0.3) * 400;
      light1.current.intensity = 2.5 + Math.sin(t * 0.5) * 0.8;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.2) * 350;
      light2.current.position.z = Math.sin(t * 0.25) * 450;
      light2.current.intensity = 1.5 + Math.sin(t * 0.4 + 1) * 0.5;
    }
  });

  return (
    <>
      {/* Orbiting green spotlight — Salvia brand #48CD5F */}
      <spotLight
        ref={light1}
        position={[-400, 450, 350]}
        angle={0.6}
        penumbra={0.95}
        intensity={2.5}
        color="#48CD5F"
        castShadow={false}
      />
      {/* Secondary softer green point light — deeper green */}
      <pointLight
        ref={light2}
        position={[300, 350, -400]}
        intensity={1.5}
        color="#1E7A4E"
        distance={1500}
        decay={1.5}
      />
    </>
  );
}

/** 3D Space Background using Stars and Sparkles (Nebula dust) */
function CosmicNebula() {
  return (
    <group position={[0, -200, -500]}>
      {/* Vibrant purple/pink galaxy dust on a white background */}
      <Sparkles
        count={500}
        scale={[1800, 1000, 1200]}
        size={40}
        speed={0.2}
        opacity={0.3}
        color="#1E7A4E" /* Dark Green */
      />

      {/* Secondary bright teal/white dust */}
      <Sparkles
        count={300}
        scale={[1500, 1200, 1000]}
        size={20}
        speed={0.4}
        opacity={0.5}
        color="#06B6D4" /* Cyan */
      />
    </group>
  );
}

function Scene() {
  return (
    <>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        minPolarAngle={DIORAMA_POLAR}
        maxPolarAngle={DIORAMA_POLAR}
        enableDamping
        dampingFactor={0.08}
      />

      <Environment preset="city" />

      {/* Warm ambient base */}
      <ambientLight intensity={0.55} color="#f5f0eb" />

      {/* Key light — warm from upper-right */}
      <directionalLight
        position={[400, 600, 300]}
        intensity={1.8}
        color="#fff5e8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={2000}
        shadow-camera-left={-500}
        shadow-camera-right={500}
        shadow-camera-top={500}
        shadow-camera-bottom={-500}
      />

      {/* Cool fill from the left */}
      <directionalLight
        position={[-350, 400, -200]}
        intensity={0.6}
        color="#dde8f5"
      />

      {/* 3D Cosmic Nebula & Starfield */}
      <CosmicNebula />

      {/* Dynamic green lights that slowly orbit */}
      <DynamicGreenLight />

      {/* Static green rim from behind for edge glow */}
      <spotLight
        position={[0, 400, -600]}
        angle={0.7}
        penumbra={0.9}
        intensity={1.8}
        color="#48CD5F"
      />

      {/* Green-tinted hemisphere — matches site --g-green */}
      <hemisphereLight args={['#c8e6c9', '#f5f0e8', 0.5]} />



      {/* Bounds auto-frames — no observe so no scroll re-fit */}
      <Bounds fit clip margin={1.3}>
        <MedicalRoom />
      </Bounds>
    </>
  );
}

export function HeroScene() {
  return (
    <div className="g-h3d-canvas-wrap">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 36, near: 0.1, far: 3000, position: [440, 182, 653] }}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ touchAction: 'pan-y' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
