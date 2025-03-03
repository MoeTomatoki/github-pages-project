import clsx from "clsx"

type ButtonProps = {
    children: string,
    className?: string,
    onClick: () => void,
    disabled?: boolean
}

export default function ButtonUI({ children, className, onClick, disabled }: ButtonProps) {
    return (
        <button
            type="button"
            className={clsx(`
                text-neutral-900 bg-white border border-neutral-300 
                focus:outline-none hover:bg-neutral-100 focus:ring-1 focus:ring-neutral-100 
                font-medium rounded-lg text-sm px-5 py-1 me-5
                dark:bg-neutral-800 dark:text-white dark:border-neutral-600 dark:hover:bg-neutral-700 
                dark:hover:border-neutral-600 dark:focus:ring-neutral-700
            `, className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}