const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(preferes-color-scheme: dark)").matches;

export const useCheckTheme = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    return "dark";
  }
  return "light";
};
