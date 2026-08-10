import { cn } from "@/utils/cn";

/**
 * Container component for bounding max-width content.
 * @param {Object} props
 * @param {'default' | 'wide' | 'full'} [props.variant='default']
 */
export default function Container({ children, className, variant = "default", ...props }) {
  const variants = {
    default: "max-w-7xl mx-auto px-6 sm:px-8 lg:px-12",
    wide: "max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16",
    full: "w-full px-4 sm:px-6",
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
