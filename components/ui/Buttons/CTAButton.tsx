import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

const CTAButton = ({
  href,
  icon: Icon,
  children,
  variant = "primary",
  className,
}: CTAButtonProps) => {
  const baseStyles =
    "group inline-flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold transition-all duration-300 min-w-[200px] justify-center hover:scale-105";

  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-[#fff]",
    secondary: "bg-black text-white hover:bg-black/90",
    tertiary: "bg-primary-500/80 hover:bg-primary-600",
  };

  return (
    <Link href={href} className={cn(baseStyles, variants[variant], className)}>
      <span>{children}</span>
      {Icon && <Icon className="w-5 h-5" />}
    </Link>
  );
};

export default CTAButton;
