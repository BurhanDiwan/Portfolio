"use client";

import { createContext, useContext, useState } from "react";

const BeyondCodeContext = createContext();

export function BeyondCodeProvider({ children }) {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <BeyondCodeContext.Provider value={{ activePanel, setActivePanel }}>
      {children}
    </BeyondCodeContext.Provider>
  );
}

export function useBeyondCodeContext() {
  const context = useContext(BeyondCodeContext);
  if (!context) {
    throw new Error(
      "useBeyondCodeContext must be used within a BeyondCodeProvider"
    );
  }
  return context;
}
