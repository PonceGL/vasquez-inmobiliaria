import { useState, useEffect } from "react";

const changeColorTheme = () => {
  const [colorTheme, setColorTheme] = useState("dark");

  const darkTheme = () => {
    document.documentElement.setAttribute("data-theme", "dark");
    setColorTheme("dark");
    localStorage.setItem("theme", "dark");
  };

  const lightTheme = () => {
    document.documentElement.setAttribute("data-theme", "light");
    setColorTheme("light");
    localStorage.setItem("theme", "light");
  };

  const detectColorScheme = () => {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      darkTheme();
    } else if (
      document.documentElement.getAttribute("data-theme") === "light"
    ) {
      lightTheme();
    } else {
      darkTheme();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      darkTheme();
    } else if (localStorage.getItem("theme") === "light") {
      lightTheme();
    } else if (localStorage.getItem("theme") === null) {
      detectColorScheme();
    }
  }, [colorTheme]);

  return {
    colorTheme,
    darkTheme,
    lightTheme,
  };
};

export default changeColorTheme;
