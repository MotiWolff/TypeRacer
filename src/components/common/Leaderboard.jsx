import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box,
} from "@mui/material";

export default function Leaderboard({ leaderboard }) {
    return (
        <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="h6" gutterBottom>
                🏆 Top Scores
            </Typography>
            <List dense>
                {leaderboard.length === 0 ? (
                    <ListItem>
                        <ListItemText primary="No records yet" />
                    </ListItem>
                ) : (
                    // Display top scores sorted by wpm (descending), already sorted by leaderboard utility
                    leaderboard.map((item, i) => (
                        <ListItem key={i} sx={{ py: 0.5 }}>
                            <ListItemText
                                primary={`${i + 1}. ${item.name}`}
                                secondary={`${item.wpm} WPM`}
                            />
                        </ListItem>
                    ))
                )}
            </List>
        </Box>
    );
}
