"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useAnimationFrame } from "framer-motion";
import Heading from "@/components/layout/Heading";
import { useWormholeFrames } from "@/hooks/useWormholeFrames";
import { sectionVisibility } from "@/stores/sectionVisibility";

const EMAIL_ADDRESS = "burhanuddin.dev04@gmail.com";
const SECONDARY_LINKS = [
  { label: "GitHub",   href: "https://github.com",   ariaLabel: "GitHub Profile" },
  { label: "LinkedIn", href: "https://linkedin.com", ariaLabel: "LinkedIn Profile" },
  { label: "Resume",   href: "/resume.pdf",          ariaLabel: "Download Resume", download: true },
];

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

export default function ScrollWormholeContact() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef(null);
  const lastDrawnIndex = useRef(-1);
  
  const { isReady, framesRef } = useWormholeFrames();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

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

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopyEmail = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
      } else {
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
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  }, []);

  const calculateDrawRect = (imgW, imgH, canvasW, canvasH, isMobile) => {
    const imgAspect = imgW / imgH;
    const canvasAspect = canvasW / canvasH;
    let drawW, drawH, x, y;

    if (isMobile) {
      const scaleToHeight = canvasH / imgH;
      const scaleToWidth = canvasW / imgW;
      let scale = Math.max(scaleToHeight, scaleToWidth);
      drawW = imgW * scale * 1.1; // 1.1 for slight zoom without losing aperture
      drawH = imgH * scale * 1.1;
      x = (canvasW - drawW) / 2;
      y = (canvasH - drawH) / 2;
    } else {
      if (canvasAspect > imgAspect) {
         const scaleToHeight = canvasH / imgH;
         const scaleToWidth = canvasW / imgW;
         let scale = scaleToHeight * 1.05;
         scale = Math.min(scale, scaleToWidth);
         drawW = imgW * scale;
         drawH = imgH * scale;
      } else {
         const scale = canvasH / imgH;
         drawW = imgW * scale;
         drawH = imgH * scale;
      }
      x = (canvasW - drawW) / 2;
      y = (canvasH - drawH) / 2;
    }
    return { x, y, width: drawW, height: drawH };
  };

  const drawImage = useCallback((ctx, img, width, height, isMobile) => {
    const { x, y, width: drawW, height: drawH } = calculateDrawRect(img.width, img.height, width, height, isMobile);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, x, y, drawW, drawH);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const isMobile = window.innerWidth < 768;
    // Cap DPR to 2 for performance, 1.25 on mobile
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2);
    
    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    // Force redraw with new dimensions
    if (lastDrawnIndex.current !== -1 && framesRef.current[lastDrawnIndex.current]) {
      const ctx = canvas.getContext("2d", { alpha: false });
      const isMobile = window.innerWidth < 768;
      drawImage(ctx, framesRef.current[lastDrawnIndex.current], canvas.width, canvas.height, isMobile);
    }
  }, [drawImage, framesRef]);

  useEffect(() => {
    if (!isReady) return;
    
    // Initial resize when ready
    resizeCanvas();

    // Re-calculate on window resize
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isReady, resizeCanvas]);

  useAnimationFrame(() => {
    if (!isReady || !canvasRef.current) return;
    
    const progress = scrollYProgress.get();
    const holdStart = 0.08;
    const holdEnd = 0.92;
    let mappedProgress = 0;
    if (progress <= holdStart) {
        mappedProgress = 0;
    } else if (progress >= holdEnd) {
        mappedProgress = 1;
    } else {
        mappedProgress = (progress - holdStart) / (holdEnd - holdStart);
    }
    const frameIndex = Math.min(199, Math.max(0, Math.round(mappedProgress * 199)));
    
    if (frameIndex !== lastDrawnIndex.current) {
      let renderIndex = frameIndex;
      
      if (!framesRef.current[renderIndex]) {
         if (lastDrawnIndex.current !== -1 && framesRef.current[lastDrawnIndex.current]) {
            renderIndex = lastDrawnIndex.current;
         } else {
            renderIndex = framesRef.current.findIndex(f => f != null);
         }
      }

      if (renderIndex !== -1) {
        const img = framesRef.current[renderIndex];
        if (img) {
           const canvas = canvasRef.current;
           const ctx = canvas.getContext("2d", { alpha: false });
           const isMobile = window.innerWidth < 768;
           drawImage(ctx, img, canvas.width, canvas.height, isMobile);
           lastDrawnIndex.current = renderIndex;
        }
      }
    }
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-background select-none min-h-[400vh] md:min-h-[450vh]"
      aria-label="Contact Section"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Loading State */}
        {!isReady && (
          <div className="absolute inset-0 bg-background z-50 flex items-center justify-center">
             {/* Minimal subtle indicator matching existing aesthetics */}
             <div className="w-1 h-1 rounded-full bg-white/20 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
          </div>
        )}

        {/* ──────────────────────────────────────────────────────────────────
            BACKGROUND LAYER: Z-0 (Canvas)
        ────────────────────────────────────────────────────────────────── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        />

        {/* ──────────────────────────────────────────────────────────────────
            ATMOSPHERIC LAYER: Z-1 (Gradient Vignette)
        ────────────────────────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: [
              "radial-gradient(ellipse 85% 75% at 50% 42%, transparent 35%, rgba(5,5,5,0.5) 68%, #050505 100%)",
              "linear-gradient(to bottom, transparent 20%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.92) 80%, #050505 100%)",
            ].join(", "),
          }}
        />

        {/* ──────────────────────────────────────────────────────────────────
            CONTENT LAYER: Z-20 (Editorial Layout)
        ────────────────────────────────────────────────────────────────── */}
        <div className="relative z-20 flex flex-col justify-between pointer-events-none h-full">
          <div className="flex-1 min-h-[20vh] md:min-h-[30vh]" />

          <motion.div
            className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 md:pb-24 flex flex-col justify-end"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* 1. Availability Status Indicator */}
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
                className="font-light tracking-tight leading-[1.08] text-white text-[clamp(2.5rem,8vw,6rem)]"
              >
                Let&apos;s Build
                <br className="max-sm:hidden" />
                <span className="sm:hidden">&nbsp;</span>
                Something
                <br />
                <span className="text-text-secondary italic">
                  Worth Remembering.
                </span>
              </Heading>
            </motion.div>

            {/* 3. Concise Supporting Statement */}
            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-[280px] sm:max-w-md md:max-w-2xl mb-10"
            >
              Open to frontend engineering roles, architectural advisory, and high-impact
              product collaborations that demand both technical depth and aesthetic precision.
            </motion.p>

            {/* 4. Primary Action: Interactive Email Text */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="inline-block pointer-events-auto">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={`Copy email address ${EMAIL_ADDRESS} to clipboard`}
                  className="group relative flex flex-col items-start cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                >
                  <div className="flex items-center gap-3 sm:gap-4 max-w-full overflow-hidden">
                    <span className="text-[clamp(1.1rem,5vw,3rem)] font-light tracking-tight text-white group-hover:text-white/90 transition-colors duration-300 break-all max-w-full pr-2">
                      {EMAIL_ADDRESS}
                    </span>
                    <span className="text-xs font-mono text-text-tertiary group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                      ↗
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-white/20 group-hover:bg-white/70 transition-colors duration-300 mt-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  </div>

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

              <div className="text-xs font-mono text-text-tertiary tracking-wider">
                <span>© {new Date().getFullYear()} BURHANUDDIN</span>
                <span className="mx-3 opacity-40">•</span>
                <span>EARTH // 0°0&apos;N</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
