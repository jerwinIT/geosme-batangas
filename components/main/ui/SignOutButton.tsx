"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/common";

interface SignOutButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export function SignOutButton({
  className,
  variant = "outline",
}: SignOutButtonProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Button variant={variant} onClick={handleSignOut} className={className}>
      Sign Out
    </Button>
  );
}
