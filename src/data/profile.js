import { PORTFOLIO_CONFIG } from "@/config/portfolio";

export const PROFILE_DATA = {
  label: "WHO I AM",
  title: "The Person Behind the Experience",
  paragraphs: [
    "I'm Burhan Diwan, an IT student and Full Stack JavaScript Developer focused on creating fast, interactive, and thoughtfully engineered web experiences.",
    "I enjoy turning complex ideas into interfaces that feel simple to use, combining clean architecture, modern technologies, and attention to detail in every project.",
    "For me, development isn't just about writing code—it's about designing experiences that people genuinely enjoy using."
  ],
  stats: [
    { label: "Projects", value: "15+" },
    { label: "Technologies", value: "10+" },
    { label: "Learning", value: "Continuous" },
    { label: "Focus", value: "Full Stack" },
  ],
  timeline: [
    {
      id: "t1",
      title: "Started Learning Web Development",
      description: "Discovered a passion for code, mastering HTML, CSS, and basic JavaScript fundamentals.",
    },
    {
      id: "t2",
      title: "Built First Real Website",
      description: "Crafted custom responsive web layouts and learned modern DOM manipulation.",
    },
    {
      id: "t3",
      title: "Started Learning Full Stack Development",
      description: "Expanded into Node.js, Express, and databases to build complete end-to-end applications.",
    },
    {
      id: "t4",
      title: "React & Next.js",
      description: "Adopted component-driven architecture, Server Components, and state management.",
    },
    {
      id: "t5",
      title: "Building Production Projects",
      description: "Engineering immersive 3D experiences with React Three Fiber, GSAP, and Tailwind CSS.",
    },
    {
      id: "t6",
      title: "AI Engineering",
      tag: "Future Goal",
      description: "Exploring agentic AI integrations, LLM pipelines, and intelligent interactive interfaces.",
    },
  ],
  quote: "Good software feels invisible.",
  image: "/images/portrait.png",
};
