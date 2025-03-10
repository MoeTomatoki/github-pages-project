import clsx from "clsx";
import { IconProps } from "../types/icon-props";

export default function CalendarIcon({
  className = "",
  currentColor = "currentColor",
}: IconProps) {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <rect width="20" height="18" x="2" y="4" rx="4" />
        <path d="M8 2v4m8-4v4M2 10h20" />
      </g>
    </svg>
  );
}
