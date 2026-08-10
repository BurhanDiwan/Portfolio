import { cn } from "@/utils/cn";

/**
 * Semantic section block for vertical spacing.
 * @param {Object} props
 * @param {'normal' | 'centered' | 'fullHeight'} [props.variant='normal']
 */
export default function Section({ children, className, variant = "normal", id, ...props }) {
  const variants = {
    normal: "py-24 sm:py-32 lg:py-40 relative",
    centered: "py-24 sm:py-32 lg:py-40 flex flex-col items-center justify-center relative",
    fullHeight: "min-h-screen flex flex-col items-center justify-center relative",
  };

  return (
    <section id={id} className={cn(variants[variant], className)} {...props}>
      {children}
    </section>
  );
}
