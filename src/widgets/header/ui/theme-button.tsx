import { MoonIcon, SunIcon } from "@shared/icons/";
import { ButtonUI } from "@shared/ui/";
import { useSwitchTheme } from "../hooks/use-switch-theme";

export function ThemeButton() {
  const { theme, useThemeHandle } = useSwitchTheme();
  return (
    <ButtonUI onClick={useThemeHandle} className="hover:cursor-pointer">
      {theme === "light" ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </ButtonUI>
  );
}
