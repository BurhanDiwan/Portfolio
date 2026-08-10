"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { FiLock, FiGlobe } from "react-icons/fi";

export default function BrowserMockup({
  imageSrc,
  videoSrc,
  title,
  url = "https://example.com",
  className = "",
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;
    const el = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black/90 shadow-[0_25px_60px_rgba(0,0,0,0.8)] group select-none ${className}`}>
      {/* Browser Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/[0.04] border-b border-white/10 select-none flex-shrink-0">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]/50" />
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-0.5 rounded-lg bg-black/60 border border-white/10 text-[10px] font-mono text-white/50 w-full max-w-xs justify-center mx-2">
          <FiLock className="w-2.5 h-2.5 text-emerald-400/80" />
          <span className="truncate">{url}</span>
        </div>
        <div className="flex items-center text-white/30">
          <FiGlobe className="w-3 h-3" />
        </div>
      </div>

      {/* Screen Content — natural aspect ratio, no height squishing */}
      <div className="relative w-full flex flex-col">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block bg-white/[0.02]"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={title || "Project Screenshot"}
            width={1920}
            height={1080}
            className="w-full h-auto block bg-white/[0.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        )}
        {/* Glass sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
