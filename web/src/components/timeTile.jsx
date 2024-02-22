import React, { useState, useRef, useEffect } from "react"
import { Box, Divider, Paper, Grid, Typography, useTheme } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import { contrastColour } from "../utils/contrastColour"
import { useInView, useAnimate, motion } from "framer-motion"

export const TimeTile = props => {
  const { previewData, tile, sanityConfig, timelineColor, index } = props

  const [hover, setHover] = useState(false)
  const theme = useTheme()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.9 })

  const definedTitle =
    (previewData && previewData?.steps && previewData?.steps[index]?.title) ||
    tile._rawTitle
  const definedDescription =
    (previewData &&
      previewData?.steps &&
      previewData?.steps[index]?.description) ||
    tile._rawDescription

  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1 })
    }
  }, [isInView])

  const timelineContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const event = {
    hidden: {
      opacity: 0.5,
    },
    show: {
      opacity: 1,
    },
  }

  return (
    <Grid container columnSpacing={{ xs: 0, md: 16 }} rowSpacing={6}>
      <Grid
        item
        xs={8}
        md={4}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {definedTitle && (
          <>
            <Box sx={{ textAlign: "right" }}>
              <RenderPortableText
                previewData={previewData?.steps[index]}
                sanityConfig={sanityConfig}
                setAsHeading="h2"
                value={definedTitle}
              />
            </Box>
          </>
        )}
      </Grid>
      <Grid item xs={12} md={7}>
        {definedDescription && (
          <RenderPortableText
            previewData={previewData?.steps[index]}
            sanityConfig={sanityConfig}
            setAsHeading={false}
            value={definedDescription}
          />
        )}
      </Grid>
    </Grid>
  )
}
