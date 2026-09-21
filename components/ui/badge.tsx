import React from "react";

export type BadgeVariant = "default" | "purple" | "outline" | "success";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span className={`ui-badge ui-badge-${variant} ${className}`} {...props}>
      {children}
    </span>
  );
}
