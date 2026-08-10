"use client";

import TechLogo from "@/components/ui/TechLogo";

export default function ProjectTechStack({ techStack = [] }) {
  if (!techStack || techStack.length === 0) return null;

  return (
    <div className="space-y-2 pt-2">
      <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase block">
        TECHNOLOGY STACK
      </span>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, idx) => (
          <TechLogo key={idx} name={tech} />
        ))}
      </div>
    </div>
  );
}
