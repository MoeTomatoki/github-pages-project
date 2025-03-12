import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ThemeButton } from "./ui/theme-button";
import { LanguageButton } from "./ui/language-button";
import { ToogleButton } from "./ui/toggle-button";
import { Layout } from "./ui/layout";

const userLanguage = localStorage.getItem("language");

export default function Header() {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>(
    userLanguage ?? i18n.language,
  );

  return (
    <Layout
      isMenuOpen={isMenuOpen}
      themeButton={<ThemeButton />}
      languageButton={
        <LanguageButton language={language} setLanguage={setLanguage} />
      }
      toggleButton={
        <ToogleButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      }
      languageList={
        <>
          <LanguageButton
            language={language}
            setLanguage={setLanguage}
            isMobile
          >
            RUS
          </LanguageButton>
          <LanguageButton
            language={language}
            setLanguage={setLanguage}
            isMobile
          >
            ENG
          </LanguageButton>
          <LanguageButton
            language={language}
            setLanguage={setLanguage}
            isMobile
          >
            KOR
          </LanguageButton>
        </>
      }
    />
  );
}
