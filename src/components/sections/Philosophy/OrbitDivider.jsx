"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function OrbitDivider() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale shrinks, rotates, and dissolves as user scrolls past
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1.3, 1.0, 0.7, 0.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.95], [0, 1, 0.8, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 270]);
  const particleOffset = useTransform(scrollYProgress, [0.6, 1], [0, 40]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8 sm:py-12 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
    >
      {/* Central Ambient Glowing Beam */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[1px]" />

      {/* Orbit Ring Container */}
      <motion.div
        style={{ scale, opacity, rotate }}
        className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-black/80 border border-white/15 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.08)]"
      >
        {/* Pulsing Outer Bloom Halo */}
        <div className="absolute -inset-3 rounded-full bg-white/5 blur-md animate-pulse" />

        {/* Dashed Rotating Ring */}
        <div className="absolute inset-1 rounded-full border border-dashed border-white/30 animate-[spin_15s_linear_infinite]" />
        
        {/* Inner Core Glowing Dot */}
        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#fff]" />

        {/* Dissolving Orbit Particles */}
        <motion.div
          style={{ x: particleOffset, opacity }}
          className="absolute -top-2 left-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#fff]"
        />
        <motion.div
          style={{ x: useTransform(particleOffset, (v) => -v), opacity }}
          className="absolute -bottom-2 left-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#fff]"
        />
      </motion.div>
    </div>
  );
}
