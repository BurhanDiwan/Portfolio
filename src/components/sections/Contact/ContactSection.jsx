"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { sectionVisibility } from "@/stores/sectionVisibility";
import Heading from "@/components/layout/Heading";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// Minimal vertical movement (12px) for an effortless, calm entrance.
// ─────────────────────────────────────────────────────────────────────────────

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const EMAIL_ADDRESS = "burhanuddin.dev04@gmail.com";

const SECONDARY_LINKS = [
  { label: "GitHub",   href: "https://github.com",   ariaLabel: "GitHub Profile" },
  { label: "LinkedIn", href: "https://linkedin.com", ariaLabel: "LinkedIn Profile" },
  { label: "Resume",   href: "/resume.pdf",          ariaLabel: "Download Resume", download: true },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ContactSection — Final Chapter.
 *
 * Design & Interaction Philosophy:
 * - Asymmetric lower-third layout: leaves the central cosmic wormhole visually untouched.
 * - Primary Action: Direct email as large, elegant typography. Clicking copies the email address
 *   to clipboard with clean, inline confirmation ("Copied to clipboard").
 * - Secondary Actions: Pure editorial text links with understated hover motion.
 * - Availability Badge: Linear-inspired status indicator with subtle pulse animation.
 * - Zero heavy containers, zero glassmorphism, zero unnecessary decorative elements.
 */
export default function ContactSection() {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);

  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef(null);

  // Synchronize R3F scene visibility state
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => { sectionVisibility.contact = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      sectionVisibility.contact = false;
    };
  }, []);

  // Early video buffer loading (fires 3 viewports before section enters view)
  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    const earlyLoad = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = "/videos/new-wormhole.mp4";
          video.load();
          earlyLoad.disconnect();
        }
      },
      { rootMargin: "0px 0px 300% 0px" }
    );

    earlyLoad.observe(section);
    return () => earlyLoad.disconnect();
  }, []);

  // Cleanup copy timeout on unmount
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  // Clipboard copy handler with non-intrusive inline state feedback
  const handleCopyEmail = useCallback(async (e) => {
    e.preventDefault();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = EMAIL_ADDRESS;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);

      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  }, []);

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-background overflow-hidden select-none"
      style={{ minHeight: "100vh" }}
      aria-label="Contact Section"
    >
      {/* ──────────────────────────────────────────────────────────────────
          BACKGROUND LAYER: Looping Cinematic Wormhole
          Maintained unchanged: object-fit: cover, lazy preloaded.
      ────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center max-md:object-contain max-md:scale-[2.2] max-md:object-[50%_40%]"
        />
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          ATMOSPHERIC LAYER: Radial & Linear Gradient Vignette
          Blends video boundaries seamlessly into #050505 while keeping
          the core wormhole structure open and clear.
      ────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 85% 75% at 50% 42%, transparent 35%, rgba(5,5,5,0.5) 68%, #050505 100%)",
            "linear-gradient(to bottom, transparent 20%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.92) 80%, #050505 100%)",
          ].join(", "),
        }}
      />

      {/* ──────────────────────────────────────────────────────────────────
          CONTENT LAYER: Editorial Layout
          Content occupies the lower-third, leaving room for the visual centerpiece.
      ────────────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col justify-between pointer-events-none"
        style={{ minHeight: "100vh" }}
      >
        {/* Upper visual spacer */}
        <div className="flex-1 min-h-[38vh] md:min-h-[44vh]" />

        {/* Lower content container */}
        <motion.div
          className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 md:pb-24 flex flex-col justify-end"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* 1. Availability Status Indicator (Linear Style) */}
          <motion.div variants={itemVariants} className="mb-6 flex items-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-black/40 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-text-secondary">
                Available for Q3/Q4 Collaborations
              </span>
            </div>
          </motion.div>

          {/* 2. Editorial Headline */}
          <motion.div variants={itemVariants} className="mb-6 max-w-4xl">
            <Heading
              variant="h1"
              className="font-light tracking-tight leading-[1.08] text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Let&apos;s Build Something
              <br />
              <span className="text-text-secondary font-serif italic">
                Worth Remembering.
              </span>
            </Heading>
          </motion.div>

          {/* 3. Concise Supporting Statement */}
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mb-10"
          >
            Open to frontend engineering roles, architectural advisory, and high-impact
            product collaborations that demand both technical depth and aesthetic precision.
          </motion.p>

          {/* 4. Primary Action: Interactive Email Text (Copy to Clipboard) */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="inline-block pointer-events-auto">
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={`Copy email address ${EMAIL_ADDRESS} to clipboard`}
                className="group relative flex flex-col items-start cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white group-hover:text-white/90 transition-colors duration-300">
                    {EMAIL_ADDRESS}
                  </span>
                  <span className="text-xs font-mono text-text-tertiary group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    ↗
                  </span>
                </div>

                {/* Subtle animated underline */}
                <div className="w-full h-[1px] bg-white/20 group-hover:bg-white/70 transition-colors duration-300 mt-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>

                {/* Inline copy feedback label */}
                <div className="h-5 mt-2 overflow-hidden">
                  <span
                    className={`block text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                      copied
                        ? "text-emerald-400 opacity-100 translate-y-0"
                        : "text-text-tertiary opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    }`}
                  >
                    {copied ? "Copied to clipboard" : "Click to copy email"}
                  </span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* 5. Secondary Editorial Links */}
          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-6"
          >
            {/* Social & Resume links */}
            <nav aria-label="Social media and resume links" className="flex items-center gap-8 sm:gap-12">
              {SECONDARY_LINKS.map(({ label, href, ariaLabel, download }) => (
                <a
                  key={label}
                  href={href}
                  target={download ? "_self" : "_blank"}
                  rel={download ? "" : "noopener noreferrer"}
                  download={download}
                  aria-label={ariaLabel}
                  className="group relative py-1 text-sm font-mono text-text-tertiary hover:text-white transition-colors duration-300 pointer-events-auto flex items-center gap-1.5"
                >
                  <span>{label}</span>
                  <span className="text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    ↗
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/50 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Copyright & Location stamp */}
            <div className="text-xs font-mono text-text-tertiary tracking-wider">
              <span>© {new Date().getFullYear()} BURHANUDDIN</span>
              <span className="mx-3 opacity-40">•</span>
              <span>EARTH // 0°0&apos;N</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
