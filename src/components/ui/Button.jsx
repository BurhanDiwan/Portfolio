import { cn } from "@/utils/cn";
import Loader from "./Loader";

/**
 * Premium Button component with multiple variants and sizes.
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.isLoading]
 */
export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  ...props
}) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden rounded-full";

  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 active:scale-[0.98]",
    secondary: "bg-surface-raised text-white hover:bg-surface-hover border border-border-default hover:border-border-hover active:scale-[0.98]",
    ghost: "bg-transparent text-text-secondary hover:text-white hover:bg-white/5 active:scale-[0.98]",
    outline: "bg-transparent text-white border border-border-default hover:border-white active:scale-[0.98]",
    danger: "bg-status-danger/10 text-status-danger hover:bg-status-danger hover:text-white border border-status-danger/20 active:scale-[0.98]",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
        {children}
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader size="sm" color={variant === "primary" ? "dark" : "light"} />
        </div>
      )}
    </button>
  );
}
