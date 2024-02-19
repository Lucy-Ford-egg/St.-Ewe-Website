import React, { useState } from "react"
import { Box, Paper, useTheme, Divider } from "@mui/material"
import {RenderPortableText} from '../components/renderPortableText'

export const StepsTile = props => {
  const { previewData, node, sanityConfig } = props
  const { _rawTitle, _rawText } = node
  const [hover, setHover] = useState(false)
  const theme = useTheme()

  const definedTitle = (previewData && previewData.title) || _rawTitle
  const definedText = (previewData && previewData.text) || _rawText

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
          {definedTitle && (
            <RenderPortableText
              previewData={previewData}
              sanityConfig={sanityConfig}
              variant={false}
              value={definedTitle}
            />
          )}

          <Divider
            component="div"
            role="presentation"
            sx={{ borderColor: theme.palette.primary.main, maxWidth: 305 }}
          />

          {definedText && (
            <RenderPortableText
              previewData={previewData}
              sanityConfig={sanityConfig}
              variant={false}
              value={definedText}
            />
          )}
        </Box>
      </Box>
    </Paper>
  )
}
