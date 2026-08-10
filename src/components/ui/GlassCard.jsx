import { cn } from "@/utils/cn";

/**
 * Premium frosted glass container.
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.padding='md']
 * @param {boolean} [props.interactive=false]
 */
export default function GlassCard({
  children,
  className,
  padding = "md",
  interactive = false,
  ...props
}) {
  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6 sm:p-8",
    lg: "p-8 sm:p-12",
  };

  return (
    <div
      className={cn(
        "glass-panel rounded-2xl sm:rounded-3xl",
        paddings[padding],
        interactive && "transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10 hover:border-border-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
