import React, { useState } from "react"
import { Box, Divider, Paper, Typography, useTheme } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import { contrastColour } from "../utils/contrastColour"

export const StepsTile = props => {
  const { previewData, tile, sanityConfig, tileColor, index } = props

  const [hover, setHover] = useState(false)
  const theme = useTheme()

  const definedTitle =
    (previewData && previewData?.steps[index].title) || tile._rawTitle
  const definedDescription =
    (previewData && previewData?.steps[index].description) || tile._rawDescription
  const definedInvolves =
    (previewData && previewData?.steps[index].involves) || tile._rawInvolves

  return (
    <Paper
      sx={{
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        backgroundColor: tileColor.value,
        flexBasis: "100%", height: '100%',
        mb: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexBasis: "100%",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", flexBasis: "100%", justifyContent: "space-between" }}
        >
          <Box
            sx={{
              px: 10,
              py: 8,
            }}
          >
            {definedTitle && (
              <>
                {tile._type !== "stepDivider" && (
                  <Typography
                    variant="overline"
                    color="text.main"
                  >{`Step ${index + 1}`}</Typography>
                )}
                <RenderPortableText
                  previewData={previewData?.steps[index]}
                  sanityConfig={sanityConfig}
                  setAsHeading="h3"
                  value={definedTitle}
                />
              </>
            )}

            {definedDescription && (
              <RenderPortableText
                previewData={previewData?.steps[index]}
                sanityConfig={sanityConfig}
                setAsHeading={false}
                value={definedDescription}
              />
            )}
          </Box>
          {definedInvolves && (
            <Box
              sx={{
                px: 10,
                py: 8,
                backgroundColor: contrastColour(tileColor).tonalLight.mui,
              }}
            >
              <Typography variant="h4" color="text.main">What does this involve?</Typography>
              <Divider
              sx={{
                display: "flex",
                my: 4,
                width: "100%",
                borderColor: contrastColour(tileColor).divider.mui,
              }}
            />
              <RenderPortableText
                previewData={previewData?.steps[index]}
                sanityConfig={sanityConfig}
                setAsHeading={false}
                value={definedInvolves}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
