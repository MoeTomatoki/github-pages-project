import clsx from "clsx";

export default function MapIcon({
  className = "",
  currentColor = "currentColor",
}: {
  className?: string;
  currentColor?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={clsx(
        className === undefined ? "" : className,
        "text-neutral-800 dark:text-neutral-100",
      )}
    >
      <g
        fill="none"
        stroke={currentColor}
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          d="m8.368 4.79l-2.736-.913A2 2 0 0 0 3 5.775v11.783a2 2 0 0 0 1.368 1.898l4 1.333a2 2 0 0 0 1.264 0l4.736-1.578a2 2 0 0 1 1.265 0l2.735.912A2 2 0 0 0 21 18.225V6.442a2 2 0 0 0-1.367-1.898l-4-1.333a2 2 0 0 0-1.265 0L9.631 4.789a2 2 0 0 1-1.264 0"
        />
        <path d="M9 5v16m6-18v16" />
      </g>
    </svg>
  );
}
