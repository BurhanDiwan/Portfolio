"use client";

import { motion } from "framer-motion";

export default function EngineeringHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-2xl mx-auto"
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2.5 mb-6"
      >
        <div className="h-px w-8 bg-white/20" />
        <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
          Engineering Capabilities
        </span>
        <div className="h-px w-8 bg-white/20" />
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-white tracking-tight leading-tight mb-5"
      >
        How I build software.
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="text-sm sm:text-base font-sans font-light text-white/50 leading-relaxed"
      >
        The technologies and tools I rely on to design, build and deliver modern
        web applications with performance, scalability and maintainability in mind.
      </motion.p>
    </motion.div>
  );
}
