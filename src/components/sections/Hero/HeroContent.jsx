"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Heading from "@/components/layout/Heading";
import Paragraph from "@/components/layout/Paragraph";
import Button from "@/components/ui/Button";
import Stack from "@/components/layout/Stack";
import { PORTFOLIO_CONFIG } from "@/config/portfolio";

export default function HeroContent() {
  const [isReady, setIsReady] = useState(false);
  const names = PORTFOLIO_CONFIG.name.split(" ");

  useEffect(() => {
    // Wait for the Preloader GSAP exit animation to complete
    const handleReady = () => setIsReady(true);
    window.addEventListener("preloaderComplete", handleReady);

    // Fallback timer just in case the event fires before this mounts
    const fallback = setTimeout(() => setIsReady(true), 3500);

    return () => {
      window.removeEventListener("preloaderComplete", handleReady);
      clearTimeout(fallback);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  };

  const wordRevealVariants = {
    hidden: { opacity: 0, y: 70 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom,
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1], // Cinematic power3.out equivalent
      }
    })
  };

  const sweepVariants = {
    hidden: { backgroundPosition: "200% center" },
    visible: (custom) => ({
      backgroundPosition: "-200% center",
      transition: {
        delay: custom, 
        duration: 1.5,
        ease: [0.25, 1, 0.5, 1]
      }
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: custom,
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
      className="max-w-2xl "
    >
      <Heading variant="hero" className="mb-2 flex flex-col">
        {names.map((word, idx) => {
          const wordDelay = idx === 0 ? 0.20 : 0.38;
          const sweepDelay = idx === 0 ? 0.70 : 0.85;
          return (
            // Aggressively expand horizontal bounding box to prevent clipping on italic/tracking fonts
            // Expand top bounding box for ascenders
            // Keep bottom tight so the y:70 slide is cleanly clipped
            <div key={idx} className="overflow-hidden px-8 -mx-8 pt-8 -mt-8 pb-1 -mb-1">
              <motion.div 
                custom={wordDelay}
                variants={wordRevealVariants} 
                className="block relative"
              >
                <span className="relative text-white block">{word}</span>
                
                {/* One-time light sweep reflection */}
                <motion.span
                  custom={sweepDelay}
                  variants={sweepVariants}
                  className="absolute inset-0 pointer-events-none bg-[length:250%_100%]"
                  style={{
                     backgroundImage: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.7) 50%, transparent 70%)",
                     WebkitBackgroundClip: "text",
                     backgroundClip: "text",
                     color: "transparent",
                     backgroundRepeat: "no-repeat"
                  }}
                >
                  {word}
                </motion.span>
              </motion.div>
            </div>
          );
        })}
      </Heading>

      <motion.div custom={0.85} variants={itemVariants}>
        <Heading variant="h3" className="text-accent mb-6 font-normal">
          {PORTFOLIO_CONFIG.title}
        </Heading>
      </motion.div>

      <motion.div custom={1.05} variants={itemVariants}>
        <Paragraph size="xl" color="secondary" className="mb-10 max-w-xl">
          {PORTFOLIO_CONFIG.shortBio}
        </Paragraph>
      </motion.div>

      <motion.div custom={1.25} variants={itemVariants}>
        <Stack direction="row" gap="md" wrap>
          <a href="#projects">
            <Button variant="primary" size="lg">
              View Projects
            </Button>
          </a>
          <a href={PORTFOLIO_CONFIG.resumeUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              Download Resume
            </Button>
          </a>
        </Stack>
      </motion.div>
    </motion.div>
  );
}
