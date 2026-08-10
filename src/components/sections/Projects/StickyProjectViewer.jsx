"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProjectShowcase from "./ProjectShowcase";
import ProjectNavigation from "./ProjectNavigation";
import ProjectProgress from "./ProjectProgress";

export default function StickyProjectViewer({
  projects = [],
  activeIndex = 0,
  scrollProgress = 0,
  onSelectIndex,
}) {
  const currentProject = projects[activeIndex] || projects[0];

  return (
    <div className="hidden lg:block relative w-full h-[300vh]">
      {/* Sticky Viewport Stage */}
      <div className="sticky top-20 h-[calc(100vh-6rem)] w-full flex flex-col justify-between py-2 overflow-hidden">
        
        {/* Top Navigation & Progress Header */}
        <div className="w-full px-6 z-30 flex items-center justify-between bg-black/80 backdrop-blur-md py-2.5 rounded-full border border-white/10 shadow-lg">
          <div className="w-1/4">
            <ProjectProgress progress={scrollProgress} />
          </div>
          <ProjectNavigation
            projects={projects}
            activeIndex={activeIndex}
            onSelectIndex={onSelectIndex}
          />
          <span className="text-[11px] font-mono text-white/50 uppercase">
            {currentProject?.title}
          </span>
        </div>

        {/* Center Presentation Stage */}
        <div className="relative w-full max-w-7xl mx-auto px-6 flex-1 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <ProjectShowcase project={currentProject} isActive={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Status Bar */}
        <div className="w-full px-6 flex items-center justify-between text-[10px] font-mono text-white/40 z-30">
          <span>FLAGSHIP PRODUCT 0{activeIndex + 1} OF 0{projects.length}</span>
          <span className="uppercase">{currentProject?.subtitle}</span>
        </div>
      </div>
    </div>
  );
}
