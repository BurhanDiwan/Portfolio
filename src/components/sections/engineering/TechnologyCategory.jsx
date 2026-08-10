"use client";

import { motion } from "framer-motion";
import TechnologyNode from "./TechnologyNode";
import { useEngineeringContext } from "./EngineeringContext";

// Container variant drives stagger of all children
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function TechnologyCategory({ category, technologies, index = 0 }) {
  const { activeTech } = useEngineeringContext();
  const sectionDelay = index * 0.15;
  
  // Is any technology in this category currently active/hovered?
  const isCategoryActive = technologies.some(t => t.id === activeTech);

  // Category specific ambient animation
  // Frontend -> slight horizontal energy
  // Backend -> stable, no movement
  // Database -> slow vertical pulse
  // State -> looping signal (opacity shift)
  // Tools -> mechanical (tiny rotation)
  const getAmbientAnimation = () => {
    switch (category) {
      case "Frontend":
        return { x: [0, 2, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };
      case "Database":
        return { y: [0, -2, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } };
      case "State Management":
        return { opacity: [1, 0.7, 1], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } };
      case "Tools":
        return { rotate: [0, 0.5, 0], transition: { duration: 6, repeat: Infinity, ease: "linear" } };
      default:
        return {};
    }
  };

  return (
    <div className="flex flex-col gap-3 relative z-10">
      {/* Category Label + animated divider */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.5, delay: sectionDelay }}
        animate={getAmbientAnimation()}
      >
        <motion.span
          animate={{ 
            color: isCategoryActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
            textShadow: isCategoryActive ? "0 0 8px rgba(255,255,255,0.2)" : "none"
          }}
          transition={{ duration: 0.3 }}
          className="text-[10px] font-mono tracking-[0.22em] uppercase flex-shrink-0"
        >
          {category}
        </motion.span>

        {/* Divider grows horizontally from left */}
        <div className="flex-1 h-px overflow-hidden">
          <motion.div
            className="h-full"
            animate={{ 
              background: isCategoryActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)" 
            }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: sectionDelay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <motion.span
          animate={{ opacity: isCategoryActive ? 0.6 : 0.2 }}
          transition={{ duration: 0.3 }}
          className="text-[10px] font-mono flex-shrink-0 text-white"
        >
          {technologies.length.toString().padStart(2, "0")}
        </motion.span>
      </motion.div>

      {/* Nodes — stagger as a group */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
      >
        {technologies.map((tech) => (
          <motion.div key={tech.id} variants={nodeVariants}>
            <TechnologyNode tech={tech} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
