import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LogButton } from "./ui/log-button";
import { ThemeButton } from "./ui/theme-button";
import { LanguageButton } from "./ui/language-button";
import { ToogleButton } from "./ui/toggle-button";
import { Layout } from "./ui/layout";
import Modal from "../modal";

const userLanguage = localStorage.getItem("language");

export default function Header() {
  const { i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState(userLanguage ?? i18n.language);

  const handleClick = useCallback(() => setIsModalOpen(true), []);
  const handleClose = useCallback(() => setIsModalOpen(false), []);

  const memoizedButtons = useMemo(() => ({
    themeButton: <ThemeButton />,
    languageButton: (
      <LanguageButton 
        key="lang-btn" 
        language={language} 
        setLanguage={setLanguage} 
      />
    ),
    toggleButton: (
      <ToogleButton 
        key="toggle-btn"
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
    ),
  }), [language, isMenuOpen]);

  return (
    <>
      <Layout
        isMenuOpen={isMenuOpen}
        logButton={<LogButton onClick={handleClick} />}
        themeButton={memoizedButtons.themeButton}
        languageButton={memoizedButtons.languageButton}
        toggleButton={memoizedButtons.toggleButton}
        languageList={
          <>
            {['RUS', 'ENG', 'KOR'].map(lang => (
              <LanguageButton
                key={lang}
                language={language}
                setLanguage={setLanguage}
                isMobile
              >
                {lang}
              </LanguageButton>
            ))}
          </>
        }
      />
      <Modal isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
}