"use client";

import { motion } from "framer-motion";

const LEVEL_CONFIG = {
  CORE:       { filled: 4, label: "CORE" },
  DAILY:      { filled: 3, label: "DAILY" },
  EXPERIENCED:{ filled: 2, label: "EXPERIENCED" },
  EXPLORING:  { filled: 1, label: "EXPLORING" },
};

const TOTAL_DOTS = 4;

export default function ProficiencyIndicator({ level = "CORE", isHovered = false }) {
  const config = LEVEL_CONFIG[level] ?? LEVEL_CONFIG.CORE;

  return (
    <div className="flex items-center gap-2 mt-2.5">
      <div className="flex items-center gap-[4px]">
        {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
          const isFilled = i < config.filled;
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ 
                scale: 1, 
                opacity: isFilled ? 0.9 : 0.15 
              }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.5,
                delay: 1.5 + (i * 0.1), // Delayed until cards appear
                ease: [0.16, 1, 0.3, 1],
              }}
              animate={{
                boxShadow: isFilled && isHovered 
                  ? "0 0 6px rgba(255,255,255,0.4)" 
                  : "0 0 0px rgba(255,255,255,0)",
                backgroundColor: isFilled ? "#ffffff" : "rgba(255,255,255,0.15)"
              }}
              className="w-[5px] h-[5px] rounded-full"
            />
          );
        })}
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.35 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.5 }}
        animate={{ opacity: isHovered ? 0.7 : 0.35 }}
        className="text-[9px] font-mono tracking-[0.18em] text-white uppercase select-none"
      >
        {config.label}
      </motion.span>
    </div>
  );
}
