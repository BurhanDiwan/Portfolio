import { PORTFOLIO_CONFIG } from "@/config/portfolio";
import Button from "../ui/Button";

export default function ResumeButton({ isMobile }) {
  // The resume URL is dynamically pulled from the central PORTFOLIO_CONFIG.
  // To update the resume across the entire site, simply replace the PDF in 
  // the public/resume/ folder and ensure the config points to it.
  return (
    <a href={PORTFOLIO_CONFIG.resumeUrl} target="_blank" rel="noopener noreferrer">
      <Button variant="secondary" size={isMobile ? "lg" : "sm"}>
        Resume
      </Button>
    </a>
  );
}
