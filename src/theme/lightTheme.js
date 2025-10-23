import { createTheme } from "@mui/material";

// Create and export a light MUI theme
export const lightTheme = createTheme({
  palette: {
    mode: "light", // use light color scheme
    primary: { main: "#1976d2" }, // primary brand color
    background: { default: "#f5f5f5", paper: "#ffffff" }, // default colors
  },
});
