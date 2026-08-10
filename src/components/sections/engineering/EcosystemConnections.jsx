"use client";

import { motion } from "framer-motion";
import { useEngineeringContext } from "./EngineeringContext";

// Define the paths connecting the absolutely positioned orbs.
// Using percentages to perfectly align with the orb positions in TechnologyOrbs.jsx
const CONNECTIONS = [
  {
    id: "react-next",
    triggerTechs: ["react", "nextjs"],
    // React (25%, 25%) -> Next (15%, 65%)
    d: "M 25 25 C 20 40, 15 50, 15 65", 
  },
  {
    id: "node-mongo",
    triggerTechs: ["nodejs", "mongodb"],
    // Node (right: 25% -> left: 75%, 20%) -> Mongo (right: 15% -> left: 85%, 55%)
    d: "M 75 20 C 80 35, 85 45, 85 55",
  },
  {
    id: "node-firebase",
    triggerTechs: ["nodejs", "firebase"],
    // Node (75%, 20%) -> Firebase (right: 28% -> left: 72%, 75%)
    d: "M 75 20 C 72 40, 70 60, 72 75",
  },
  {
    id: "js-react",
    triggerTechs: ["javascript", "react"],
    // JS (10%, 15%) -> React (25%, 25%)
    d: "M 10 15 C 15 15, 20 20, 25 25",
  }
];

export default function EcosystemConnections() {
  const { activeTech } = useEngineeringContext();

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      // Use a fixed aspect coordinate system that scales, or rely on percentages in paths?
      // SVG paths don't natively support percentages in `d` strings, so we must use vector-effect
      // or viewbox scaling. A trick is to set viewBox="0 0 100 100" and preserveAspectRatio="none",
      // so 0-100 maps to 0-100%.
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {CONNECTIONS.map((conn) => {
        const isActive = conn.triggerTechs.includes(activeTech);

        return (
          <g key={conn.id}>
            {/* Base idle line */}
            <path
              d={conn.d}
              fill="none"
              stroke="white"
              strokeOpacity={0.05}
              strokeWidth="0.1" // Will scale with viewBox, effectively 1px on 1000px width
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Animated Signal Pulse */}
            {isActive && (
              <motion.path
                d={conn.d}
                fill="none"
                stroke="url(#pulse-gradient)"
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
