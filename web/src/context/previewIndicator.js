// PreviewIndicator.jsx

import React from "react"
import { Container } from "@mui/material";

import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';

export default function PreviewIndicator({ isLoading = false }) {
  return (
    <Container sx={{my:4}} maxWidth="sm" align="center">
        {isLoading ? <HourglassBottomIcon>Preview is loading</HourglassBottomIcon> : <HourglassFullIcon>Preview up-to-date</HourglassFullIcon>}
    </Container>
  )
}
