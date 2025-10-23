import { Box, Typography, Link, Divider } from "@mui/material";
import { GitHub, Favorite } from "@mui/icons-material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: 6,
                py: 3,
                textAlign: "center",
                borderTop: 1,
                borderColor: "divider",
            }}
        >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Made with <Favorite sx={{ fontSize: 14, color: "error.main", verticalAlign: "middle" }} /> by Moti Wolff
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                <Link href="https://github.com/MotiWolff" underline="hover" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <GitHub fontSize="small" /> GitHub
                </Link>
                <Divider orientation="vertical" flexItem />
                <Link href="#" underline="hover" color="text.secondary">
                    About
                </Link>
                <Divider orientation="vertical" flexItem />
                <Link href="#" underline="hover" color="text.secondary">
                    Privacy
                </Link>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                © {new Date().getFullYear()} TypeRacer. All rights reserved.
            </Typography>
        </Box>
    );
}
