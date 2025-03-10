import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import { BurgerIcon, LogoIcon, MoonIcon, SunIcon } from "../../shared/icons/";
import { ButtonUI } from "../../shared/ui/";
import { useState } from "react";
import { themeCheck, themeSwitch } from "./theme";
import clsx from "clsx";

const LANGUAGES = ["eng", "kor", "rus"];
const userLanguage = localStorage.getItem("language");

export default function Header() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState<string>(themeCheck);
  const [language, setLanguage] = useState<string>(
    userLanguage ?? i18n.language,
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hangleClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      const buttonText = (e.target as HTMLButtonElement).textContent;
      if (!buttonText || buttonText.toLocaleLowerCase() === language) return;
      const currentLang = buttonText.toLocaleLowerCase();
      i18n.changeLanguage(currentLang);
      setLanguage(currentLang);
      localStorage.setItem("language", currentLang);
      return;
    }
    const currentLang = LANGUAGES.findIndex((lang) => lang === language);
    const nextLang = LANGUAGES.length - 1 === currentLang ? 0 : currentLang + 1;
    i18n.changeLanguage(LANGUAGES[nextLang]);
    setLanguage(LANGUAGES[nextLang]);
    localStorage.setItem("language", LANGUAGES[nextLang]);
  };

  return (
    <header className="flex items-center px-10 text-neutral-800 dark:text-neutral-100">
      <NavLink
        to={"/"}
        className="text-center text-neutral-50 hover:cursor-pointer"
      >
        <LogoIcon className="w-48 h-20" />
      </NavLink>
      <div className="hidden md:flex gap-4 ml-auto text-xl">
        <ButtonUI
          onClick={() => themeSwitch({ setTheme })}
          className="hover:cursor-pointer"
        >
          {theme === "light" ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </ButtonUI>
        <ButtonUI
          onClick={() => hangleClick()}
          className="font-extrabold hover:cursor-pointer"
        >
          {language.toLocaleUpperCase()}
        </ButtonUI>
      </div>

      <button
        onClick={toggleMenu}
        className="flex ml-auto md:hidden focus:outline-none"
      >
        <BurgerIcon className="h-6 w-6 dark:text-neutral-800" />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex md:hidden gap-4 absolute top-16 right-4 p-4 rounded-lg shadow-lg bg-neutral-100 dark:bg-neutral-800"
          >
            <div className="flex flex-col items-center gap-4 text-xl">
              <ButtonUI onClick={() => themeSwitch({ setTheme })}>
                {theme === "light" ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </ButtonUI>
              <button
                onClick={(e) => hangleClick(e)}
                className={clsx(
                  language !== "rus"
                    ? "opacity-80"
                    : "underline font-bold hover:cursor-pointer",
                )}
              >
                RUS
              </button>
              <button
                onClick={(e) => hangleClick(e)}
                className={clsx(
                  language !== "eng"
                    ? "opacity-80"
                    : "underline font-bold hover:cursor-pointer",
                )}
              >
                ENG
              </button>
              <button
                onClick={(e) => hangleClick(e)}
                className={clsx(
                  language !== "kor"
                    ? "opacity-80"
                    : "underline font-bold hover:cursor-pointer",
                )}
              >
                KOR
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
