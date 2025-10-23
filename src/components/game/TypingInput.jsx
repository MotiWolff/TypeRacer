import { TextField } from "@mui/material";

export default function TypingInput({ value, onChange, disabled }) {
    return (
        <TextField
            fullWidth
            variant="outlined"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Start typing..."
            autoFocus
            disabled={disabled}
            sx={{
                "& .MuiOutlinedInput-root": {
                    fontFamily: "monospace",
                    fontSize: "1.1rem",
                },
            }}
        >
        </TextField>
    );
}
