import clsx from "clsx";

export default function TravelIcon({ className = "", currentColor = "currentColor" }: { className?: string, currentColor?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={clsx(className === undefined ? "" : className, "dark:text-neutral-800")}>
            <path fill={currentColor} d="M7.446 16.554L4.823 15.13l.589-.589l2.326.35l4.15-4.15l-7.357-3.98l.746-.766l9.05 2.296L17.27 5.34q.29-.29.688-.29t.687.29t.29.698t-.29.697l-2.92 2.957l2.278 9.031l-.746.765l-4-7.357l-4.112 4.111l.33 2.346l-.607.608z" />
        </svg>
    )
}