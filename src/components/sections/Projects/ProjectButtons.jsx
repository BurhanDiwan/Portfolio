"use client";

import Button from "@/components/ui/Button";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectButtons({ liveUrl, githubUrl }) {
  return (
    <div className="flex flex-wrap items-center gap-4 pt-4">
      {liveUrl && (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="md" className="group">
            <span>Live Demo</span>
            <FiExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
        </a>
      )}

      {githubUrl && (
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="md" className="group">
            <FiGithub className="w-4 h-4 mr-2" />
            <span>GitHub Repository</span>
          </Button>
        </a>
      )}
    </div>
  );
}
