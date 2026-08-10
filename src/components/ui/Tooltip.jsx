"use client";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Accessible hover information tooltip using Framer Motion.
 * @param {Object} props
 * @param {string} props.content - Tooltip text
 * @param {'top' | 'bottom' | 'left' | 'right'} [props.position='top']
 */
export default function Tooltip({ children, content, position = "top", className }) {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const motionVariants = {
    initial: { opacity: 0, scale: 0.95, y: position === "top" ? 5 : position === "bottom" ? -5 : 0 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={motionVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute z-[1000] whitespace-nowrap rounded-md bg-surface-raised border border-border-default px-3 py-1.5 text-xs text-text-primary shadow-xl pointer-events-none",
              positions[position],
              className
            )}
            role="tooltip"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
