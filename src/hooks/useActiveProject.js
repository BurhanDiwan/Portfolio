"use client";

import { useState } from "react";

export function useActiveProject(initialIndex = 0) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(initialIndex);
  const [mediaMode, setMediaMode] = useState("desktop"); // 'desktop' | 'mobile' | 'video'

  const selectProject = (index) => {
    setActiveProjectIndex(index);
  };

  const toggleMediaMode = (mode) => {
    setMediaMode(mode);
  };

  return {
    activeProjectIndex,
    selectProject,
    mediaMode,
    toggleMediaMode,
  };
}
