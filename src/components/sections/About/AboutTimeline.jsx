"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutTimeline({ milestones = [] }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });

  // Animated Height for Vertical Line Drawing
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative mt-20 sm:mt-28 pt-8">
      
      {/* Section Header */}
      <div className="mb-20 text-center">
        <span className="text-xs font-mono tracking-[0.4em] text-white/40 uppercase block mb-2">
          JOURNEY
        </span>
        <h3 className="text-2xl sm:text-3xl font-light text-white mt-1 font-display tracking-tight">
          Milestones & Evolution
        </h3>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
        
        {/* Background Vertical Line Track */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.06] -translate-x-1/2" />

        {/* Animated Drawing Foreground Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-6 sm:left-1/2 top-0 w-[1.5px] bg-gradient-to-b from-white/90 via-white to-white/30 -translate-x-1/2 origin-top shadow-[0_0_12px_#fff]"
        />

        {/* Milestone Items */}
        <div className="space-y-24 sm:space-y-32">
          {milestones.map((item, idx) => {
            const isEven = idx % 2 === 0;
            // Node activation range based on scroll index
            const stepRatio = idx / (milestones.length - 1);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Active Node Circle with Glow Pulse */}
                <div className="absolute left-6 sm:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="relative w-5 h-5 rounded-full bg-black border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                {/* Content Card Side */}
                <div className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${isEven ? "sm:pr-16 sm:text-right" : "sm:pl-16"}`}>
                  <div className="group rounded-3xl p-8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center space-x-3 mb-3 justify-start sm:justify-start">
                      {item.tag && (
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono tracking-wider text-white">
                          {item.tag}
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-white/30 tracking-widest uppercase">
                        STEP 0{idx + 1}
                      </span>
                    </div>

                    <h4 className="text-xl font-medium text-white mb-2 font-sans tracking-wide">
                      {item.title}
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light group-hover:text-white/80 transition-colors">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
