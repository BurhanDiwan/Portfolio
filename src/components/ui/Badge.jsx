import { cn } from "@/utils/cn";

/**
 * Minimal status indicator (Badge/Tag/Pill).
 * @param {Object} props
 * @param {'default' | 'success' | 'warning' | 'danger' | 'info'} [props.variant='default']
 */
export default function Badge({ children, className, variant = "default", ...props }) {
  const variants = {
    default: "bg-surface-raised text-text-secondary border border-border-default",
    success: "bg-status-success/10 text-status-success border border-status-success/20",
    warning: "bg-status-warning/10 text-status-warning border border-status-warning/20",
    danger: "bg-status-danger/10 text-status-danger border border-status-danger/20",
    info: "bg-status-info/10 text-status-info border border-status-info/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
