import { IconProps } from "../types/icon-props";

export default function ChevronDownIcon({
    className = "",
    currentColor = "currentColor",
}: IconProps) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M16.939 7.939L12 12.879l-4.939-4.94l-2.122 2.122L12 17.121l7.061-7.06z" fill={currentColor} />
        </svg>
    )
}