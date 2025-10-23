import { Box, Typography } from "@mui/material";

export default function TextDisplay({ text, userInput }) {
    return (
        <Box
            sx={{
                p: 3,
                mb: 2,
                backgroundColor: "action.hover",
                borderRadius: 2,
                border: 2,
                borderColor: "divider",
                minHeight: 120,
                display: "flex",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h5"
                component="div"
                sx={{
                    fontFamily: "monospace",
                    letterSpacing: 1,
                    lineHeight: 1.8,
                    wordBreak: "break-word",
                }}
            >
                {text.split("").map((char, index) => {
                    let color = "text.secondary"; // not yet typed
                    let backgroundColor = "transparent";
                    let fontWeight = 400;

                    if (index < userInput.length) {
                        // Already typed - check if correct
                        if (userInput[index] === char) {
                            color = "success.main";
                            fontWeight = 600;
                        } else {
                            color = "error.main";
                            backgroundColor = "error.light";
                            fontWeight = 600;
                        }
                    } else if (index === userInput.length) {
                        // Current character to type - highlight with cursor
                        backgroundColor = "primary.main";
                        color = "primary.contrastText";
                        fontWeight = 700;
                    }

                    return (
                        <Box
                            component="span"
                            key={index}
                            sx={{
                                color,
                                backgroundColor,
                                fontWeight,
                                px: 0.3,
                                borderRadius: 0.5,
                                transition: "all 0.15s ease",
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </Box>
                    );
                })}
            </Typography>
        </Box>
    );
}
