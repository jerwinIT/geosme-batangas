"use client";

import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

// Placeholder session provider that can be easily replaced with NextAuth's SessionProvider
// once the next-auth package is properly installed
export function SessionProvider({ children }: SessionProviderProps) {
  return <>{children}</>;
}
