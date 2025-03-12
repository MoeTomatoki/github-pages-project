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
        `
                rounded-lg text-sm px-5 py-1 focus:outline-none focus:ring-2 
                text-neutral-800 bg-neutral-100 border border-neutral-300 
                hover:bg-neutral-200 focus:ring-neutral-200 

                dark:bg-neutral-800 dark:text-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-700 
                dark:hover:border-neutral-600 dark:focus:ring-neutral-700
            `,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
