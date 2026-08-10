"use client";
import { useState, useEffect } from "react";
import { NAVIGATION } from "@/config/navigation";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = NAVIGATION.map((item) => item.id);
    const elements = sectionIds.map((id) => document.getElementById(id));
    
    // Intersection Observer to track which section is highly visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -79% 0px", // Triggers when section passes the top 20% mark
      }
    );

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
