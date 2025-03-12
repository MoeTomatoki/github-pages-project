import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = ["eng", "kor", "rus"];

export const useLanguage = (setLanguage: Dispatch<SetStateAction<string>>) => {
  const { i18n } = useTranslation();

  const changeLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const toggleLanguage = (currentLanguage: string) => {
    const currentIndex = LANGUAGES.findIndex(
      (lang) => lang === currentLanguage,
    );
    const nextIndex =
      LANGUAGES.length - 1 === currentIndex ? 0 : currentIndex + 1;
    changeLanguage(LANGUAGES[nextIndex]);
  };

  return { changeLanguage, toggleLanguage };
};
