import clsx from "clsx";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonUI({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-full",
          "bg-neutral-200 dark:bg-neutral-800",
          "hover:bg-neutral-300 dark:hover:bg-neutral-700",
          "transition-colors duration-200",
          "outline-none focus:ring-1 focus:ring-neutral-500 focus:ring-opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
