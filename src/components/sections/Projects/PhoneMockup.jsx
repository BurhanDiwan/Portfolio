"use client";

import Image from "next/image";

export default function PhoneMockup({ imageSrc, title, className = "" }) {
  return (
    // Phone is naturally sized by width. No fixed height. No max-h.
    // The aspect ratio drives the height automatically.
    <div className={`relative mx-auto w-[200px] sm:w-[240px] flex-shrink-0 select-none ${className}`}>
      {/* Outer bezel */}
      <div className="relative rounded-[44px] border-[6px] border-[#222] bg-[#000] p-1.5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:scale-[1.02]">
        {/* Outer Glass Glow */}
        <div className="absolute -inset-1 rounded-[48px] border border-white/20 pointer-events-none" />

        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-16 h-3 rounded-full bg-black flex items-center justify-between px-2">
          <div className="w-2 h-2 rounded-full bg-[#111] border border-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
        </div>

        {/* Screen — aspect ratio drives height, no clamping */}
        <div className="relative aspect-[9/19.5] w-full rounded-[34px] overflow-hidden bg-black">
          <Image
            src={imageSrc}
            alt={title || "Mobile View"}
            fill
            className="object-cover object-top"
            sizes="240px"
          />
          {/* Glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Home bar */}
        <div className="mt-1.5 flex justify-center">
          <div className="w-24 h-1 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}
