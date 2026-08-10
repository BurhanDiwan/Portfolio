import { cn } from "@/utils/cn";

/**
 * Subtle content separator.
 * @param {Object} props
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal']
 */
export default function Divider({ className, orientation = "horizontal", ...props }) {
  return (
    <div
      role="separator"
      className={cn(
        "bg-border-default",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
}
