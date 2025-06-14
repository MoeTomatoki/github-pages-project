import { IconProps } from "../types/icon-props";

export default function LoginIcon({
  className = "",
  currentColor = "currentColor",
}: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill={currentColor}
        d="M18.5 2h-13a.5.5 0 0 0-.5.5V11h6V8l5 4l-5 4v-3H5v8.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5"
      />
    </svg>
  );
}
