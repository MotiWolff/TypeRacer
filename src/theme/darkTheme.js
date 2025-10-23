import { createTheme } from "@mui/material/styles";

// Create and export a light MUI theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark", // use light color scheme
    primary: { main: "#90caf9" }, // Primary color brand
    background: { default: "#121212", paper: "#1e1e1e" }, // Default colors
  },
});
