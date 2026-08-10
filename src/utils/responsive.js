/**
 * Standardized breakpoints matching Tailwind defaults for JavaScript usage
 * when window.matchMedia is required outside of CSS.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Helper to check if current viewport matches a breakpoint
 * @param {string} breakpoint - 'sm', 'md', 'lg', 'xl', '2xl'
 * @returns {boolean}
 */
export const useMediaQuery = (breakpoint) => {
  if (typeof window === "undefined") return false;
  const width = BREAKPOINTS[breakpoint];
  if (!width) return false;
  return window.matchMedia(`(min-width: ${width}px)`).matches;
};
