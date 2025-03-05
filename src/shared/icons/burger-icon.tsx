import clsx from "clsx";

export default function BurgerIcon({ className = "", currentColor = "currentColor" }: { className?: string, currentColor?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={clsx(className === undefined ? "" : className, "dark:text-neutral-800")}>
            <path fill={currentColor} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18M3 18h18" />
        </svg>
    )
}
