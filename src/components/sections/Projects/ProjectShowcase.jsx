"use client";

import { motion } from "framer-motion";
import ProjectBackground from "./ProjectBackground";
import ProjectNumber from "./ProjectNumber";
import ProjectContent from "./ProjectContent";
import ProjectMedia from "./ProjectMedia";

export default function ProjectShowcase({ project, isActive = true }) {
  return (
    <motion.div
      className="relative w-full"
      animate={{ opacity: isActive ? 1 : 0.45 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Ambient Procedural Background Pattern */}
      <ProjectBackground patternType={project.backgroundTheme || project.backgroundPattern} />

      {/* Monumental Background Index Number */}
      <ProjectNumber number={project.number} />

      {/*
        Two-column grid — same as the working single-project layout.
        No fixed heights. Height is content-driven.
        No flex items-center that could push children outside bounds.
      */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* Left Column: Project Story & Details */}
        <div className="flex flex-col justify-center">
          <ProjectContent project={project} />
        </div>

        {/* Right Column: Media Presentation */}
        <div className="flex flex-col justify-center items-center w-full">
          <ProjectMedia
            media={project.media}
            title={project.title}
            liveUrl={project.liveUrl}
            deviceMockup={project.deviceMockup}
          />
        </div>
      </div>
    </motion.div>
  );
}
