"use client";
import { useState, useEffect, useRef } from "react";

const TOTAL_FRAMES = 200;

export function useWormholeFrames() {
  const [isReady, setIsReady] = useState(false);
  const framesRef = useRef(new Array(TOTAL_FRAMES).fill(null));

  useEffect(() => {
    let isCancelled = false;

    const loadFrame = async (index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        // Frames are 1-indexed: ezgif-frame-001.png
        const frameNumber = String(index + 1).padStart(3, '0');
        img.src = `/videos/ezgif-frame-${frameNumber}.png`;
        
        img.onload = async () => {
          try {
            await img.decode?.();
          } catch (e) {
            // Ignore decode error and fallback to normal image
          }
          if (!isCancelled) {
            framesRef.current[index] = img;
          }
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    const loadBatch = async (start, end) => {
      const promises = [];
      for (let i = start; i <= end; i++) {
        if (!framesRef.current[i]) {
          promises.push(loadFrame(i).catch(() => null));
        }
      }
      await Promise.all(promises);
    };

    const init = async () => {
      // Phase 1: load first frame
      await loadFrame(0).catch(console.error);
      if (!isCancelled) setIsReady(true);

      // Phase 2: 1-19
      if (!isCancelled) await loadBatch(1, 19);
      
      // Phase 3: 20-59
      if (!isCancelled) await loadBatch(20, 59);

      // Phase 4: 60-119
      if (!isCancelled) await loadBatch(60, 119);

      // Phase 5: 120-199
      if (!isCancelled) await loadBatch(120, TOTAL_FRAMES - 1);
    };

    init();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { isReady, framesRef };
}
