import React, { useState, useRef, useEffect } from "react"
import { Box, Divider, Paper, Grid, Typography, useTheme } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import { contrastColour } from "../utils/contrastColour"
import { motion, useInView, useAnimate, stagger} from "framer-motion"

export const StepsTile = props => {
  const { previewData, tile, sanityConfig, tileColor, index, displayNumber } =
    props

  const [hover, setHover] = useState(false)
  const theme = useTheme()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.75 })

  const definedTitle =
    (previewData && previewData?.steps[index].title) || tile._rawTitle
  const definedDescription =
    (previewData && previewData?.steps[index].description) ||
    tile._rawDescription
  const definedInvolves =
    (previewData && previewData?.steps[index].involves) || tile._rawInvolves

    const [scope, animate] = useAnimate()

    useEffect(() => {
      if (isInView) {
        animate(scope.current, { opacity: 1 })
      }
   }, [isInView])

const pie6 = [
  "M73.2285 73.0394V1.23438C98.882 1.23438 122.587 14.9203 135.413 37.1369L73.2285 73.0394Z",
  "M73.2285 73.0392L135.413 37.1367C148.24 59.3533 148.24 86.7252 135.413 108.942L73.2285 73.0392Z",
  "M73.2285 73.0391L135.413 108.942C122.587 131.158 98.882 144.844 73.2285 144.844V73.0391Z",
  "M73.2279 73.0391V144.844C47.5745 144.844 23.8697 131.158 11.043 108.942L73.2279 73.0391Z",
  "M73.2269 73.0392L11.0419 108.942C-1.78481 86.7252 -1.78481 59.3533 11.0419 37.1367L73.2269 73.0392Z",
  "M73.2279 73.0394L11.043 37.1369C23.8697 14.9203 47.5745 1.23438 73.2279 1.23438V73.0394Z",
]

  return (
    <Paper
      sx={{
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        backgroundColor: tileColor.value,
        flexBasis: "100%",
        height: "100%",
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
          sx={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            justifyContent: "space-between",
          }}
        >
          <Grid
            container
            sx={{
              px: 10,
              py: 8,
            }}
          >
            <Grid item xs={8} md={8}>
              {definedTitle && (
                <>
                  {tile._type !== "stepDivider" && (
                    <Typography
                      variant="overline"
                      color="text.main"
                    >{`Step ${displayNumber}`}</Typography>
                  )}
                  <RenderPortableText
                    previewData={previewData?.steps[index]}
                    sanityConfig={sanityConfig}
                    setAsHeading="h3"
                    value={definedTitle}
                  />
                </>
              )}
            </Grid>
            <Grid item xs={4} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <svg
                  ref={scope}
                  width="146"
                  height="146"
                  viewBox="0 0 146 146"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {pie6.map((segment, index) => {
                
                    return (
                      <path
                        d={segment}
                        fill={
                          displayNumber >= index + 1 && isInView
                            ? "#F04D5F"
                            : "#FCD9DE"
                        }
                        stroke="white"
                        style={{
                          transitionTimingFunction: "cubic-bezier(0.17, 0.55, 0.55, 1)",
                          transitionProperty: "fill",
                          transitionDuration: "0.2s",
                          transitionDelay: `${(index / 10) + 0.9}s`,
                        }}
                      />
                    )
                  })}
                </svg>
                <Typography
                  variant="h2"
                  ref={ref}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    opacity: isInView ? 1 : 0,
                    transition:
                      `all 0.2s cubic-bezier(0.17, 0.55, 0.55, 1) ${(pie6.length / 10) + 0.9}s`,
                  }}
                >
                  {String(displayNumber).padStart(2, "0")}
                </Typography>
              </Box>
            </Grid>
            <Grid md={12}>
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
          {definedInvolves && (
            <Box
              sx={{
                px: 10,
                py: 8,
                backgroundColor: contrastColour(tileColor).tonalLight.mui,
              }}
            >
              <Typography variant="h4" color="text.main">
                What does this involve?
              </Typography>
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
