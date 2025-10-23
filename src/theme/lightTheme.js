import { createTheme } from "@mui/material";

// Create and export a light MUI theme
export const lightTheme = createTheme({
  palette: {
    mode: "light", // use light color scheme
    primary: { main: "#1976d2" }, // primary brand color
    background: { default: "#f5f5f5", paper: "#ffffff" }, // default colors
  },
  typography: {
    fontFamily: "'EB Garamond', Georgia, 'Times New Roman', serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'EB Garamond', Georgia, 'Times New Roman', serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },
  },
});
