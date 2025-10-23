import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Leaderboard({ leaderboard }) {
    return (
        <Box sx={{ mt: 3 }}>
            <Accordion
                disableGutters
                sx={{
                    backgroundColor: "transparent",
                    color: "text.primary",
                    border: 1,
                    borderColor: "divider",
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "text.secondary" }} />}>
                    <Typography variant="h6" fontWeight={600}>
                        Top Scores
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense>
                        {leaderboard.length === 0 ? (
                            <ListItem>
                                <ListItemText primary="No records yet" />
                            </ListItem>
                        ) : (
                                leaderboard.map((item, i) => (
                                <ListItem key={`${item.name}-${i}`} sx={{ py: 0.5 }}>
                                    <ListItemText
                                        primary={`${i + 1}. ${item.name}`}
                                        secondary={`${item.wpm} WPM`}
                                    />
                                </ListItem>
                            ))
                        )}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
