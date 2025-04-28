import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

import { ButtonUI } from "@shared/ui/";
import { useLanguage } from "../hooks/use-language";

type Props = {
  isMobile?: boolean;
  children?: React.ReactNode;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
};

export function LanguageButton({
  isMobile,
  children,
  language,
  setLanguage,
}: Props) {
  const { changeLanguage, toggleLanguage } = useLanguage(setLanguage);

  const handleClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      const buttonText = (e.target as HTMLButtonElement).textContent;
      if (!buttonText || buttonText.toLowerCase() === language) return;
      changeLanguage(buttonText.toLowerCase());
    } else {
      toggleLanguage(language);
    }
  };

  if (isMobile)
    return (
      <button
        onClick={(e) => handleClick(e)}
        className={clsx(
          language !== children?.toLocaleString().toLocaleLowerCase()
            ? "opacity-80"
            : "underline font-bold hover:cursor-pointer",
        )}
      >
        {children}
      </button>
    );

  return (
    <ButtonUI
      onClick={() => handleClick()}
      className="font-extrabold hover:cursor-pointer"
    >
      {language.toLocaleUpperCase()}
    </ButtonUI>
  );
}
