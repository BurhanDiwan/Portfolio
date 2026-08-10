import { cn } from "@/utils/cn";

/**
 * Flexbox stack abstraction.
 * @param {Object} props
 * @param {'row' | 'col'} [props.direction='col']
 * @param {'start' | 'center' | 'end' | 'between'} [props.align='start']
 * @param {'start' | 'center' | 'end' | 'between'} [props.justify='start']
 * @param {'none' | 'sm' | 'md' | 'lg'} [props.gap='md']
 * @param {boolean} [props.wrap=false]
 */
export default function Stack({
  children,
  className,
  direction = "col",
  align = "start",
  justify = "start",
  gap = "md",
  wrap = false,
  ...props
}) {
  const directions = {
    row: "flex-row",
    col: "flex-col",
  };

  const aligns = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifies = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  };

  const gaps = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-8",
  };

  return (
    <div
      className={cn(
        "flex",
        directions[direction],
        aligns[align],
        justifies[justify],
        gaps[gap],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
