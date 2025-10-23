import {
    Container,
    Paper,
    Typography,
    Box,
    Button,
    Snackbar,
    Alert,
    Divider,
    IconButton,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { texts } from "../data/texts";
import { useTypeRacer } from "../hooks/useTypeRacer";
import TextDisplay from "../components/common/TextDisplay.jsx";
import TypingInput from "../components/game/TypingInput.jsx";
import Timer from "../components/common/Timer.jsx";
import Leaderboard from "../components/common/Leaderboard.jsx";
import MistakeAlert from "../components/game/MistakeAlert.jsx";
import { useThemeContext } from "../context/ThemeContext.jsx";

export default function GamePage() {
    // Select random text for typing challenge
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    const { state, dispatch } = useTypeRacer(randomText);
    const { toggleTheme, mode } = useThemeContext();

    const {
        text,
        userInput,
        elapsedTime,
        isRunning,
        isFinished,
        mistake,
        leaderboard,
        snackbar,
    } = state;

    const handleChange = (value) => {
        // Start timer on first keystroke
        if (!isRunning && !isFinished && value.length > 0)
            dispatch({ type: "START" });

        // Validate input matches expected text
        if (!text.startsWith(value)) {
            dispatch({ type: "MISTAKE" });
            return;
        }
        dispatch({ type: "FIXED" });
        dispatch({ type: "UPDATE_INPUT", payload: value });

        // Calculate WPM and finish game
        if (value === text) {
            const timeMinutes = (elapsedTime || 1) / 60000;
            const words = text.split(" ").length;
            const wpm = (words / timeMinutes).toFixed(2);
            const name =
                prompt(`🎉 You finished! ${wpm} WPM — enter your name:`) || "Anonymous";
            dispatch({ type: "FINISH", payload: { name, wpm } });
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">Type Racer</Typography>
                    <IconButton onClick={toggleTheme} color="primary">
                        {mode === "light" ? <DarkMode /> : <LightMode />}
                    </IconButton>
                </Box>

                <Timer elapsedTime={elapsedTime} />
                <Divider sx={{ my: 2 }} />
                <TextDisplay text={text} userInput={userInput} />
                <TypingInput
                    value={userInput}
                    onChange={handleChange}
                    disable={isFinished}
                />

                {/* Display error alert when user makes a typo */}
                <MistakeAlert show={mistake} />

                {/* Show restart button on mistake */}
                {mistake && (
                    <Box textAlign="center" mt={2}>
                        <Button
                            onClick={() => dispatch({ type: "RESET" })}
                            variant="contained"
                        >
                            Restart
                        </Button>
                    </Box>
                )}

                <Leaderboard leaderboard={leaderboard} />
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => dispatch({ type: "SNACK_CLOSE" })}
            >
                <Alert severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
