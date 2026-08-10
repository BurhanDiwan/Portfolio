"use client";

export default function ProjectNumber({ number }) {
  return (
    <div className="absolute top-0 right-0 pointer-events-none select-none z-0">
      <span className="text-[120px] sm:text-[180px] lg:text-[240px] font-mono font-extralight leading-none text-white/[0.03] block">
        {number}
      </span>
    </div>
  );
}
