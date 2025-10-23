import React, { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../theme/lightTheme";
import { darkTheme } from "../theme/darkTheme";

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
    // Default to dark to match the requested black background look
    const [mode, setMode] = useState("dark");
    const theme = useMemo(
        () => (mode === "light" ? lightTheme : darkTheme),
        [mode]
    );
    const toggleTheme = () =>
        setMode((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => useContext(ThemeContext);
