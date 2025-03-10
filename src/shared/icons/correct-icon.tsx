import { IconProps } from "../types/icon-props";

export default function CorrectIcon({
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
      <mask id="ipSCheckCorrect0">
        <g fill="none">
          <g
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            clipPath="url(#ipSCheckCorrect1)"
          >
            <path d="M42 20v19a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h21" />
            <path d="m16 20l10 8L41 7" />
          </g>
          <defs>
            <clipPath id="ipSCheckCorrect1">
              <path fill="#000" d="M0 0h48v48H0z" />
            </clipPath>
          </defs>
        </g>
      </mask>
      <path
        fill={currentColor}
        d="M0 0h48v48H0z"
        mask="url(#ipSCheckCorrect0)"
      />
    </svg>
  );
}
