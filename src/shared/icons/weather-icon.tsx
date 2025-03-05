import clsx from "clsx";

export default function WeatherIcon({ className = "", currentColor = "currentColor" }: { className?: string, currentColor?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" className={clsx(className === undefined ? "" : className, "dark:text-neutral-800")}>
            <path fill="none" stroke={currentColor} strokeLinecap="round" strokeLinejoin="round" d="M24 7.873c-12.514 0-17.428 9.694-18.5 12.33c3.845-2.559 8.543-2.426 12.062 0c3.845-2.559 9.357-2.426 12.876 0c3.52-2.426 8.217-2.559 12.062 0c-1.072-2.636-5.986-12.33-18.5-12.33" />
            <path fill="none" stroke={currentColor} strokeLinecap="round" strokeLinejoin="round" d="M18.455 37.224a2.904 2.904 0 0 0 5.808 0V18.336" />
        </svg>
    )
}

