import { cn } from "@/utils/cn";

/**
 * Elegant spinner loader.
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {'light' | 'dark'} [props.color='light']
 */
export default function Loader({ className, size = "md", color = "light", ...props }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  };

  const colors = {
    light: "border-white/20 border-t-white",
    dark: "border-black/20 border-t-black",
  };

  return (
    <div
      className={cn(
        "animate-spin-slow rounded-full",
        sizes[size],
        colors[color],
        className
      )}
      {...props}
    />
  );
}
