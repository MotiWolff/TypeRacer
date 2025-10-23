import {
    Container,
    Paper,
    Box,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { texts } from "../data/texts";
import { useTypeRacer } from "../hooks/useTypeRacer";
import TextDisplay from "../components/common/TextDisplay.jsx";
import TypingInput from "../components/game/TypingInput.jsx";
import Timer from "../components/common/Timer.jsx";
import Leaderboard from "../components/common/Leaderboard.jsx";
import MistakeAlert from "../components/game/MistakeAlert.jsx";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";

export default function GamePage() {
    // Select random text for typing challenge
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    const { state, dispatch } = useTypeRacer(randomText);

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
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />

            <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 0,
                        backgroundColor: 'transparent',
                    }}
                >
                    <Timer elapsedTime={elapsedTime} />

                    <TextDisplay text={text} userInput={userInput} />

                    <TypingInput
                        value={userInput}
                        onChange={handleChange}
                        disabled={isFinished}
                    />

                    {/* Display error alert when user makes a typo */}
                    <MistakeAlert show={mistake} />

                    {/* Show restart button on mistake or finish */}
                    {(mistake || isFinished) && (
                        <Box textAlign="center" mt={2}>
                            <Button
                                onClick={() => dispatch({ type: "RESET" })}
                                variant="contained"
                                size="large"
                                startIcon={<Refresh />}
                                sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                            >
                                {isFinished ? "Play Again" : "Restart"}
                            </Button>
                        </Box>
                    )}

                    <Leaderboard leaderboard={leaderboard} />
                </Paper>
            </Container>

            <Footer />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => dispatch({ type: "SNACK_CLOSE" })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
