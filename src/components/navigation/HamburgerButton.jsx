import { cn } from "@/utils/cn";

export default function HamburgerButton({ isOpen, toggle }) {
  return (
    <button
      onClick={toggle}
      className="relative z-[50] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-border-default bg-surface hover:bg-surface-hover active:scale-95 transition-all"
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
      aria-expanded={isOpen}
    >
      <span
        className={cn(
          "block h-0.5 w-5 bg-text-primary transition-transform duration-300",
          isOpen && "translate-y-2 rotate-45"
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-5 bg-text-primary transition-opacity duration-300",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-5 bg-text-primary transition-transform duration-300",
          isOpen && "-translate-y-2 -rotate-45"
        )}
      />
    </button>
  );
}
