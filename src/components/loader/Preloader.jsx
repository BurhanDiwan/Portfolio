"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

export default function Preloader() {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const containerRef = useRef(null);
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const outerOrbitRef = useRef(null);
  const textRef = useRef(null);

  // Maximum safety fallback timeout (3.0 seconds max)
  // Guarantees that Preloader NEVER hangs forever on mobile networks/GPUs
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setDisplayProgress(100);
      setIsComplete(true);
    }, 3000);

    return () => clearTimeout(safetyTimer);
  }, []);

  // Smoothly interpolate progress number
  useEffect(() => {
    let animationFrame;
    const updateProgress = () => {
      setDisplayProgress((prev) => {
        const target = (!active || isComplete) ? 100 : progress;
        const diff = target - prev;
        
        if (Math.abs(diff) < 0.5) {
          return target;
        }
        return prev + diff * 0.15;
      });
      animationFrame = requestAnimationFrame(updateProgress);
    };
    
    updateProgress();
    return () => cancelAnimationFrame(animationFrame);
  }, [progress, active, isComplete]);

  // Handle completion trigger when Drei assets finish loading
  useEffect(() => {
    if ((progress >= 100 || !active) && displayProgress >= 90) {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, active, displayProgress]);

  // Cinematic Exit Transition (GSAP)
  useEffect(() => {
    if (!isComplete || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
          containerRef.current.style.pointerEvents = "none";
        }
        // Tell the Hero to begin its cinematic text reveal
        window.dispatchEvent(new Event("preloaderComplete"));
      },
    });

    tl.to(textRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.4,
      ease: "power2.inOut",
    })
    .to(
      ringRef.current,
      {
        scale: 3.5,
        opacity: 0,
        duration: 0.9,
        ease: "power3.inOut",
      },
      "-=0.2"
    )
    .to(
      coreRef.current,
      {
        scale: 2.2,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "<"
    )
    .to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.6"
    );
  }, [isComplete]);

  // Progress Circle Math
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(displayProgress, 100) / 100) * circumference;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-white select-none pointer-events-auto overflow-hidden"
    >
      {/* Ambient background particles / stars */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px] animate-pulse" />

      {/* Main Centerpiece Container */}
      <div className="relative flex items-center justify-center w-64 h-64">
        
        {/* Soft Background Radial Glow */}
        <div 
          ref={coreRef}
          className="absolute w-32 h-32 rounded-full bg-white/10 blur-2xl animate-pulse"
        />

        {/* SVG Core & Orbit Rings */}
        <div ref={ringRef} className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
            {/* Background Track Ring */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="text-white/10"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="text-white transition-all duration-300 ease-out"
              strokeWidth="1.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Thin Rotating Orbit Lines */}
          <div 
            ref={outerOrbitRef}
            className="absolute inset-2 rounded-full border border-white/15 animate-[spin_12s_linear_infinite]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_8px_#fff]" />
          </div>

          {/* Inner Floating Core Dot */}
          <div className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#fff] animate-pulse" />
        </div>
      </div>

      {/* Typography Section */}
      <div ref={textRef} className="mt-8 flex flex-col items-center text-center space-y-2">
        <span className="text-[10px] font-mono tracking-[0.4em] text-white/50 uppercase animate-pulse">
          INITIALIZING
        </span>
        <h2 className="text-xs font-light tracking-[0.5em] text-white uppercase">
          DEVELOPER CORE
        </h2>
        <span className="text-[11px] font-mono text-white/40 tracking-widest pt-1">
          {Math.round(Math.min(displayProgress, 100))}%
        </span>
      </div>
    </div>
  );
}
