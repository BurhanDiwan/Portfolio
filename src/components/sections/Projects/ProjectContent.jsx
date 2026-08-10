"use client";

import { motion } from "framer-motion";
import ProjectTechStack from "./ProjectTechStack";
import ProjectHighlights from "./ProjectHighlights";
import ProjectMetrics from "./ProjectMetrics";
import ProjectButtons from "./ProjectButtons";

export default function ProjectContent({ project }) {
  const {
    title,
    subtitle,
    description,
    challenge,
    solution,
    role,
    duration,
    status,
    techStack,
    highlights,
    metrics,
    githubUrl,
    liveUrl,
  } = project;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col space-y-4 text-left max-w-xl"
    >
      {/* Role & Status Pill */}
      <div className="flex items-center space-x-2.5 text-[10px] font-mono text-white/50">
        <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/80">
          {role}
        </span>
        <span>•</span>
        <span>{duration}</span>
        <span>•</span>
        <span className="text-emerald-400/90">{status}</span>
      </div>

      {/* Title & Subtitle */}
      <div>
        <h3 className="text-2xl sm:text-4xl font-display font-light text-white tracking-tight mb-1">
          {title}
        </h3>
        <p className="text-xs sm:text-sm font-sans text-white/60 font-light leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans font-normal line-clamp-3">
        {description}
      </p>

      {/* Challenge & Solution Grid */}
      <div className="rounded-xl p-3 bg-white/[0.02] border border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <span className="text-[9px] font-mono tracking-wider text-white/40 uppercase block mb-1">
            THE CHALLENGE
          </span>
          <p className="text-[11px] sm:text-xs text-white/70 font-light leading-relaxed line-clamp-3">
            {challenge}
          </p>
        </div>
        <div className="sm:border-l sm:border-white/[0.06] sm:pl-3">
          <span className="text-[9px] font-mono tracking-wider text-white/40 uppercase block mb-1">
            THE SOLUTION
          </span>
          <p className="text-[11px] sm:text-xs text-white/70 font-light leading-relaxed line-clamp-3">
            {solution}
          </p>
        </div>
      </div>

      {/* Technology Stack */}
      <ProjectTechStack techStack={techStack} />

      {/* Performance Metrics */}
      <ProjectMetrics metrics={metrics} />

      {/* Action Buttons */}
      <ProjectButtons liveUrl={liveUrl} githubUrl={githubUrl} />
    </motion.div>
  );
}
