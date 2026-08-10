"use client";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-1 w-full origin-left bg-gradient-to-r from-text-secondary to-accent"
      style={{ scaleX: progress / 100 }}
      transition={{ duration: 0.1, ease: "linear" }}
    />
  );
}
