"use client";

export default function ProjectBackground({ patternType }) {
  if (patternType === "ca-smart-assistant") {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden">
        {/* Document Outline & Orbit Vectors */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <svg className="absolute -right-20 top-1/4 w-[600px] h-[600px] text-white/[0.03]" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
          <rect x="25" y="25" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    );
  }

  if (patternType === "expense-tracker") {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden">
        {/* Chart Curves & Graph Line Vectors */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:5rem_5rem]" />
        <svg className="absolute -left-20 bottom-10 w-[700px] h-[400px] text-white/[0.035]" viewBox="0 0 200 100" fill="none">
          <path d="M 0,80 Q 40,20 80,60 T 160,30 T 200,70" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M 0,90 Q 50,40 100,70 T 200,40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" fill="none" />
        </svg>
      </div>
    );
  }

  // ag-design-studio or default
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden">
      {/* Minimal Architectural Geometry */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/[0.025]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rotate-45 border border-white/[0.02]" />
    </div>
  );
}
