"use client";

import { motion } from "framer-motion";

export default function ProjectProgress({ progress = 0 }) {
  return (
    <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-white/40 via-white to-white/60 shadow-[0_0_8px_#fff]"
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        transition={{ ease: "easeOut", duration: 0.2 }}
      />
    </div>
  );
}
