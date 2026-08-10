"use client";

// Horizontal layout for the floating nav pill
export default function ProjectNavigation({ projects = [], activeIndex = 0, onSelectIndex }) {
  return (
    <div className="flex items-center space-x-5 select-none">
      {projects.map((project, idx) => {
        const isActive = idx === activeIndex;
        return (
          <button
            key={project.id}
            onClick={() => onSelectIndex && onSelectIndex(idx)}
            className="group relative flex items-center space-x-2 focus:outline-none"
          >
            {/* Active pill indicator */}
            <div
              className={`w-4 h-[2px] rounded-full transition-all duration-500 ${
                isActive
                  ? "bg-white shadow-[0_0_8px_#fff] w-6"
                  : "bg-white/20 group-hover:bg-white/50"
              }`}
            />
            {/* Number */}
            <span
              className={`text-[11px] font-mono transition-all duration-300 ${
                isActive ? "text-white font-semibold" : "text-white/40 group-hover:text-white/70"
              }`}
            >
              {project.number || `0${idx + 1}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}
