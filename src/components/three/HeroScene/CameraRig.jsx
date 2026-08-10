"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sectionVisibility } from "@/stores/sectionVisibility";

/**
 * CameraRig manages the cinematic, smooth movement of the camera.
 * It features continuous gentle idle rotation and damped mouse parallax
 * without aggressive snapping.
 */
export default function CameraRig({ children }) {
  const group = useRef();
  
  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Normalize mouse coordinates
    const mouseX = (state.pointer.x * state.viewport.width) / 100;
    const mouseY = (state.pointer.y * state.viewport.height) / 100;
    
    // Calculate target position based on mouse parallax
    const targetX = mouseX;
    const targetY = mouseY;
    
    // Apply damped interpolation (lerp) for smooth motion
    const lerpSpeed = sectionVisibility?.contact ? 0.5 : 2.0;
    const targetFactor = sectionVisibility?.contact ? 0.15 : 1.0;
    
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX * targetFactor, delta * lerpSpeed);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY * targetFactor, delta * lerpSpeed);
    
    // Imperceptible idle rotation drift (<= 0.05 deg ~ 0.00087 rad when observing wormhole)
    const driftAmp = sectionVisibility?.contact ? 0.00085 : 0.015;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * driftAmp;
    group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * driftAmp;
  });

  return <group ref={group}>{children}</group>;
}
