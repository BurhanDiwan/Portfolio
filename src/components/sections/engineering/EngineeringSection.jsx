"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EngineeringProvider, useEngineeringContext } from "./EngineeringContext";
import EngineeringHeader from "./EngineeringHeader";
import EngineeringCore from "./EngineeringCore";
import TechnologyCategory from "./TechnologyCategory";
import TechnologyOrbs from "./TechnologyOrbs";
import EcosystemConnections from "./EcosystemConnections";
import { CATEGORY_ORDER, getTechByCategory } from "@/data/technologies";

const techByCategory = getTechByCategory();

function EngineeringSectionContent() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax layers
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const coreY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const orbsY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const { activeTech } = useEngineeringContext();

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="relative py-24 sm:py-32 lg:py-40 min-h-[1100px] overflow-hidden select-none"
    >
      {/* ── Layer 0: Blueprint Background (Parallax) ── */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ y: bgY }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px"
          }}
        />
      </motion.div>

      {/* ── Layer 1: Ambient Lighting ── */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        animate={{ opacity: activeTech ? 1.2 : 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <motion.div 
          animate={{ scale: activeTech ? 1.05 : 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.025)_0%,transparent_70%)] mix-blend-screen" 
        />
        <motion.div 
          animate={{ scale: activeTech ? 1.05 : 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.015)_0%,transparent_70%)] mix-blend-screen" 
        />
      </motion.div>

      {/* ── Layer 2: Core, Orbs, Connections (Centered Absolute Layout) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="relative w-full max-w-[1400px] h-full mx-auto">
          {/* Engineering Core (Center) */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] flex items-center justify-center pointer-events-auto"
            style={{ y: coreY }}
          >
            <EngineeringCore />
          </motion.div>

          {/* Connections System */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 1.5 }}
          >
            <EcosystemConnections />
          </motion.div>

          {/* Technology Orbs */}
          <motion.div 
            className="absolute inset-0"
            style={{ y: orbsY }}
          >
            <TechnologyOrbs />
          </motion.div>
        </div>
      </div>

      {/* ── Layer 3: Foreground Content (Cards, Header) ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pointer-events-none">
        
        {/* Header - Make it pointer events auto so it can be selected/interacted with */}
        <div className="pointer-events-auto mb-20 lg:mb-32">
          <EngineeringHeader />
        </div>

        {/* Editorial Grid Layout for Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 lg:gap-y-24">
          
          {/* Left Column (Cols 1-4): Frontend, Tools */}
          <div className="lg:col-span-4 lg:col-start-1 flex flex-col gap-16 lg:gap-24 pointer-events-auto">
            {["Frontend", "Tools"].map((category, idx) => {
              const technologies = techByCategory[category] ?? [];
              if (!technologies.length) return null;
              return (
                <TechnologyCategory
                  key={category}
                  category={category}
                  technologies={technologies}
                  index={idx} // Drives sequence delay
                />
              );
            })}
          </div>

          {/* Right Column (Cols 9-12): Backend, Database, State */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-16 lg:gap-24 pointer-events-auto">
            {["Backend", "Database", "State Management"].map((category, idx) => {
              const technologies = techByCategory[category] ?? [];
              if (!technologies.length) return null;
              return (
                <TechnologyCategory
                  key={category}
                  category={category}
                  technologies={technologies}
                  index={idx + 2} // Continues sequence delay
                />
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

export default function EngineeringSection() {
  return (
    <EngineeringProvider>
      <EngineeringSectionContent />
    </EngineeringProvider>
  );
}
