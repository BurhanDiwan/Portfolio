/**
 * Reusable animation easing curves and duration constants for GSAP and Framer Motion.
 */

// Premium Easing Curves
export const EASING = {
  apple: "cubic-bezier(0.25, 1, 0.5, 1)",
  smooth: "power4.inOut",
  snappy: "back.out(1.7)",
  spring: "elastic.out(1, 0.75)",
};

// Framer Motion Transition Defaults
export const TRANSITIONS = {
  fade: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  slideUp: { duration: 0.6, ease: [0.25, 1, 0.5, 1], y: { from: 20, to: 0 } },
  stagger: (staggerValue = 0.1) => ({
    staggerChildren: staggerValue,
    delayChildren: 0.1,
  }),
};
