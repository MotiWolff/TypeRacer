import { CssBaseline } from "@mui/material";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import GamePage from "./pages/GamePage.jsx";

export default function App() {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <GamePage />
    </ThemeContextProvider>
  );
}
