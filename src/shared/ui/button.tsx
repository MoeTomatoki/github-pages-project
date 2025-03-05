import clsx from "clsx"
import { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode,
    className?: string,
    onClick: () => void,
    disabled?: boolean
}

export default function ButtonUI({ children, className, onClick, disabled }: ButtonProps) {
    return (
        <button
            type="button"
            className={clsx(`
                font-medium rounded-lg text-sm px-5 py-1 focus:outline-none focus:ring-2 
                dark:text-neutral-800 dark:bg-neutral-100 border dark:border-neutral-300 
                dark:hover:bg-neutral-200 dark:focus:ring-neutral-200 
                bg-neutral-800 text-neutral-50 border-neutral-600 hover:bg-neutral-700 
                hover:border-neutral-600 focus:ring-neutral-700
            `, className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
