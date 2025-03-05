import clsx from "clsx";

export default function ScheduleIcon({ className = "", currentColor = "currentColor" }: { className?: string, currentColor?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" className={clsx(className === undefined ? "" : className, "dark:text-neutral-800")}>
            <g fill="none" stroke={currentColor} strokeLinecap="round" strokeWidth="4">
                <rect width="40" height="30" x="4" y="10" strokeLinejoin="round" rx="2" />
                <path d="M14 6v8m11 9H14m20 8H14M34 6v8" />
            </g>
        </svg>
    )
}
