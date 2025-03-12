import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Logo } from "../ui/logo";

type Props = {
  themeButton: ReactNode;
  languageButton: ReactNode;
  languageList: ReactNode;
  toggleButton: ReactNode;
  isMenuOpen: boolean;
};

export function Layout({
  themeButton,
  languageButton,
  languageList,
  isMenuOpen,
  toggleButton,
}: Props) {
  return (
    <header className="flex items-center px-10 text-neutral-800 dark:text-neutral-100">
      <Logo />
      <div className="hidden md:flex gap-4 ml-auto text-xl">
        {themeButton}
        {languageButton}
      </div>

      {toggleButton}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex md:hidden gap-4 absolute top-16 right-4 p-4 rounded-lg shadow-lg bg-neutral-100 dark:bg-neutral-800"
          >
            <div className="flex flex-col items-center gap-4 text-xl">
              {themeButton}
              {languageList}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
