"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Paragraph from "@/components/layout/Paragraph";
import OrbitDivider from "./OrbitDivider";
import { PHILOSOPHY_DATA } from "@/data/philosophy";
import { FiTarget, FiZap, FiFeather, FiLayers } from "react-icons/fi";

const ICON_MAP = {
  Target: FiTarget,
  Zap: FiZap,
  Feather: FiFeather,
  Layers: FiLayers,
};

// Word-by-word scroll reveal component for headline text
function ScrollWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.3em] last:mr-0 font-display font-light">
      {word}
    </motion.span>
  );
}

// Vision Pro Style 3D Tilt Card Component
function VisionProCard({ item, index, icon: IconComponent }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / width) * 10; // Max 10 deg tilt Y
    const rX = ((height / 2 - mouseY) / height) * 10; // Max 10 deg tilt X

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative group rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.08] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:border-white/25 overflow-hidden"
    >
      {/* Specular Light Sheen Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out" />

      <div className="relative z-10 flex flex-col h-full justify-between space-y-6" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest text-white/30 group-hover:text-white/70 transition-colors">
            0{index + 1}
          </span>
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
            <IconComponent className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-display font-medium text-white mb-2 tracking-wide">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm font-sans text-white/50 leading-relaxed font-light group-hover:text-white/80 transition-colors">
            {item.highlight}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Philosophy() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end end"],
  });

  // Chained Storytelling Transitions
  const paragraphOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const paragraphY = useTransform(scrollYProgress, [0.3, 0.5], [20, 0]);

  const cardsOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0.5, 0.7], [30, 0]);

  const { line1, line2 } = PHILOSOPHY_DATA.statement;
  const allWords = [...line1, ...line2];
  const totalWords = allWords.length;

  return (
    <Section id="philosophy" className="relative py-10 sm:py-16 overflow-hidden select-none">
      
      {/* Background Depth Layer 1: Atmospheric Haze */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

      {/* Background Depth Layer 2: Faint Orbital Ring Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-white/[0.015] pointer-events-none" />

      {/* Background Depth Layer 3: Architectural Micro Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

      <Container className="relative z-10 pointer-events-auto">
        <div ref={containerRef} className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Monumental Headline using Outfit Font */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-8 sm:mb-12 leading-[1.08] tracking-[-0.03em] font-display font-light">
            <div className="block mb-2 sm:mb-3">
              {line1.map((word, index) => {
                const start = (index / totalWords) * 0.4;
                const end = ((index + 1) / totalWords) * 0.4;
                return (
                  <ScrollWord
                    key={`l1-${index}`}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </div>
            <div className="block text-white/95">
              {line2.map((word, index) => {
                const actualIndex = line1.length + index;
                const start = (actualIndex / totalWords) * 0.4;
                const end = ((actualIndex + 1) / totalWords) * 0.4;
                return (
                  <ScrollWord
                    key={`l2-${index}`}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </div>
          </h2>

          {/* Sequential Paragraph Reveal */}
          <motion.div
            style={{ opacity: paragraphOpacity, y: paragraphY }}
            className="max-w-[700px] mb-12 sm:mb-16 space-y-4 text-center"
          >
            {PHILOSOPHY_DATA.paragraph.map((p, idx) => (
              <Paragraph key={idx} size="xl" color="secondary" className="leading-relaxed font-sans font-light text-white/65">
                {p}
              </Paragraph>
            ))}
          </motion.div>

          {/* Principles 4-Column Vision Pro Grid */}
          <motion.div style={{ opacity: cardsOpacity, y: cardsY }} className="w-full">
            <Grid cols={1} sm={2} lg={4} gap="lg" className="w-full text-left">
              {PHILOSOPHY_DATA.principles.map((item, idx) => {
                const IconComponent = ICON_MAP[item.icon] || FiTarget;
                return (
                  <VisionProCard
                    key={item.id}
                    item={item}
                    index={idx}
                    icon={IconComponent}
                  />
                );
              })}
            </Grid>
          </motion.div>

        </div>
      </Container>

      {/* Orbit Divider */}
      <OrbitDivider />
    </Section>
  );
}
