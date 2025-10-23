import { ThemeProvider, CssBaseline } from "@mui/material";
import { ThemeContextProvider, useThemeContext } from "./context/ThemeContext.jsx";
import GamePage from "./pages/GamePage.jsx";

function ThemedApp() {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GamePage />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeContextProvider>
      <ThemedApp />
    </ThemeContextProvider>
  )
}
