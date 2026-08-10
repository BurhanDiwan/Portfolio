import { cn } from "@/utils/cn";
import { useLenis } from "lenis/react";

export default function NavItem({ item, isActive, isMobile, onClick }) {
  const lenis = useLenis();

  const handleClick = (e) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(item.href, { offset: 0, duration: 1.5 });
    }
    if (onClick) onClick(); // Close mobile menu if applicable
  };

  return (
    <a
      href={item.href}
      onClick={handleClick}
      className={cn(
        "relative text-sm font-medium transition-colors hover:text-text-primary",
        isMobile ? "text-2xl" : "text-sm",
        isActive ? "text-text-primary" : "text-text-secondary"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
      {/* Active Indicator Dot (Desktop Only) */}
      {!isMobile && (
        <span
          className={cn(
            "absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-all duration-300",
            isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        />
      )}
    </a>
  );
}
