"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DustParticles({ count = 40 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles purely on the client to avoid hydration mismatch
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1, // 1px to 3px
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * -20, // Random start point in animation
      opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 mix-blend-screen">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white blur-[0.5px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, p.opacity, p.opacity, 0],
            y: [0, -100, -200], // Drift upward
            x: [0, Math.random() * 50 - 25], // Slight horizontal drift
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
