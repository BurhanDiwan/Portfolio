"use client";

import { motion } from "framer-motion";
import { useEngineeringContext } from "./EngineeringContext";
import { getTechByCategory, TECHNOLOGIES } from "@/data/technologies";

// Curated list of technologies that get premium orbs
const ORB_TECHS = [
  "javascript", "react", "nextjs", "tailwind",
  "nodejs", "mongodb", "firebase", "git"
];

// Map technology IDs to specific orb configurations (size, position, float params)
const ORB_CONFIG = {
  javascript: { size: 64, top: "15%", left: "10%", floatY: 15, floatDur: 6, delay: 0 },
  react: { size: 96, top: "25%", left: "25%", floatY: 20, floatDur: 8, delay: 1 },
  nextjs: { size: 80, top: "65%", left: "15%", floatY: 18, floatDur: 7, delay: 2 },
  tailwind: { size: 56, top: "80%", left: "30%", floatY: 12, floatDur: 5, delay: 0.5 },
  nodejs: { size: 88, top: "20%", right: "25%", floatY: 22, floatDur: 8.5, delay: 1.5 },
  mongodb: { size: 72, top: "55%", right: "15%", floatY: 16, floatDur: 6.5, delay: 2.5 },
  firebase: { size: 60, top: "75%", right: "28%", floatY: 14, floatDur: 5.5, delay: 0.8 },
  git: { size: 48, top: "10%", right: "12%", floatY: 10, floatDur: 4.5, delay: 1.2 },
};

export default function TechnologyOrbs() {
  const { activeTech } = useEngineeringContext();

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {ORB_TECHS.map((techId) => {
        const tech = TECHNOLOGIES.find(t => t.id === techId);
        if (!tech) return null;
        
        const config = ORB_CONFIG[techId];
        const isActive = activeTech === techId;
        const Icon = tech.Icon;

        return (
          <motion.div
            key={techId}
            className="absolute flex items-center justify-center rounded-full"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: config.delay * 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: config.size,
              height: config.size,
              top: config.top,
              left: config.left,
              right: config.right,
              bottom: config.bottom,
            }}
          >
            {/* The floating animation wrapper */}
            <motion.div
              className="relative w-full h-full rounded-full flex items-center justify-center"
              animate={{
                y: [0, -config.floatY, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: config.floatDur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: config.delay,
              }}
            >
              {/* The Glass Orb Material */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: isActive 
                    ? `inset 0 0 20px rgba(255,255,255,0.4), inset 0 4px 10px rgba(255,255,255,0.6), 0 0 30px ${tech.iconColor}40, 0 10px 40px rgba(0,0,0,0.5)`
                    : `inset 0 0 15px rgba(255,255,255,0.1), inset 0 2px 5px rgba(255,255,255,0.2), 0 5px 20px rgba(0,0,0,0.3)`,
                  backdropFilter: isActive ? "blur(16px)" : "blur(12px)",
                  background: isActive 
                    ? `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 60%, transparent 100%), radial-gradient(circle at 80% 80%, ${tech.iconColor}15 0%, transparent 50%)`
                    : `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                  scale: isActive ? 1.05 : 1
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                  // Edge bloom/fresnel effect
                  maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(circle at center, white 40%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0.2) 100%)"
                }}
              />
              
              {/* Inner highlight (Sapphire/Apple Vision Pro style) */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-50" style={{ clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 60%)" }} />

              {/* Technology Icon */}
              <motion.div
                className="relative z-10"
                animate={{
                  opacity: isActive ? 0.9 : 0.3,
                  scale: isActive ? 1.1 : 0.9,
                  filter: isActive ? `drop-shadow(0 0 8px ${tech.iconColor}80)` : "drop-shadow(0 0 0px transparent)"
                }}
                transition={{ duration: 0.5 }}
                style={{ color: tech.iconColor }}
              >
                <Icon size={config.size * 0.4} />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
