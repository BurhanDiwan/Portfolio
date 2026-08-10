"use client";

import Image from "next/image";

export default function LaptopMockup({ imageSrc, videoSrc, title, className = "" }) {
  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* Laptop Lid Screen Bezel — natural aspect ratio drives height */}
      <div className="relative w-full aspect-[16/10] rounded-t-xl border-[6px] border-[#1e1e1e] bg-black shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Camera notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 w-2.5 h-2.5 rounded-full bg-[#111] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-blue-900/60" />
        </div>

        {/* Screen content */}
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-contain object-top bg-white/[0.02]"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={title || "Laptop View"}
            fill
            className="object-contain object-top bg-white/[0.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        )}
        {/* Glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
      </div>

      {/* Laptop Base */}
      <div className="relative w-[106%] -ml-[3%] h-3 bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0d0d0d] rounded-b-lg border-t border-white/20 shadow-xl flex items-center justify-center">
        <div className="w-12 h-1 rounded-b-md bg-[#111] border-t border-white/10" />
      </div>
    </div>
  );
}
