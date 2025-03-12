import { ReactNode } from "react";

export function IconWrapper({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center justify-center md:justify-start gap-1 min-w-32 text-sm md:text-base hover:opacity-100 transition-opacity">
      {children}
    </span>
  );
}
