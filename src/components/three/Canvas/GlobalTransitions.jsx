"use client";

import { useScroll } from "framer-motion";
import { useFrame, useThree }  from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import CrystalModel  from "../../sections/beyond-code/CrystalModel";
import { sectionVisibility } from "@/stores/sectionVisibility";

export default function GlobalTransitions({ heroGroupRef }) {
  const { scrollYProgress } = useScroll();
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  const [showCrystal, setShowCrystal] = useState(false);
  const crystalGroupRef   = useRef();
  const crystalOpacityRef = useRef(0);

  // ── Crystal: mount based on scroll range only ──────────────────────────────
  // Use sectionVisibility.beyondCode (driven by the BeyondCodeSection's local scroll)
  // We use the global scroll event simply as a tick to sync React state without polling.
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", () => {
      setShowCrystal(sectionVisibility.beyondCode);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // ── R3F render loop ────────────────────────────────────────────────────────
  useFrame((_, delta) => {
    const progress = scrollYProgress.get();
    const isContactActive = sectionVisibility.contact;

    // ── Hero Orb ──────────────────────────────────────────────────────────────
    if (heroGroupRef?.current) {
      if (isContactActive) {
        heroGroupRef.current.visible = false;
      } else {
        const t = Math.min(Math.max((progress - 0.15) / (0.25 - 0.15), 0), 1);
        heroGroupRef.current.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = true;
            child.material.opacity     = progress > 0.15 ? 1 - t : 1;
          }
        });
        heroGroupRef.current.visible = progress <= 0.25;
      }
    }

    // ── Beyond Code Crystal ────────────────────────────────────────────────────
    if (crystalGroupRef.current) {
      let target;

      if (isContactActive) {
        // Contact section is visible → fade crystal to invisible.
        target = 0;
      } else {
        // Scroll-progress-based envelope based on LOCAL section progress:
        // Local progress (0 to 1) means:
        // 0.0: Section top hits viewport bottom
        // 1.0: Section bottom hits viewport top
        const localP = sectionVisibility.beyondCodeProgress || 0;
        
        const inT  = Math.min(Math.max((localP - 0.2) / 0.15, 0), 1);
        const outT = Math.min(Math.max((localP - 0.7) / 0.15, 0), 1);
        target = localP < 0.2 ? 0 : localP < 0.7 ? inT : 1 - outT;
      }

      // Lerp speed: delta * 1.8
      //   At 60 fps (delta≈0.0167): moves ~3% per frame → ~1.8s to fully fade
      //   At 120 fps (delta≈0.0083): moves ~1.5% per frame → ~1.5s to fully fade
      //   This feels like a natural, cinematic dissolve.
      crystalOpacityRef.current = THREE.MathUtils.lerp(
        crystalOpacityRef.current, target, delta * 1.8
      );
      const o = crystalOpacityRef.current;

      crystalGroupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity     = o;
        }
      });
      // Hide from GPU only when truly invisible (saves draw calls)
      crystalGroupRef.current.visible = o > 0.005;
    }
  });

  return (
    <>
      {/* Beyond Code Crystal */}
      <group ref={crystalGroupRef}>
        {showCrystal && <CrystalModel scale={isMobile ? 0.65 : 1.5} position={[0, 0, 0]} />}
      </group>
    </>
  );
}
