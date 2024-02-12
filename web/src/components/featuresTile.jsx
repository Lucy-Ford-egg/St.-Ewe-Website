import React, { useState } from "react"
import { Box, Paper, Typography, useTheme, Divider } from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { ButtonFormat } from "./buttonFormat"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

export const FeaturesTile = props => {
  const { title, text, previewData, node, sanityConfig, link } = props
  const [hover, setHover] = useState(false)
  const theme = useTheme()

  return (
    <Paper
      sx={{
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          pt: 1,
          pb: 6,
          display: "flex",
          flexDirection: "column",
          flexBasis: "100%",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", flexBasis: "100%" }}
        >
          <Typography color="text.primary" sx={{ my: { xs: 5 } }} variant="h3">
            {previewData && previewData.title ? previewData.title : title}
          </Typography>

          <Divider
            component="div"
            role="presentation"
            sx={{ borderColor: theme.palette.primary.main, maxWidth: 305 }}
          />

          <Typography
            color="text.primary"
            sx={{ my: { xs: 5 } }}
            variant="body1"
          >
            {previewData && previewData.text ? previewData.text : text}
          </Typography>
        </Box>

        <Box
          onMouseOver={e => setHover(!hover)}
          onMouseOut={e => setHover(false)}
          sx={{
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            mt: 6,
          }}
        >
          <ButtonFormat
            variant="contained"
            node={previewData && previewData.link ? previewData.link : link}
            sx={{ pl: 0, textTransform: "uppercase" }}
          />
        </Box>
      </Box>
    </Paper>
  )
}
