import { Box, Typography, Chip } from "@mui/material";
import { Timer as TimerIcon, Speed } from "@mui/icons-material";

export default function Timer({ elapsedTime }) {
    const seconds = ((elapsedTime || 0) / 1000).toFixed(1);
    // Rough WPM estimate during typing (assumes average word length of 5 chars)
    const wpm = elapsedTime > 0 ? Math.round((60000 / elapsedTime) * 5) : 0;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                my: 3,
                gap: 2,
                flexWrap: "wrap",
            }}
        >
            <Chip
                icon={<TimerIcon />}
                label={
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                        <Typography variant="h6" component="span" fontWeight={700}>
                            {seconds}
                        </Typography>
                        <Typography variant="caption" component="span">
                            seconds
                        </Typography>
                    </Box>
                }
                color="primary"
                variant="outlined"
                sx={{ px: 2, py: 2.5, fontSize: 16 }}
            />
            <Chip
                icon={<Speed />}
                label={
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                        <Typography variant="h6" component="span" fontWeight={700}>
                            {wpm}
                        </Typography>
                        <Typography variant="caption" component="span">
                            WPM
                        </Typography>
                    </Box>
                }
                color="success"
                variant="outlined"
                sx={{ px: 2, py: 2.5, fontSize: 16 }}
            />
        </Box>
    );
}
