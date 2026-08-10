"use client";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import HeroScene from "../HeroScene/HeroScene";
import { sectionVisibility } from "@/stores/sectionVisibility";

// Fade the drei Stars out when the wormhole is active
// (the wormhole shader has its own procedural stars)
function AdaptiveStars() {
  const starsRef = useRef();
  const opacRef  = useRef(1);

  useFrame((_, delta) => {
    if (!starsRef.current) return;
    const target = sectionVisibility.contact ? 0 : 1;
    opacRef.current = THREE.MathUtils.lerp(opacRef.current, target, delta * 1.5);
    if (starsRef.current.material) {
      starsRef.current.material.opacity = opacRef.current;
      starsRef.current.material.transparent = true;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
}

import * as THREE from "three";

export default function SceneCanvas() {
  const [dpr, setDpr] = useState([1, 2]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setDpr([1, isMobile ? 1.25 : 2]);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-full">
      <Canvas dpr={dpr} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <color attach="background" args={["#050505"]} />
        
        <Suspense fallback={null}>
          <AdaptiveStars />
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
