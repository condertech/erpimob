interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "purple";
  children: React.ReactNode;
  className?: string;
}

const styles: Record<string, { bg: string; color: string }> = {
  success: { bg: "#DCFCE7", color: "#166534" },
  warning: { bg: "#FEF9C3", color: "#854D0E" },
  danger: { bg: "#FEE2E2", color: "#991B1B" },
  info: { bg: "#DBEAFE", color: "#1E40AF" },
  neutral: { bg: "#F3F4F6", color: "#374151" },
  purple: { bg: "#F3E8FF", color: "#6B21A8" },
};

export default function Badge({
  variant = "neutral",
  children,
  className = "",
}: BadgeProps) {
  const s = styles[variant];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {children}
    </span>
  );
}
