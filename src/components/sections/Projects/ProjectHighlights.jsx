"use client";

import { FiCheckCircle } from "react-icons/fi";

export default function ProjectHighlights({ highlights = [] }) {
  return (
    <div className="space-y-2 pt-2">
      <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase block mb-2">
        KEY HIGHLIGHTS
      </span>
      <ul className="space-y-2">
        {highlights.map((item, idx) => (
          <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm font-sans text-white/70">
            <FiCheckCircle className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
