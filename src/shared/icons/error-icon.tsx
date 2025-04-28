import { IconProps } from "../types/icon-props";

export default function ErrorIcon({
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
        <circle cx="24" cy="24" r="20" />
        <path d="M16 16l16 16M32 16L16 32" />
      </g>
    </svg>
  );
}
