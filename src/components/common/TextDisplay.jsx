import React from "react";
import { Box } from "@mui/material";

export default function TextDisplay({ text, userInput }) {
    const chars = text.split("");
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                fontFamily: "monospace",
                fontSize: "1.1rem",
                mb: 2,
            }}
        >
            {chars.map((char, i) => {
                // Determine color: green for correct, red for incorrect, default for untyped
                let color = "inherit";
                if (i < userInput.length) {
                    color = char === userInput[i] ? "green" : "red";
                }
                return (
                    <span key={i} style={{ color }}>
                        {char}
                    </span>
                );
            })}
        </Box>
    );
}
