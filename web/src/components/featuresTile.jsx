import React, { useState } from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import { useTheme } from "@mui/material"
import { ButtonFormat } from "./buttonFormat"
import { RenderPortableText } from "../components/renderPortableText"


export const FeaturesTile = props => {
  const { node } = props
  const [hover, setHover] = useState(false)
  const theme = useTheme()

  const definedTitle =  node?.title
  const definedText = (node?.text) || node?._rawText
  const definedLink = node?.link

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


          {definedText && (
            <Box sx={{ my: { xs: 5 } }}>
            <RenderPortableText
              previewData={definedText}
              setAsHeading={false}
              value={definedText}
            />
            </Box>
          )}
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
