"use client";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";

export default function MobileMenu({ isOpen, closeMenu }) {
  const menuVariants = {
    closed: { opacity: 0, y: "-100%", transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-[40] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <NavLinks isMobile onItemClick={closeMenu} />
            <div className="mt-12">
              <SocialLinks />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
