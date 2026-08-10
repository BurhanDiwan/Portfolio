"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProficiencyIndicator from "./ProficiencyIndicator";
import { useEngineeringContext } from "./EngineeringContext";

export default function TechnologyNode({ tech, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const { setActiveTech } = useEngineeringContext();
  const { id, name, Icon, iconColor, level } = tech;

  const handleHoverStart = () => {
    setIsHovered(true);
    setActiveTech(id);
  };
  const handleHoverEnd = () => {
    setIsHovered(false);
    setActiveTech(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ 
        y: -3, // Tiny lift, physically believable
        transition: { type: "spring", stiffness: 400, damping: 30 } 
      }}
      className="relative flex flex-col p-3.5 rounded-xl cursor-default select-none w-full"
      style={{
        background: isHovered
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.02)",
        border: isHovered
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid rgba(255,255,255,0.06)",
        transition: "background 0.4s ease, border 0.4s ease",
        boxShadow: isHovered
          ? "0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "none",
      }}
    >
      {/* Inner reflection sweep on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
        initial={false}
      >
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            opacity: isHovered ? 1 : 0,
            background: isHovered 
              ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 100%)" 
              : "linear-gradient(135deg, transparent 0%, transparent 100%)"
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Icon + Name */}
      <div className="flex items-center gap-2.5 relative z-10">
        <motion.div
          animate={{ 
            opacity: isHovered ? 1 : 0.6,
            filter: isHovered ? `drop-shadow(0 0 4px ${iconColor}40)` : "drop-shadow(0 0 0px transparent)"
          }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-[18px] h-[18px] flex items-center justify-center"
          style={{ color: iconColor }}
        >
          <Icon size={17} />
        </motion.div>

        <motion.span
          animate={{ opacity: isHovered ? 1 : 0.65 }}
          transition={{ duration: 0.3 }}
          className="text-[12px] font-sans text-white font-normal tracking-tight leading-none"
        >
          {name}
        </motion.span>
      </div>

      {/* Proficiency */}
      <div className="relative z-10">
        <ProficiencyIndicator level={level} isHovered={isHovered} />
      </div>
    </motion.div>
  );
}
