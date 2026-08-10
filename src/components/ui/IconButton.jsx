import { cn } from "@/utils/cn";

/**
 * Dedicated icon button for perfect aspect ratio.
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'outline'} [props.variant='ghost']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 */
export default function IconButton({
  children,
  className,
  variant = "ghost",
  size = "md",
  disabled,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed rounded-full active:scale-[0.95]";

  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary: "bg-surface-raised text-white hover:bg-surface-hover border border-border-default",
    ghost: "bg-transparent text-text-secondary hover:text-white hover:bg-white/10",
    outline: "bg-transparent text-white border border-border-default hover:border-white",
  };

  const sizes = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
