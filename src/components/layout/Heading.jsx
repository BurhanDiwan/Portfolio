import { cn } from "@/utils/cn";

/**
 * Polymorphic Heading component using Space Grotesk.
 * @param {Object} props
 * @param {'display' | 'hero' | 'h1' | 'h2' | 'h3' | 'h4'} [props.variant='h2']
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'} [props.as]
 */
export default function Heading({ children, className, variant = "h2", as, ...props }) {
  const Component = as || (["display", "hero"].includes(variant) ? "h1" : variant);

  const variants = {
    display: "text-6xl sm:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-none py-1",
    hero: "text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] py-2",
    h1: "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
    h2: "text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight",
    h3: "text-2xl sm:text-3xl font-medium tracking-tight",
    h4: "text-xl sm:text-2xl font-medium",
  };

  return (
    <Component className={cn("font-display text-text-primary", variants[variant], className)} {...props}>
      {children}
    </Component>
  );
}
