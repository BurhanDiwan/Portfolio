"use client";
import { ReactLenis } from 'lenis/react';

export default function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 0.9, smoothTouch: false, syncTouch: false }}>
      {children}
    </ReactLenis>
  );
}
