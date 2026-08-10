"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useEngineeringContext } from "./EngineeringContext";

const CX = 250;
const CY = 250;

function round(val) {
  return Math.round(val * 100) / 100;
}

// Generate precision tick marks around a ring
function generateTicks(cx, cy, r, count, tickLength = 4, startAngle = 0) {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((360 / count) * i + startAngle) * (Math.PI / 180);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x1: round(cx + r * cos),
      y1: round(cy + r * sin),
      x2: round(cx + (r + tickLength) * cos),
      y2: round(cy + (r + tickLength) * sin),
      angle: ((360 / count) * i + startAngle).toFixed(1)
    };
  });
}

// Fixed coordinate texts
const coordinates = [
  { x: 50, y: 50, text: "X: 0.122 Y: 0.881 // SYS_ALIGN" },
  { x: 350, y: 50, text: "FREQ: 4.88 GHz // SYNC_01" },
  { x: 50, y: 450, text: "L3 CACHE: OK // LATENCY: 1.2ms" },
  { x: 350, y: 450, text: "NODE_MGR: ACTIVE // SECT_7" }
];

const ticksInner = generateTicks(CX, CY, 90, 72, 3);
const ticksOuter = generateTicks(CX, CY, 180, 36, 6);

export default function EngineeringCore() {
  const { activeTech } = useEngineeringContext();
  const pulseControls = useAnimation();

  useEffect(() => {
    if (activeTech) {
      pulseControls.start({
        scale: [1, 2.5],
        opacity: [0.6, 0],
        transition: { duration: 1.2, ease: "easeOut" },
      });
    } else {
      pulseControls.stop();
    }
  }, [activeTech, pulseControls]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center select-none w-full h-full max-w-[600px] max-h-[600px] opacity-80 mix-blend-screen"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="core-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="trace-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* --- Background Blueprint Grid --- */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="0.5" fill="white" fillOpacity="0.1" />
        </pattern>
        <rect width="500" height="500" fill="url(#grid)" />

        {/* --- Precision Alignment Guides --- */}
        <g stroke="white" strokeOpacity="0.08" strokeWidth="0.5">
          <line x1={CX} y1="0" x2={CX} y2="500" strokeDasharray="4 8" />
          <line x1="0" y1={CY} x2="500" y2={CY} strokeDasharray="4 8" />
          <circle cx={CX} cy={CY} r="220" fill="none" />
          <circle cx={CX} cy={CY} r="150" fill="none" strokeDasharray="2 4" />
        </g>

        {/* --- Corner Coordinate Markers --- */}
        {[[20, 20], [480, 20], [20, 480], [480, 480]].map(([x, y], i) => (
          <g key={i} stroke="white" strokeOpacity="0.15" strokeWidth="1">
            <line x1={x - 10} y1={y} x2={x + 10} y2={y} />
            <line x1={x} y1={y - 10} x2={x} y2={y + 10} />
          </g>
        ))}

        {/* --- Engineering Annotations --- */}
        <g fill="white" fillOpacity="0.3" fontSize="6" fontFamily="monospace" letterSpacing="1">
          {coordinates.map((coord, i) => (
            <text key={i} x={coord.x} y={coord.y} textAnchor={coord.x > 250 ? "end" : "start"}>
              {coord.text}
            </text>
          ))}
          {/* Degree markers around outer ring */}
          {ticksOuter.filter((_, i) => i % 9 === 0).map((tick, i) => (
            <text key={i} x={tick.x2 + (tick.x2 - CX) * 0.1} y={tick.y2 + (tick.y2 - CY) * 0.1} textAnchor="middle" fontSize="5" opacity="0.4">
              {tick.angle}°
            </text>
          ))}
        </g>

        {/* --- Calibration Ticks --- */}
        <g stroke="white" strokeOpacity="0.2" strokeWidth="0.5">
          {ticksInner.map((t, i) => <line key={`in-${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />)}
          {ticksOuter.map((t, i) => <line key={`out-${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={i % 3 === 0 ? 1 : 0.5} opacity={i % 3 === 0 ? 0.3 : 0.15} />)}
        </g>

        {/* --- CPU Trace Routing Paths (Circuitry) --- */}
        <g fill="none" stroke="url(#trace-grad)" strokeWidth="0.75" opacity="0.6">
          <path d="M 250 160 L 250 100 L 300 50 L 380 50" />
          <path d="M 160 250 L 100 250 L 50 300 L 50 380" />
          <path d="M 250 340 L 250 400 L 200 450 L 120 450" />
          <path d="M 340 250 L 400 250 L 450 200 L 450 120" />
        </g>
        {/* Trace end nodes */}
        <g fill="white" fillOpacity="0.4">
          <rect x="378" y="48" width="4" height="4" />
          <rect x="48" y="378" width="4" height="4" />
          <rect x="118" y="448" width="4" height="4" />
          <rect x="448" y="118" width="4" height="4" />
        </g>

        {/* --- The Nucleus (CPU Core) --- */}
        <g>
          {/* Complex solid geometric core */}
          <rect x={CX - 24} y={CY - 24} width="48" height="48" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" rx="4" />
          <rect x={CX - 18} y={CY - 18} width="36" height="36" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" rx="3" />
          <rect x={CX - 10} y={CY - 10} width="20" height="20" fill="white" fillOpacity="0.8" rx="2" filter="url(#core-glow)" />
          
          {/* Signal emitter ring triggered by hover */}
          <motion.circle
            cx={CX}
            cy={CY}
            r="16"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            animate={pulseControls}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
        </g>
      </svg>
    </motion.div>
  );
}
