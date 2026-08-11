"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Heading from "@/components/layout/Heading";
import Paragraph from "@/components/layout/Paragraph";
import AboutPortrait from "./AboutPortrait";
import AboutTimeline from "./AboutTimeline";
import { PROFILE_DATA } from "@/data/profile";

export default function About() {
  return (
    <Section id="about" className="relative py-10 sm:py-16 overflow-hidden select-none">
      
      {/* Background Depth & Haze */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />

      <Container className="relative z-10 pointer-events-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <span className="text-xs font-mono tracking-[0.4em] text-white/40 uppercase block mb-3">
            {PROFILE_DATA.label}
          </span>
          <Heading variant="h2" className="text-white font-light tracking-tight font-display text-4xl sm:text-6xl">
            {PROFILE_DATA.title}
          </Heading>
        </motion.div>

        {/* Editorial Two-Column Main Content */}
        <Grid cols={1} lg={12} gap="xl" className="items-start">
          
          {/* Left Column: Story + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-10 sm:space-y-12"
          >
            {/* Story Paragraphs */}
            <div className="space-y-5">
              {PROFILE_DATA.paragraphs.map((para, index) => (
                <Paragraph
                  key={index}
                  size={index === 0 ? "xl" : "lg"}
                  color={index === 0 ? "primary" : "secondary"}
                  className="leading-relaxed font-sans font-light text-white/75"
                >
                  {para}
                </Paragraph>
              ))}
            </div>

            {/* Luxury Information Panels (Annual Report Aesthetic) */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-y border-white/[0.08] py-8">
              {PROFILE_DATA.stats.map((stat, idx) => {
                const isLong = stat.value.length > 8;
                const isMedium = stat.value.length > 4;
                const fontSize = isLong
                  ? "text-lg sm:text-xl lg:text-2xl"
                  : isMedium
                  ? "text-2xl sm:text-3xl"
                  : "text-3xl sm:text-4xl lg:text-5xl";

                return (
                  <div
                    key={idx}
                    className="relative flex flex-col justify-between pr-2 sm:pr-4 last:border-r-0 sm:border-r border-white/[0.06] group min-w-0"
                  >
                    <span
                      className={`${fontSize} font-extralight text-white font-display tracking-tight mb-2 group-hover:translate-x-1 transition-transform duration-300 block truncate`}
                      title={stat.value}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.15em] text-white/40 uppercase truncate">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Parallax Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <AboutPortrait imageSrc={PROFILE_DATA.image} />
          </motion.div>
        </Grid>

        {/* Dedicated Quote Composition Moment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 sm:mt-28 max-w-3xl mx-auto text-center relative"
        >
          {/* Oversized Low-Opacity Quotation Mark Watermark */}
          <span className="absolute -top-14 left-1/2 -translate-x-1/2 text-[140px] leading-none font-serif text-white/[0.04] select-none pointer-events-none">
            “
          </span>

          <blockquote className="relative z-10 py-6 px-6">
            <p className="text-2xl sm:text-3xl font-light italic text-white/90 font-sans leading-relaxed tracking-wide">
              &quot;{PROFILE_DATA.quote}&quot;
            </p>
          </blockquote>
          
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-2" />
        </motion.div>

        {/* Milestone Timeline */}
        <AboutTimeline milestones={PROFILE_DATA.timeline} />
      </Container>
    </Section>
  );
}
