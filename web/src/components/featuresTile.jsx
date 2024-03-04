import React, { useState } from "react"
import { Box, Paper, Typography, useTheme, Divider } from "@mui/material"
import { ButtonFormat } from "./buttonFormat"

export const FeaturesTile = props => {
  const { previewData, node, index, } = props
  const [hover, setHover] = useState(false)
  const theme = useTheme()

  const definedTitle = (previewData && previewData?.featuresTile[index]?.title) || node?.title
  const definedText = (previewData && previewData?.featuresTile[index]?.text) || node?.text
  const definedLink = (previewData && previewData?.featuresTile[index]?.text) || node?.link

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
          {definedTitle && (<Typography color="text.primary" sx={{ my: { xs: 5 } }} variant="h3">
            {definedTitle}
          </Typography>)
}

          <Divider
            component="div"
            role="presentation"
            sx={{ borderColor: theme.palette.primary.main, maxWidth: 305 }}
          />

{definedText && (<Typography
            color="text.primary"
            sx={{ my: { xs: 5 } }}
            variant="body1"
          >
            {definedText}
          </Typography>)}
        </Box>

        {definedLink && (<Box
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
            node={definedLink}
            sx={{ pl: 0, textTransform: "uppercase" }}
          />
        </Box>
        )}
      </Box>
    </Paper>
  )
}
