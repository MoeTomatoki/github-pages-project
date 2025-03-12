import { useState } from "react";
import { useCheckTheme } from "./use-check-theme";

export const useSwitchTheme = () => {
  const [theme, setTheme] = useState<string>(useCheckTheme);

  const useThemeHandle = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return { theme, useThemeHandle };
};
