"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Tracks which project is active using IntersectionObserver.
 * Each project card gets a ref via `getItemRef(idx)`.
 * No scroll math. No rect.top. No broken sticky calculations.
 */
export function useProjectScroll(totalProjects = 3) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  // Store raw DOM elements, not ref objects
  const itemElements = useRef([]);

  // Clean callback ref factory — attach to each project wrapper via ref={getItemRef(idx)}
  const getItemRef = useCallback(
    (idx) => (el) => {
      itemElements.current[idx] = el;
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observers = [];

    itemElements.current.forEach((el, idx) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(idx);
            // Approximate progress: each project is 1/totalProjects of the journey
            setScrollProgress((idx + 0.5) / totalProjects);
          }
        },
        {
          // Card becomes "active" when it has entered and at least 30% is visible
          threshold: 0.3,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [totalProjects]);

  const scrollToProject = useCallback((idx) => {
    const el = itemElements.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return { containerRef, getItemRef, activeIndex, scrollProgress, scrollToProject };
}
