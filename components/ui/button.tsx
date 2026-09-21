import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "white";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variantClass = `ui-btn-${variant}`;
  const sizeClass = `ui-btn-${size}`;

  return (
    <button
      className={`ui-btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="ui-spinner" /> : null}
      {children}
    </button>
  );
}
