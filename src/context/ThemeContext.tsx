import React, { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type ThemeMode = "light" | "dark";

interface ThemeContexProps {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContexProps>({
    mode: "light",
    toggleTheme: () => { },
});

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>("light");

    const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    background: {
                        default: mode === "light" ? "#ECECEC" : "#252627",
                        secondary: mode === "light" ? "#FFFFFF" : "#161616",
                    },
                    text: {
                        primary: mode === "light" ? "#214966" : "#fff",
                    },
                },
            }),
        [mode]
    );
    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    )
}