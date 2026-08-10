/**
 * A tiny zero-overhead global store for section visibility states.
 * Written to by DOM components (via IntersectionObserver).
 * Read by the R3F render loop (GlobalTransitions) inside useFrame.
 * No React state = no re-renders = no performance cost.
 */
export const sectionVisibility = {
  contact:    false,
  beyondCode: false,
  beyondCodeProgress: 0,
};
