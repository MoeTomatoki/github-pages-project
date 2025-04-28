import { NavLink } from "react-router-dom";
import { LogoIcon } from "@shared/icons";

export function Logo() {
  return (
    <NavLink
      to={"/"}
      className="text-center text-neutral-50 hover:cursor-pointer"
    >
      <LogoIcon className="w-48 h-20" />
    </NavLink>
  );
}
