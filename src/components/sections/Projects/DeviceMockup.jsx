"use client";

import Image from "next/image";

export default function DeviceMockup({ imageSrc, title, className = "" }) {
  return (
    <div className={`relative mx-auto w-[240px] sm:w-[280px] rounded-[48px] border-[6px] border-[#222] bg-[#000] p-2 shadow-[0_30px_70px_rgba(0,0,0,0.9)] transition-transform duration-700 hover:scale-[1.03] ${className}`}>
      {/* Outer Glass Bezel Glow */}
      <div className="absolute -inset-1 rounded-[52px] border border-white/20 pointer-events-none" />

      {/* Dynamic Island Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-24 h-4 rounded-full bg-black flex items-center justify-between px-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10" />
        <div className="w-2 h-2 rounded-full bg-blue-900/60" />
      </div>

      {/* Screen Frame Content */}
      <div className="relative aspect-[9/19.5] w-full rounded-[40px] overflow-hidden bg-black">
        <Image
          src={imageSrc}
          alt={title || "Mobile Project View"}
          fill
          className="object-cover object-top"
          sizes="280px"
        />

        {/* Glossy Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Home Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-white/40 z-30" />
    </div>
  );
}
