"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { sectionVisibility } from "@/stores/sectionVisibility";
import { BeyondCodeProvider } from "./BeyondCodeContext";
import MindsetPanel from "./MindsetPanel";
import Heading from "@/components/layout/Heading";
import { 
  ProblemSolvingIcon, 
  DesignThinkingIcon, 
  AiNativeIcon, 
  PerformanceIcon, 
  ContinuousLearningIcon, 
  CraftsmanshipIcon 
} from "./MindsetIcons";

const MINDSETS = [
  {
    id: 0,
    title: "Problem Solving",
    description: "Code is just a tool. The real engineering happens before the first line is written, mapping complex requirements to elegant architectures.",
    icon: ProblemSolvingIcon,
  },
  {
    id: 1,
    title: "Design Thinking",
    description: "A profound respect for the end user. Great software is not just functional; it is intuitive, accessible, and a joy to use.",
    icon: DesignThinkingIcon,
  },
  {
    id: 2,
    title: "AI-Native Workflow",
    description: "Leveraging advanced intelligence to accelerate development, automate the mundane, and focus entirely on high-value creative engineering.",
    icon: AiNativeIcon,
  },
  {
    id: 3,
    title: "Performance First",
    description: "Speed is a feature. From bundle sizes to render cycles, every decision is measured against strict performance budgets.",
    icon: PerformanceIcon,
  },
  {
    id: 4,
    title: "Continuous Learning",
    description: "Technology moves fast. The ability to unlearn and adapt quickly is more valuable than resting on existing expertise.",
    icon: ContinuousLearningIcon,
  },
  {
    id: 5,
    title: "Craftsmanship",
    description: "Sweating the details. It's about writing clean, maintainable code that the next developer will thank you for.",
    icon: CraftsmanshipIcon,
  },
];

export default function BeyondCodeSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yForeground = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      sectionVisibility.beyondCodeProgress = v;
      sectionVisibility.beyondCode = v > 0.05 && v < 0.95;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <BeyondCodeProvider>
      <section 
        id="beyond-code" 
        ref={containerRef}
        className="relative overflow-hidden py-32 lg:py-48" // Removed local background color so global theme flows through
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pointer-events-auto">
          
          {/* Section Header */}
          <motion.div 
            className="mb-24 lg:mb-32 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="text-xs font-mono uppercase tracking-widest text-text-secondary">
                [05 // Beyond Code]
              </span>
            </div>
            <Heading variant="h2" className="max-w-3xl mx-auto font-normal">
              Engineering <span className="text-text-secondary italic">Mindset</span>
            </Heading>
          </motion.div>

          {/* Ecosystem Layout */}
          <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 lg:gap-8">
            
            {/* Left Panels (0, 1, 2) */}
            <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-1/3 lg:pt-24 z-20">
              {MINDSETS.slice(0, 3).map((mindset) => (
                <MindsetPanel 
                  key={mindset.id} 
                  {...mindset} 
                  align="right" 
                />
              ))}
            </div>

            {/* Centerpiece: Replaced by Global 3D Canvas */}
            <motion.div 
              className="w-full lg:w-1/3 flex justify-center sticky top-1/4 z-10 pointer-events-none"
              style={{ y: yForeground }}
            >
              {/* This space is intentionally left empty. 
                  The crystal and hero orb transition occurs in the global SceneCanvas
                  and is perfectly aligned with this visual gap. */}
              <div className="w-[200px] h-[300px] lg:w-[300px] lg:h-[500px]" />
            </motion.div>

            {/* Right Panels (3, 4, 5) */}
            <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-1/3 lg:pt-48 z-20">
              {MINDSETS.slice(3, 6).map((mindset) => (
                <MindsetPanel 
                  key={mindset.id} 
                  {...mindset} 
                  align="left" 
                />
              ))}
            </div>

          </div>
        </div>
      </section>
    </BeyondCodeProvider>
  );
}
