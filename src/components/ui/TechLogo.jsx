"use client";

import {
  SiReact,
  SiJavascript,
  SiVite,
  SiTailwindcss,
  SiRedux,
  SiFirebase,
  SiReactrouter,
  SiFramer,
} from "react-icons/si";
import { FiCpu, FiTrendingUp, FiLayers } from "react-icons/fi";

const LOGO_MAP = {
  React: SiReact,
  JavaScript: SiJavascript,
  Vite: SiVite,
  "Tailwind CSS": SiTailwindcss,
  "Redux Toolkit": SiRedux,
  Firebase: SiFirebase,
  Firestore: SiFirebase,
  "React Router": SiReactrouter,
  "Framer Motion": SiFramer,
  GSAP: FiCpu,
  Recharts: FiTrendingUp,
  "Local Storage": FiLayers,
};

export default function TechLogo({ name, showLabel = true, className = "" }) {
  const IconComponent = LOGO_MAP[name] || FiLayers;

  return (
    <div
      title={name}
      className={`group flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:scale-[1.03] select-none ${className}`}
    >
      {/* Monochrome Icon */}
      <IconComponent className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300 shrink-0" />
      
      {showLabel && (
        <span className="text-[11px] font-mono text-white/70 group-hover:text-white transition-colors duration-300">
          {name}
        </span>
      )}
    </div>
  );
}
