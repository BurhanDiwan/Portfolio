import { cn } from "@/utils/cn";

const colMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const smMap = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  12: "sm:grid-cols-12",
};

const mdMap = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const lgMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
};

/**
 * CSS Grid abstraction with full static Tailwind class scanning support.
 */
export default function Grid({ children, className, cols = 1, sm, md, lg, gap = "md", ...props }) {
  const gaps = {
    none: "gap-0",
    sm: "gap-4",
    md: "gap-8",
    lg: "gap-12 lg:gap-16",
    xl: "gap-16 lg:gap-24",
  };

  const gridClasses = cn(
    "grid",
    colMap[cols] || "grid-cols-1",
    sm && smMap[sm],
    md && mdMap[md],
    lg && lgMap[lg],
    gaps[gap],
    className
  );

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
}
