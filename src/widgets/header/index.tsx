import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LogButton } from "./ui/log-button";
import { ThemeButton } from "./ui/theme-button";
import { LanguageButton } from "./ui/language-button";
import { ToogleButton } from "./ui/toggle-button";
import { Layout } from "./ui/layout";
import Modal from "../modal";
import { Profile } from "./ui/profile";
import { useAuth } from "@features/providers/auth-context/auth-context";

const userLanguage = localStorage.getItem("language");

export default function Header() {
  const { i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState(userLanguage ?? i18n.language);
  const { user } = useAuth();

  const handleClick = useCallback(() => setIsModalOpen(true), []);
  const handleClose = useCallback(() => setIsModalOpen(false), []);

  const memoizedButtons = useMemo(
    () => ({
      themeButton: <ThemeButton />,
      languageButton: (
        <LanguageButton
          key="lang-btn"
          language={language}
          setLanguage={setLanguage}
        />
      ),
      profile: <Profile/>,
      toggleButton: (
        <ToogleButton
          key="toggle-btn"
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      ),
    }),
    [language, isMenuOpen],
  );

  return (
    <>
      <Layout
        isMenuOpen={isMenuOpen}
        logButton={<LogButton onClick={handleClick} />}
        themeButton={memoizedButtons.themeButton}
        languageButton={memoizedButtons.languageButton}
        profileComponent={memoizedButtons.profile}
        toggleButton={memoizedButtons.toggleButton}
        languageList={
          <>
            {["RUS", "ENG", "KOR"].map((lang) => (
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
        isLogin={!!user}
      />
      <Modal isOpen={isModalOpen} onClose={handleClose} />
    </>
  );
}
