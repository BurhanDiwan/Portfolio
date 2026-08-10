"use client";

import { useGLTF, Float } from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

export default function CrystalModel(props) {
  const { scene } = useGLTF("/models/beyond-code/engineering-crystal.glb");
  const crystalRef = useRef();
  const { scrollY } = useScroll();
  const velocityRef = useRef(0);

  useLayoutEffect(() => {
    // Preserve the exact visual identity of the original crystal GLB.
    // We do not override the material properties (metalness, roughness, color)
    // because the original model already contains the premium cut-glass appearance,
    // sharp facets, and warm internal reflections.
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        
        // Slightly boost environment reflection if it has a physical material,
        // but never overwrite the base material properties.
        if (node.material) {
          node.material.envMapIntensity = 1.5;
          node.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (crystalRef.current) {
      // Get current scroll velocity (pixels per second)
      const rawVelocity = scrollY.getVelocity();
      
      // Smooth the velocity to prevent jerky starts/stops
      velocityRef.current = THREE.MathUtils.lerp(
        velocityRef.current,
        rawVelocity,
        delta * 3 // Smoothing factor
      );

      // Base speed (increased from 0.075 to 0.15)
      const baseSpeed = 0.15;
      
      // Convert scroll velocity to rotation modifier
      // Use absolute value so it always speeds up rotation regardless of scroll direction
      const scrollModifier = Math.abs(velocityRef.current) * 0.001; 
      
      const currentSpeed = baseSpeed + scrollModifier;

      crystalRef.current.rotation.y += delta * currentSpeed; 
    }
  });

  return (
    <Float 
      speed={0.5} 
      rotationIntensity={0} 
      floatIntensity={0.1} // ~2-4px float
      floatingRange={[-0.05, 0.05]} 
    >
      <group ref={crystalRef} {...props}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

useGLTF.preload("/models/beyond-code/engineering-crystal.glb");
