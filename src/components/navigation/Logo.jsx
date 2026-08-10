import { SITE } from "@/config/site";
import { useLenis } from "lenis/react";

export default function Logo() {
  const lenis = useLenis();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo("#home", { offset: 0, duration: 1.5 });
    }
  };

  return (
    <a
      href="#home"
      onClick={handleLogoClick}
      className="text-xl font-display font-bold tracking-tighter text-text-primary transition-opacity hover:opacity-80 active:scale-95"
      aria-label={`${SITE.name} Logo`}
    >
      {SITE.name.split(" ")[0]}<span className="text-text-secondary">.</span>
    </a>
  );
}
