"use client";

import ProjectsIntro from "./ProjectsIntro";
import ProjectShowcase from "./ProjectShowcase";
import MobileProjectCard from "./MobileProjectCard";
import ProjectNavigation from "./ProjectNavigation";
import ProjectProgress from "./ProjectProgress";
import { PROJECTS_DATA } from "@/data/projects";
import { useProjectScroll } from "@/hooks/useProjectScroll";

export default function ProjectsSection() {
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);
  const { containerRef, getItemRef, activeIndex, scrollProgress, scrollToProject } =
    useProjectScroll(featuredProjects.length);

  return (
    <section id="projects" className="relative py-16 sm:py-24">
      {/* Ambient Radial Haze */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />

      {/*
        Floating sticky pill nav.
        Uses position:sticky ON ITS OWN ELEMENT — not wrapping project content.
        This means it NEVER affects height of project showcase cards.
        No clipping, no layout interference.
      */}
      <div className="hidden lg:block sticky top-6 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 shadow-lg">
            <div className="w-32">
              <ProjectProgress progress={scrollProgress} />
            </div>
            <ProjectNavigation
              projects={featuredProjects}
              activeIndex={activeIndex}
              onSelectIndex={scrollToProject}
            />
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider min-w-[140px] text-right">
              {featuredProjects[activeIndex]?.title}
            </span>
          </div>
        </div>
      </div>

      {/* Project content container — identical structure to the working single-project layout */}
      <div
        ref={containerRef}
        className="relative z-10 pointer-events-auto max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Section Intro */}
        <ProjectsIntro />

        {/* Desktop: three stacked project showcases */}
        <div className="hidden lg:flex lg:flex-col gap-28">
          {featuredProjects.map((project, idx) => (
            <div key={project.id} ref={getItemRef(idx)}>
              <ProjectShowcase project={project} isActive={activeIndex === idx} />
            </div>
          ))}
        </div>

        {/* Mobile & Tablet */}
        <div className="block lg:hidden space-y-16 mt-8">
          {featuredProjects.map((p) => (
            <MobileProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
