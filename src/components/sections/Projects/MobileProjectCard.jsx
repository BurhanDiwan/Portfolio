"use client";

import { motion } from "framer-motion";
import ProjectContent from "./ProjectContent";
import ProjectMedia from "./ProjectMedia";
import ProjectBackground from "./ProjectBackground";
import ProjectNumber from "./ProjectNumber";

export default function MobileProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-xl overflow-hidden space-y-5"
    >
      {/* Background Pattern */}
      <ProjectBackground patternType={project.backgroundPattern} />

      {/* Number Badge */}
      <ProjectNumber number={project.number} />

      {/* Media Mockup */}
      <div className="relative z-10 w-full flex justify-center">
        <ProjectMedia media={project.media} title={project.title} liveUrl={project.liveUrl} />
      </div>

      {/* Content Details */}
      <div className="relative z-10 w-full">
        <ProjectContent project={project} />
      </div>
    </motion.div>
  );
}
