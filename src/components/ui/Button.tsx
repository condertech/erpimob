import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const base =
  "inline-flex items-center gap-2 font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<string, string> = {
  primary: "text-white",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  danger: "text-white",
  outline: "border bg-transparent",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  style,
  children,
  ...props
}: ButtonProps) {
  const inlineStyles: React.CSSProperties =
    variant === "primary"
      ? { backgroundColor: "#111111", ...style }
      : variant === "danger"
        ? { backgroundColor: "#DC2626", ...style }
        : variant === "outline"
          ? { borderColor: "#111111", color: "#111111", ...style }
          : { ...style };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={inlineStyles}
      onMouseEnter={(e) => {
        if (variant === "primary")
          e.currentTarget.style.backgroundColor = "#222222";
        if (variant === "danger")
          e.currentTarget.style.backgroundColor = "#B91C1C";
        if (variant === "outline")
          e.currentTarget.style.backgroundColor = "#F5F5F5";
      }}
      onMouseLeave={(e) => {
        if (variant === "primary")
          e.currentTarget.style.backgroundColor = "#111111";
        if (variant === "danger")
          e.currentTarget.style.backgroundColor = "#DC2626";
        if (variant === "outline")
          e.currentTarget.style.backgroundColor = "transparent";
      }}
      {...props}
    >
      {children}
    </button>
  );
}
