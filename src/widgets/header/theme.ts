const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(preferes-color-scheme: dark)").matches;

const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
        document.documentElement.classList.add("dark")
        return "dark"
    }
    return "light"
}

const themeSwitch = ({setTheme}: {setTheme: React.Dispatch<React.SetStateAction<string>>}) => {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setTheme("light")
    } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark")
    }        
}

export { themeCheck, themeSwitch}