"use client";

import { motion } from "framer-motion";
import { useBeyondCodeContext } from "./BeyondCodeContext";
import Heading from "@/components/layout/Heading";
import Paragraph from "@/components/layout/Paragraph";

export default function MindsetPanel({ 
  id, 
  title, 
  description, 
  icon: Icon,
  align = "left" 
}) {
  const { activePanel, setActivePanel } = useBeyondCodeContext();
  const isActive = activePanel === id;
  const isDimmed = activePanel !== null && activePanel !== id;

  return (
    <motion.div
      className={`relative p-6 sm:p-8 rounded-2xl cursor-default transition-all duration-700 ease-out flex flex-col ${align === "right" ? "items-end text-right" : "items-start text-left"}`}
      onMouseEnter={() => setActivePanel(id)}
      onMouseLeave={() => setActivePanel(null)}
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        scale: isActive ? 1.02 : 1,
        x: isActive ? (align === "left" ? 10 : -10) : 0,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Premium Glass Background */}
      <motion.div 
        className="absolute inset-0 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-[2px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Active Local Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 flex flex-col gap-4 max-w-sm">
        {/* Animated SVG Icon container */}
        <div 
          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/[0.1] transition-colors duration-500 ${isActive ? 'border-white/[0.3] bg-white/[0.08]' : ''}`}
        >
          <Icon isActive={isActive} />
        </div>

        <div>
          <Heading 
            variant="h4" 
            className={`font-normal transition-colors duration-500 ${isActive ? 'text-white' : 'text-text-primary'}`}
          >
            {title}
          </Heading>
          <Paragraph 
            size="sm" 
            color="secondary" 
            className="mt-3 leading-relaxed"
          >
            {description}
          </Paragraph>
        </div>
      </div>
    </motion.div>
  );
}
