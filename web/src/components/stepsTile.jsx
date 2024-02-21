import React, { useState, useRef, useEffect } from "react"
import { Box, Divider, Paper, Grid, Typography, useTheme } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import { contrastColour } from "../utils/contrastColour"
import { useInView, useAnimate } from "framer-motion"

export const StepsTile = props => {
  const { previewData, tile, sanityConfig, tileColor, index, displayNumber, pieSegments } =
    props

  const [hover, setHover] = useState(false)
  const theme = useTheme()

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.75 })

  const definedTitle =
    (previewData && previewData?.steps && previewData?.steps[index]?.title) || tile._rawTitle
  const definedDescription =
    (previewData && previewData?.steps && previewData?.steps[index]?.description) ||
    tile._rawDescription
  const definedInvolves =
    (previewData && previewData?.steps && previewData?.steps[index]?.involves) || tile._rawInvolves

  const definedOrientation =
    (previewData && previewData?.steps && previewData?.steps[index]?.tileOrientation) ||
    tile.tileOrientation

  const definedSecondtitle =  (previewData && previewData?.steps[index]?.secondTitle) || tile.secondTitle


  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1 })
    }
  }, [isInView])

  const pie = {
    5: [
      "M72.707 73.1874V1.3877C103.813 1.3877 131.381 21.417 140.993 51.0001L72.707 73.1874Z",
      "M72.707 73.1875L140.993 51.0001C150.605 80.5832 140.075 112.991 114.91 131.275L72.707 73.1875Z",
      "M72.7087 73.1875L114.912 131.275C89.7466 149.558 55.6708 149.558 30.5059 131.275L72.7087 73.1875Z",
      "M72.707 73.1875L30.5042 131.275C5.33925 112.991 -5.19077 80.5832 4.42137 51.0001L72.707 73.1875Z",
      "M72.7075 73.1874L4.42188 51.0001C14.034 21.417 41.602 1.3877 72.7075 1.3877V73.1874Z",
    ],
    6 : [
      "M73.2285 73.0394V1.23438C98.882 1.23438 122.587 14.9203 135.413 37.1369L73.2285 73.0394Z",
      "M73.2285 73.0392L135.413 37.1367C148.24 59.3533 148.24 86.7252 135.413 108.942L73.2285 73.0392Z",
      "M73.2285 73.0391L135.413 108.942C122.587 131.158 98.882 144.844 73.2285 144.844V73.0391Z",
      "M73.2279 73.0391V144.844C47.5745 144.844 23.8697 131.158 11.043 108.942L73.2279 73.0391Z",
      "M73.2269 73.0392L11.0419 108.942C-1.78481 86.7252 -1.78481 59.3533 11.0419 37.1367L73.2269 73.0392Z",
      "M73.2279 73.0394L11.043 37.1369C23.8697 14.9203 47.5745 1.23438 73.2279 1.23438V73.0394Z",
    ]
  }

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
          <Grid container>
            <Grid
              container
              item
              xs={12}
              md={definedOrientation === true ? 6 : 12}
              
            >
              <Grid item xs={8} md={8} sx={{ pl: 12,
              pt: 12,}}>
                {definedTitle && (
                  <>
                    {tile._type !== "stepDivider" && (
                      <Typography
                        variant="overline"
                        color={contrastColour(tileColor).textColour}
                      >{`Step ${displayNumber}`}</Typography>
                    )}
                    <Box  color={contrastColour(tileColor).textColour}>
                    <RenderPortableText
                      previewData={previewData?.steps[index]}
                      sanityConfig={sanityConfig}
                      setAsHeading="h3"
                      value={definedTitle}
                    />
                    </Box>
                  </>
                )}
              </Grid>
              <Grid item xs={4} md={4} sx={{ pr: 12,
              pt: 12}}>
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
                    {pieSegments && pie[pieSegments].map((segment, index) => {
                      return (
                        <path
                          d={segment}
                          fill={
                            displayNumber >= index + 1 && isInView
                              ? contrastColour(tileColor).pie.active.hex
                              : contrastColour(tileColor).pie.default.hex
                          }
                          stroke="white"
                          style={{
                            transitionTimingFunction:
                              "cubic-bezier(0.17, 0.55, 0.55, 1)",
                            transitionProperty: "fill",
                            transitionDuration: "0.2s",
                            transitionDelay: `${index / 10 + 0.9}s`,
                          }}
                        />
                      )
                    })}
                  </svg>
                  {pieSegments && <Typography
                    variant="h2"
                    ref={ref}
                    color={contrastColour(tileColor).textColour}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                      opacity: isInView ? 1 : 0,
                      transition: `all 0.2s cubic-bezier(0.17, 0.55, 0.55, 1) ${pie[pieSegments].length / 10 + 0.9}s`,
                    }}
                  >
                    {String(displayNumber).padStart(2, "0")}
                  </Typography>}
                </Box>
              </Grid>
              <Grid md={definedOrientation ? 12 : 12} sx={{ px: 12,
              py: 12,}} color={contrastColour(tileColor).textColour}>
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
              <Grid
                item
                xs={12}
                md={definedOrientation ? 6 : 12}
                sx={{
                  px: 12,
                  pt: 12,
                  pb: 12,
                  backgroundColor: contrastColour(tileColor).tonalLight.mui,
                }}
              >
                { definedSecondtitle && <><Typography variant="h4" color={contrastColour(tileColor).textColour}>
                  {definedSecondtitle}
                </Typography>
                <Divider
                  sx={{
                    display: "flex",
                    my: 4,
                    width: "100%",
                    borderColor: contrastColour(tileColor).divider.mui,
                  }}
                /></>}
                <Box color={contrastColour(tileColor).textColour}>
                <RenderPortableText
                  previewData={previewData?.steps[index]}
                  sanityConfig={sanityConfig}
                  setAsHeading={false}
                  value={definedInvolves}
                />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Paper>
  )
}
