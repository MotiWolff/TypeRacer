import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { DarkMode, LightMode, Keyboard } from "@mui/icons-material";
import { useThemeContext } from "../../context/ThemeContext";

export default function Header() {
    const { toggleTheme, mode } = useThemeContext();

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4, backgroundColor: 'transparent', color: 'text.primary' }}>
            <Toolbar>
                <Keyboard sx={{ mr: 2, fontSize: 32 }} />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                    TypeRacer
                </Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography variant="body2" sx={{ mr: 1, display: { xs: "none", sm: "block" } }}>
                        {mode === "light" ? "Light" : "Dark"} Mode
                    </Typography>
                    <IconButton onClick={toggleTheme} color="inherit" size="large">
                        {mode === "light" ? <DarkMode /> : <LightMode />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
