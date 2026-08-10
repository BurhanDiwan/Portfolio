// src/data/technologies.js
// All technology data for the Engineering Capabilities section.
// To add or modify a technology, update only this file.

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiRedux,
  SiGit,
  SiGithub,
  SiVite,
  SiPostman,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";

// Proficiency levels:
// CORE       — used every day, primary strength
// DAILY      — used regularly, very comfortable
// EXPERIENCED — solid understanding, used in real projects
// EXPLORING  — actively learning or recently adopted

export const TECHNOLOGIES = [
  // ─────────────────────────────
  // FRONTEND
  // ─────────────────────────────
  {
    id: "html5",
    name: "HTML5",
    category: "Frontend",
    Icon: SiHtml5,
    iconColor: "#E44D26",
    level: "CORE",
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Frontend",
    Icon: SiCss,
    iconColor: "#264DE4",
    level: "CORE",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Frontend",
    Icon: SiJavascript,
    iconColor: "#F7DF1E",
    level: "CORE",
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    Icon: SiReact,
    iconColor: "#61DAFB",
    level: "CORE",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    Icon: SiNextdotjs,
    iconColor: "#FFFFFF",
    level: "DAILY",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    Icon: SiTailwindcss,
    iconColor: "#38BDF8",
    level: "DAILY",
  },

  // ─────────────────────────────
  // BACKEND
  // ─────────────────────────────
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    Icon: SiNodedotjs,
    iconColor: "#68A063",
    level: "DAILY",
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    Icon: SiExpress,
    iconColor: "#FFFFFF",
    level: "DAILY",
  },

  // ─────────────────────────────
  // DATABASE
  // ─────────────────────────────
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    Icon: SiMongodb,
    iconColor: "#4DB33D",
    level: "EXPERIENCED",
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Database",
    Icon: SiFirebase,
    iconColor: "#FFCA28",
    level: "EXPERIENCED",
  },

  // ─────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────
  {
    id: "redux",
    name: "Redux Toolkit",
    category: "State Management",
    Icon: SiRedux,
    iconColor: "#764ABC",
    level: "DAILY",
  },
  {
    id: "context",
    name: "Context API",
    category: "State Management",
    Icon: TbApi,
    iconColor: "#61DAFB",
    level: "CORE",
  },

  // ─────────────────────────────
  // TOOLS
  // ─────────────────────────────
  {
    id: "git",
    name: "Git",
    category: "Tools",
    Icon: SiGit,
    iconColor: "#F05032",
    level: "CORE",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Tools",
    Icon: SiGithub,
    iconColor: "#FFFFFF",
    level: "CORE",
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "Tools",
    Icon: VscCode,
    iconColor: "#007ACC",
    level: "CORE",
  },
  {
    id: "vite",
    name: "Vite",
    category: "Tools",
    Icon: SiVite,
    iconColor: "#646CFF",
    level: "DAILY",
  },
  {
    id: "postman",
    name: "Postman",
    category: "Tools",
    Icon: SiPostman,
    iconColor: "#FF6C37",
    level: "EXPERIENCED",
  },
];

// Ordered category display
export const CATEGORY_ORDER = [
  "Frontend",
  "Backend",
  "Database",
  "State Management",
  "Tools",
];

// Group technologies by category
export const getTechByCategory = () => {
  return CATEGORY_ORDER.reduce((acc, cat) => {
    acc[cat] = TECHNOLOGIES.filter((t) => t.category === cat);
    return acc;
  }, {});
};
