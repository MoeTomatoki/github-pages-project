import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Logo } from "../ui/logo";

type Props = {
  logButton: ReactNode;
  themeButton: ReactNode;
  languageButton: ReactNode;
  profileComponent: ReactNode;
  languageList: ReactNode;
  toggleButton: ReactNode;
  isMenuOpen: boolean;
  isLogin: boolean;
};

export function Layout({
  logButton,
  themeButton,
  languageButton,
  profileComponent,
  languageList,
  isMenuOpen,
  toggleButton,
  isLogin,
}: Props) {
  return (
    <header className="flex items-center px-10 text-neutral-800 dark:text-neutral-100">
      <Logo />
      <div className="hidden md:flex gap-4 ml-auto text-xl">
        {themeButton}
        {languageButton}
        {isLogin ? profileComponent : logButton}
      </div>

      <div className="flex ml-auto md:hidden gap-12">
        {isLogin ? profileComponent : ""}
        {toggleButton}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex md:hidden gap-4 absolute top-16 right-4 p-2 rounded-lg shadow-lg bg-neutral-100 dark:bg-neutral-800 z-100"
          >
            <div className="items-center text-xl">
              <div className="px-2 py-2">{themeButton}</div>
              <div className="border-t border-neutral-200 dark:border-neutral-700 my-1"></div>
              <div className="flex flex-col gap-2 py-2">{languageList}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
