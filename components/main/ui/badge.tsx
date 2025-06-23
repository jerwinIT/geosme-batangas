import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default";
  icon?: ReactNode;
}

export default function Badge({
  children,
  className = "",
  variant = "default",
  icon,
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variants = {
    default:
      "inline-flex px-4 py-1.5 bg-primary-500/20 text-primary-500 rounded-full text-sm font-medium mb-4",
  };
  return (
    <span
      className={`${base} ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
