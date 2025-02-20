import { NavLink } from "react-router-dom";
import { HeaderIcon } from "../../shared/ui";

export default function Header() {
    return (
        <header className="flex items-center px-10 text-neutral-50">
            <NavLink
                to={`/`}
                className="text-center text-neutral-50 hover:cursor-pointer"
            >
                <HeaderIcon className="w-48 h-20" />
            </NavLink>
            <div className="flex gap-4 ml-auto text-xl">
                <span className="underline font-bold hover:cursor-pointer">RU</span>
                <span className="text-neutral-200 hover:cursor-not-allowed">ENG</span>
            </div>
        </header>
    );
}
