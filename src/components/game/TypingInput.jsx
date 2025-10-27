import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

// Invisible input that captures typing, so users don't see a text area
export default function TypingInput({ value, onChange, disabled, onEnterPress }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!disabled) {
            ref.current?.focus();
        }
    }, [disabled]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && onEnterPress) {
            e.preventDefault();
            onEnterPress();
        }
    };

    return (
        <Box
            onClick={() => ref.current?.focus()}
            sx={{ position: "relative", height: 0, overflow: "hidden" }}
        >
            <input
                ref={ref}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                aria-label="hidden typing input"
                style={{
                    position: "absolute",
                    opacity: 0,
                    pointerEvents: "none",
                    width: 1,
                    height: 1,
                    left: -9999,
                    top: 0,
                }}
            />
        </Box>
    );
}
