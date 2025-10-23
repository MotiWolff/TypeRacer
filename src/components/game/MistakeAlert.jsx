import { Alert } from "@mui/material"

export default function MistakeAlert({ show }) {
    return (
        show && (
            <Alert severity="error" sx={{ mt: 1 }}>
                ⚠️ Typo detected! Please correct it before continuing.
            </Alert>
        )
    )
}
