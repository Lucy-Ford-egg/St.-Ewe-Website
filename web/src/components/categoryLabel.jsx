import React from "react"
import { Typography } from "@mui/material"

export const CategoryLabel = props => {
  const { label } = props
  return (
    <Typography variant="overline" component='p' color='secondary.main' sx={{ display: 'inline-flex', my: 3, px: 1, py: 1, backgroundColor: "highlight.main" }}>
      {label}
    </Typography>
  )
}
