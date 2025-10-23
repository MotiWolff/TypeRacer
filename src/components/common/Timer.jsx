import React from 'react'
import { Typography } from '@mui/material'

export default function Timer({ elapsedTime }) {
    // Convert milliseconds to seconds and format to one decimal place
    const seconds = (elapsedTime / 1000).toFixed(1)

    return (
        // Typography from MUI used for consistent styling
        <Typography variant='subtitle1' textAlign="center">
            ⏱️ Time: {seconds}s
        </Typography>
    )
}
