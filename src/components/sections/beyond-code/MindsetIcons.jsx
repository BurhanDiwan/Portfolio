"use client";
import { motion } from "framer-motion";

export const ProblemSolvingIcon = ({ isActive }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <motion.path
      d="M12 4V7M12 17V20M4 12H7M17 12H20M6.34 6.34L8.46 8.46M15.54 15.54L17.66 17.66M6.34 17.66L8.46 15.54M15.54 6.34L17.66 8.46"
      stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{ 
        rotate: isActive ? 90 : 0,
        scale: isActive ? 1.1 : 1
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
    <circle cx="12" cy="12" r="3" stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"} strokeWidth="1.5" />
  </svg>
);

export const DesignThinkingIcon = ({ isActive }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <motion.path
      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
      stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"}
      strokeWidth="1.5"
      strokeDasharray="4 4"
      animate={{ rotate: isActive ? -180 : 0 }}
      transition={{ duration: 1.5, ease: "linear", repeat: isActive ? Infinity : 0 }}
    />
    <motion.path
      d="M8 12L12 8L16 12L12 16L8 12Z"
      stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"}
      strokeWidth="1.5"
      animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
    />
  </svg>
);

export const AiNativeIcon = ({ isActive }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <motion.path
      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
      stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"}
      strokeWidth="1.5"
      strokeLinejoin="round"
      animate={{ 
        scale: isActive ? [1, 1.1, 1] : 1,
        rotate: isActive ? 180 : 0
      }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  </svg>
);

export const PerformanceIcon = ({ isActive }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M4 19L10 13L14 17L20 9" stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <motion.path
      d="M20 9V15M20 9H14"
      stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ 
        y: isActive ? [-2, 2, -2] : 0,
        x: isActive ? [2, -2, 2] : 0
      }}
      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
    />
  </svg>
);

export const ContinuousLearningIcon = ({ isActive }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <motion.path
      d="M12 3V21M3 12H21"
      stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{ rotate: isActive ? 45 : 0 }}
      transition={{ duration: 0.5, ease: "backOut" }}
    />
    <circle cx="12" cy="12" r="6" stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"} strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

export const CraftsmanshipIcon = ({ isActive }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <motion.path
      d="M12 2L3 7L12 12L21 7L12 2Z"
      stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: isActive ? -4 : 0 }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M3 12L12 17L21 12"
      stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: isActive ? -2 : 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    />
    <motion.path
      d="M3 17L12 22L21 17"
      stroke={isActive ? "#fff" : "rgba(255,255,255,0.5)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: isActive ? 0 : 0 }}
    />
  </svg>
);
