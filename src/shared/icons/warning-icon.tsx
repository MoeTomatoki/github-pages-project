import { IconProps } from "../types/icon-props";

export default function WarningIcon({
  className = "",
  currentColor = "currentColor",
}: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <g fill="none" stroke={currentColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4L2 44h44L24 4z" />
        <path d="M24 18v10" />
        <circle cx="24" cy="34" r="2" fill={currentColor} />
      </g>
    </svg>
  );
}
