"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutPortrait({ imageSrc }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax Y Displacement & Subtle Scale Change
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto lg:max-w-none">
      
      {/* Background Soft Glow Aura */}
      <div className="absolute -inset-8 rounded-[40px] bg-white/[0.03] blur-3xl pointer-events-none" />

      {/* Layer 1: Outer Translucent Architectural Border */}
      <motion.div
        style={{ y, scale }}
        className="relative z-10 p-3 rounded-[36px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
      >
        {/* Layer 2: Inner Glass Frame */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/40 p-2">
          
          {/* Animated Light Sheen Sweep Across Glass */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 pointer-events-none animate-[shimmer_8s_infinite] -translate-x-full" />

          {/* Portrait Image Container */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px]">
            <Image
              src={imageSrc || "/images/portrait.png"}
              alt="Burhan Diwan - Developer Portrait"
              fill
              className="object-cover object-top transition-transform duration-1000 ease-out hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />

            {/* Gradient Vignette for Editorial Finish */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>

        {/* Floating Museum Plaque Badge */}
        <div className="absolute -bottom-5 -right-2 px-5 py-2.5 rounded-2xl bg-black/90 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-white/90 uppercase">
            BURHAN DIWAN // 2026
          </span>
        </div>
      </motion.div>
    </div>
  );
}
