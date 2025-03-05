import { NavLink } from "react-router-dom";
import { LogoIcon, MoonIcon, SunIcon } from "../../shared/icons/";
import { ButtonUI } from "../../shared/ui/";
import { useState } from "react";
import { themeCheck, themeSwitch } from "./theme";


export default function Header() {
    const [theme, setTheme] = useState<string>(themeCheck);

    return (
        <header className="flex items-center px-10 text-neutral-50 dark:text-black">
            <NavLink
                to={"/"}
                className="text-center text-neutral-50 hover:cursor-pointer"
            >
                <LogoIcon className="w-48 h-20" />
            </NavLink>
            <div className="flex gap-4 ml-auto text-xl">
                <ButtonUI onClick={() => themeSwitch({setTheme})}>
                    {theme === "light" ? <SunIcon className="h-6 w-6"/> : <MoonIcon className="h-6 w-6"/>}
                </ButtonUI>
                <span className="underline font-bold hover:cursor-pointer">RU</span>
                <span className="opacity-80 hover:cursor-not-allowed">ENG</span>
            </div>
        </header>
    );
}
