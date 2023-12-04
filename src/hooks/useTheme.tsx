import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

type Theme = "light" | "dark" | "system";

const useTheme = (initialTheme: Theme): [Theme, (theme: Theme) => void] => {
  const [themeMode, setThemeMode] = useLocalStorage<Theme>(
    "theme-mode",
    initialTheme
  );

  const setTheme = (theme: Theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    let currentTheme: Theme = themeMode || (prefersDarkMode ? "dark" : "light");

    if (currentTheme === "system") {
      currentTheme = prefersDarkMode ? "dark" : "light";
    }

    setTheme(currentTheme);
    setThemeMode(currentTheme);
  }, [themeMode]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setThemeMode(newTheme);
  };

  return [themeMode, changeTheme];
};

export default useTheme;
