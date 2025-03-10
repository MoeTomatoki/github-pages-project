import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  onClick: (e: any) => void;
  disabled?: boolean;
};

export default function ButtonUI({
  children,
  className,
  onClick,
  type,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
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
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
