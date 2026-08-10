"use client";
import { Environment } from "@react-three/drei";

export default function SceneLighting() {
  return (
    <>
      {/* 
        High-quality studio environment mapping for PBR reflections.
        Crucial for the glass material to look realistic.
      */}
      {/*
        Locally hosted HDR — eliminates CDN fetch failure.
        File: /public/hdr/studio_small_03_1k.hdr (studio_small_03 from Polyhaven, 1k)
      */}
      <Environment files="/hdr/studio_small_03_1k.hdr" />
      
      {/* Fill Light: Soft overall illumination, low intensity to avoid washing out */}
      <ambientLight intensity={0.15} color="#ffffff" />
      
      {/* Key Light: Strong primary light creating highlights and defining shape */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.0}
        color="#ffffff"
        castShadow
      />
      
      {/* Rim Light: Defines the silhouette against the dark background */}
      <spotLight
        position={[-10, 10, -10]}
        intensity={1.5}
        color="#ffffff"
        angle={0.5}
        penumbra={1}
      />
      
      {/* Accent Light: Subtle cool tone for depth in shadows */}
      <pointLight position={[0, -5, 5]} intensity={0.8} color="#a1a1aa" />
    </>
  );
}
