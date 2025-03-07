import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import { BurgerIcon, LogoIcon, MoonIcon, SunIcon } from "../../shared/icons/";
import { ButtonUI } from "../../shared/ui/";
import { useState } from "react";
import { themeCheck, themeSwitch } from "./theme";

export default function Header() {
    const { i18n } = useTranslation();
    const [theme, setTheme] = useState<string>(themeCheck);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="flex items-center px-10 text-neutral-50 dark:text-black">
            <NavLink
                to={"/"}
                className="text-center text-neutral-50 hover:cursor-pointer"
            >
                <LogoIcon className="w-48 h-20" />
            </NavLink>
            <div className="hidden md:flex gap-4 ml-auto text-xl">
                <ButtonUI onClick={() => themeSwitch({ setTheme })}>
                    {theme === "light" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                </ButtonUI>

                {/* <span className="underline font-bold hover:cursor-pointer">RU</span>
                <span className="opacity-80 hover:cursor-not-allowed">ENG</span> */}

                <ButtonUI
                    onClick={() => i18n.changeLanguage("en")}
                    className="underline font-bold hover:cursor-pointer"
                >
                    English
                </ButtonUI>
                <ButtonUI
                    onClick={() => i18n.changeLanguage("ru")}
                    className="opacity-80 hover:cursor-pointer"
                >
                    Русский
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
                        className="flex md:hidden gap-4 absolute top-16 right-4 p-4 rounded-lg shadow-lg bg-neutral-800 dark:bg-neutral-50"
                    >
                        <div className="flex flex-col items-center gap-4 text-xl">
                            <ButtonUI onClick={() => themeSwitch({ setTheme })}>
                                {theme === "light" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                            </ButtonUI>
                            <span className="underline font-bold hover:cursor-pointer">RU</span>
                            <span className="opacity-80 hover:cursor-not-allowed">ENG</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
