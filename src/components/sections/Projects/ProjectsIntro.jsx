"use client";

import { motion } from "framer-motion";
import Heading from "@/components/layout/Heading";
import Paragraph from "@/components/layout/Paragraph";

export default function ProjectsIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
    >
      <span className="text-xs font-mono tracking-[0.4em] text-white/40 uppercase block mb-3">
        FEATURED WORK
      </span>
      <Heading variant="h2" className="text-white font-light tracking-tight font-display text-4xl sm:text-6xl mb-6">
        Flagship Digital Products
      </Heading>
      <Paragraph size="xl" color="secondary" className="font-light text-white/70">
        Every project is engineered with intentional design, robust architecture, and meticulous attention to detail.
      </Paragraph>
    </motion.div>
  );
}
