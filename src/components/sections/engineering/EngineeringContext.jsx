"use client";

import { createContext, useContext, useState } from "react";

const EngineeringContext = createContext();

export function EngineeringProvider({ children }) {
  const [activeTech, setActiveTech] = useState(null);

  return (
    <EngineeringContext.Provider value={{ activeTech, setActiveTech }}>
      {children}
    </EngineeringContext.Provider>
  );
}

export function useEngineeringContext() {
  const context = useContext(EngineeringContext);
  if (!context) {
    throw new Error(
      "useEngineeringContext must be used within an EngineeringProvider"
    );
  }
  return context;
}
