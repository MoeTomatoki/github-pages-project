import { Dispatch, SetStateAction } from "react";
import { BurgerIcon } from "@shared/icons";

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export function ToogleButton({ isMenuOpen, setIsMenuOpen }: Props) {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <button
      onClick={toggleMenu}
      className="flex ml-auto md:hidden focus:outline-none"
    >
      <BurgerIcon className="h-6 w-6 text-neutral-200 dark:text-neutral-200" />
    </button>
  );
}
