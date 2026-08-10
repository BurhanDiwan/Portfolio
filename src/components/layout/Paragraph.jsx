import { cn } from "@/utils/cn";

/**
 * Standardized readable paragraph using Inter.
 * @param {Object} props
 * @param {'sm' | 'base' | 'lg' | 'xl'} [props.size='base']
 * @param {'primary' | 'secondary' | 'tertiary'} [props.color='secondary']
 */
export default function Paragraph({ children, className, size = "base", color = "secondary", ...props }) {
  const sizes = {
    sm: "text-sm leading-relaxed",
    base: "text-base leading-relaxed sm:leading-loose",
    lg: "text-lg leading-relaxed sm:text-xl",
    xl: "text-xl sm:text-2xl leading-relaxed font-light",
  };

  const colors = {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
    tertiary: "text-text-tertiary",
  };

  return (
    <p className={cn("font-sans text-pretty", sizes[size], colors[color], className)} {...props}>
      {children}
    </p>
  );
}
