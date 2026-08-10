"use client";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF, Center, Resize, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function AbstractGeometry() {
  const groupRef = useRef();

  // Load and cache the GLB model
  const { scene, animations } = useGLTF("/models/hero/burhan-developer-core.glb");
  const { actions } = useAnimations(animations, scene);

  // 1. Play any baked animations (satellites, rings, etc.) automatically
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (action) action.play();
      });
    }
  }, [actions]);

  // Target rotations for smooth damping
  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const time = useRef(0);

  // Listen for mouse movement and apply strict, front-facing idle animations
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    time.current += delta;

    // --- IDLE ANIMATION ---
    // Y axis: ±10 degrees (~0.17 rad)
    // X axis: ±4 degrees (~0.07 rad)
    const idleRotY = Math.sin(time.current * 0.4) * (10 * Math.PI / 180);
    const idleRotX = Math.cos(time.current * 0.3) * (4 * Math.PI / 180);

    // --- MOUSE PARALLAX ---
    // Limit parallax to ±10 degrees on Y, ±5 degrees on X
    const maxParallaxY = 10 * Math.PI / 180;
    const maxParallaxX = 5 * Math.PI / 180;
    
    // Mouse X controls Rotation Y, Mouse Y controls Rotation X (inverted for natural tilt)
    const parallaxY = state.pointer.x * maxParallaxY;
    const parallaxX = -(state.pointer.y * maxParallaxX); 

    // Combine Idle + Parallax
    const finalTargetY = idleRotY + parallaxY;
    const finalTargetX = idleRotX + parallaxX;

    // --- SMOOTH DAMPING ---
    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, finalTargetX, delta * 3);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, finalTargetY, delta * 3);

    // Apply clamped rotation so the "BD" logo NEVER rotates away
    groupRef.current.rotation.x = targetRotation.current.x;
    groupRef.current.rotation.y = targetRotation.current.y;
    
    // --- BREATHING SCALE ---
    // Very subtle rhythmic pulse
    const scale = 1 + Math.sin(time.current * 1.5) * 0.015;
    groupRef.current.scale.set(scale, scale, scale);

    // --- PROCEDURAL SECONDARY ANIMATIONS ---
    // If the model lacks baked animations, manually rotate dynamic elements based on naming conventions
    if (!animations || animations.length === 0) {
      scene.traverse((child) => {
        if (child.isMesh || child.isGroup) {
          const name = child.name.toLowerCase();
          
          if (name.includes("ring") || name.includes("orbit")) {
            child.rotation.z -= delta * 0.1;
            child.rotation.x += delta * 0.05;
          } else if (name.includes("satellite") || name.includes("float") || name.includes("particle")) {
            child.rotation.y += delta * 0.2;
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={2} // Float animation speed
        rotationIntensity={0} // Disabled rotation here to maintain strict manual control over the "BD" logo facing forward
        floatIntensity={0.5} // Up/down float displacement
        floatingRange={[-0.1, 0.1]} 
      >
        <Resize scale={3}>
          <Center>
            {/* The actual GLB model */}
            <primitive object={scene} />
          </Center>
        </Resize>
      </Float>
    </group>
  );
}

useGLTF.preload("/models/hero/burhan-developer-core.glb");
