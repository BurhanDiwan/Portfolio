"use client";
import { useEffect, useState, Suspense, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import AbstractGeometry from "./AbstractGeometry";
import SceneLighting from "./SceneLighting";
import CameraRig from "./CameraRig";
import Particles from "./Particles";
import GlobalTransitions from "../Canvas/GlobalTransitions";

export default function HeroScene() {
  const { viewport } = useThree();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Determine layout shift based on viewport width
    setIsMobile(viewport.width < 5);
  }, [viewport.width]);

  const heroGroupRef = useRef();

  return (
    <>
      <SceneLighting />
      
      {/* 
        CameraRig encapsulates all scene elements to apply smooth parallax
        relative to mouse movement without moving the actual camera object,
        which could break post-processing or raycasting.
      */}
      <CameraRig>
        {/* Position geometry based on device (centered on mobile, right on desktop) */}
        <group 
          ref={heroGroupRef} 
          position={isMobile ? [0, viewport.height / 3.5, 0] : [viewport.width / 4, 0, 0]}
          scale={isMobile ? 0.4 : 1}
        >
          <AbstractGeometry />
        </group>
        
        {/* Background depth particles */}
        <Particles count={150} />
      </CameraRig>

      <GlobalTransitions heroGroupRef={heroGroupRef} />
    </>
  );
}
