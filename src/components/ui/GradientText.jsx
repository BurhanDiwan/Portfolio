import { cn } from "@/utils/cn";

/**
 * Gradient text clipping utility for premium headers.
 * @param {Object} props
 */
export default function GradientText({ children, className, as: Component = "span", ...props }) {
  return (
    <Component
      className={cn("text-gradient", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
