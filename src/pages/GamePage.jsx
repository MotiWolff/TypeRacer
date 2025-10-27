import {
    Container,
    Paper,
    Box,
    Button,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import { Refresh, Pause, PlayArrow } from "@mui/icons-material";
import { useState } from "react";
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
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    const { state, dispatch } = useTypeRacer(randomText);
    const { text, userInput, elapsedTime, isRunning, isPaused, isFinished, mistake, leaderboard, snackbar } = state;

    const [showNameDialog, setShowNameDialog] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [finalWpm, setFinalWpm] = useState(0);

    const handleChange = (value) => {
        if (!isRunning && !isFinished && value.length > 0) {
            dispatch({ type: "START" });
        }

        if (!text.startsWith(value)) {
            dispatch({ type: "MISTAKE" });
            return;
        }

        dispatch({ type: "FIXED" });
        dispatch({ type: "UPDATE_INPUT", payload: value });

        if (value === text) {
            const timeMinutes = (elapsedTime || 1) / 60000;
            const words = text.split(" ").length;
            const wpm = (words / timeMinutes).toFixed(2);
            setFinalWpm(wpm);
            setShowNameDialog(true);
        }
    };

    const handleNameSubmit = () => {
        const name = playerName.trim() || "Anonymous";
        dispatch({ type: "FINISH", payload: { name, wpm: finalWpm } });
        setShowNameDialog(false);
        setPlayerName("");
    };

    const togglePause = () => {
        if (isRunning && !isFinished) {
            dispatch({ type: isPaused ? "RESUME" : "PAUSE" });
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
                        disabled={isFinished || isPaused}
                        onEnterPress={togglePause}
                    />

                    {isRunning && !isFinished && (
                        <Box textAlign="center" mt={2}>
                            <Button
                                onClick={togglePause}
                                variant="outlined"
                                size="medium"
                                startIcon={isPaused ? <PlayArrow /> : <Pause />}
                                sx={{ px: 3, py: 1, borderRadius: 2 }}
                            >
                                {isPaused ? "Resume" : "Pause"}
                            </Button>
                        </Box>
                    )}

                    <MistakeAlert show={mistake} />

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

            <Dialog
                open={showNameDialog}
                onClose={() => { }}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Congratulations!</DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 2, textAlign: "center", fontSize: "1.5rem", fontWeight: "bold", color: "success.main" }}>
                        {finalWpm} WPM
                    </Box>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Enter your name"
                        variant="outlined"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleNameSubmit();
                            }
                        }}
                        placeholder="Anonymous"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNameSubmit} variant="contained" color="primary">
                        Save Score
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
