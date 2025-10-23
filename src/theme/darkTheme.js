import { createTheme } from "@mui/material/styles";

// High-contrast dark theme with pure black background and light text
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ffffff" },
    secondary: { main: "#bfbfbf" },
    text: { primary: "#e6e6e6", secondary: "#b3b3b3" },
    background: { default: "#000000", paper: "#000000" },
    divider: "#222",
  },
  typography: {
    fontFamily: "'EB Garamond', Georgia, 'Times New Roman', serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#000000",
          color: "#e6e6e6",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },
  },
});
