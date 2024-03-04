import React, { useRef, useEffect } from "react"
import { Box, Divider, Paper, Grid, Typography } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import { contrastColour } from "../utils/contrastColour"
import { useInView, useAnimate, motion } from "framer-motion"

export const StepsTile = props => {
  const { previewData, tile, sanityConfig, tileColor, index, displayNumber, pieSegments } =
    props

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

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

  const definedSecondtitle =  (previewData && previewData?.steps && previewData?.steps[index]?.secondTitle) || tile?.secondTitle

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

  const pieContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const slice = {
    hidden: { 
      opacity: 0.5,
    },
    show: { 
      opacity: 1, 
    }
  }

  const activeSlice = {
    hidden: { 
      opacity: 0,
      fill: contrastColour(tileColor).pie.default.hex,
    },
    show: { 
      opacity: 1, 
      fill: contrastColour(tileColor).pie.active.hex,
    }
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
        borderRadius: 0,
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
          <Grid container sx={{ flexBasis: "100%" }}>
            <Grid
              container
              item
              xs={12}
              md={definedOrientation === true ? 6 : 12}
            >
              <Grid item xs={8} md={8} sx={{ pl: {xs: 9, md: 12}, pb: {xs: 9, md: 12}, pt: {xs: 9, md: 12} }}>
                {definedTitle && (
                  <>
                    {tile._type !== "stepDivider" && (
                      <Typography
                        variant="overline"
                        color={contrastColour(tileColor).textColour}
                      >{`Step ${displayNumber}`}</Typography>
                    )}
                    <Box color={contrastColour(tileColor).textColour} sx={{mt: {xs: -1, md: -1}}}>
                      <RenderPortableText
                        previewData={previewData?.steps && previewData?.steps[index]}
                        sanityConfig={sanityConfig}
                        setAsHeading="h3"
                        value={definedTitle}
                      />
                    </Box>
                  </>
                )}
              </Grid>
              <Grid item xs={4} md={4} sx={{ pr: {xs: 9, md: 12}, pb: {xs: 9, md: 12}, pt: {xs: 9, md: 12}, display: 'flex', flexDirection: "column", alignItems: "center" }}>
                <Box
                 ref={scope}
                  sx={{
                    display: "grid",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridTemplateRow: "repeat(2, 1fr)",
                    flexBasis: "100%",
                    svg:{
                      width: {xs: 76, md: 146},
                      height: {xs: 76, md: 146},
                    }
                  }}
                >
                  <motion.svg     
                    
                    viewBox="0 0 146 146"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    // animation prop
                    variants={pieContainer}
                    initial="hidden"
                    animate={isInView && "show"}
                    style={{
                      position: "relative",
                      gridColumn: "1/3",
                      gridRow: "1/3",
                      zIndex: 1,
                    }}
                  >
                    {pieSegments && 
                      pie[pieSegments].map((segment, index) => {
                      
                        return (displayNumber >= index + 1 && <motion.path key={`bg-${segment}-${index}`}
                            d={segment}
                            stroke="white"
                            variants={activeSlice}
                          />)
                        
                      })}
                  </motion.svg>

                  <motion.svg     
                    
                    viewBox="0 0 146 146"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    // animation prop
                    variants={pieContainer}
                    initial="hidden"
                    animate={isInView && "show"}
                    style={{
                      position: "relative",
                      gridColumn: "1/3",
                      gridRow: "1/3",
                      zIndex: 1,
                    }}
                  >
                    {pieSegments && 
                      pie[pieSegments].map((segment, index) => {
                        return (
                          <motion.path
                          key={`slices-${segment}-${index}`}
                            d={segment}
                            stroke="white"
                            variants={slice}
                            style={{
                              fill: `${displayNumber >= index + 1
                                && contrastColour(tileColor).pie.active.hex} !important`,
                            }}
                          />
                        )
                      })}
                  </motion.svg>

                  {pieSegments && (
                    <Typography
                      variant="h2"
                      ref={ref}
                      color={contrastColour(tileColor).textColour}
                      sx={{
                        position: "relative",
                        gridColumn: "1/3",
                        gridRow: "1/3",
                        zIndex: 2,
                        textAlign: "center",
                        opacity: isInView ? 1 : 0,
                        transition: `all 0.2s cubic-bezier(0.17, 0.55, 0.55, 1) ${pie[pieSegments].length / 10 + 0.3}s`,
                      }}
                    >
                      {String(displayNumber).padStart(2, "0")}
                    </Typography>
                  )}
                </Box>
              </Grid>
              {definedDescription && (
              <Grid
                xs={12}
                md={definedOrientation ? 12 : 12}
                sx={{ px: {xs: 9, md: 12},  py: {xs: 6, md: 12}}}
                color={contrastColour(tileColor).textColour}
              >
                
                  <RenderPortableText
                    previewData={previewData?.steps && previewData?.steps[index]}
                    sanityConfig={sanityConfig}
                    setAsHeading={false}
                    value={definedDescription}
                  />
                
              </Grid>
              )}
            </Grid>
            {definedInvolves && (
              <Grid
                item
                xs={12}
                md={definedOrientation ? 6 : 12}
                sx={{
                  px: {xs: 9, md: 12},
                  pt: {xs: 9, md: 12},
                  pb: {xs: 9, md: 12},
                  backgroundColor: contrastColour(tileColor).tonalLight.mui,
                }}
              >
                {definedSecondtitle && (
                  <>
                    <Typography
                      variant="h4"
                      color={contrastColour(tileColor).textColour}
                    >
                      {definedSecondtitle}
                    </Typography>
                    <Divider
                      sx={{
                        display: "flex",
                        my: 4,
                        width: "100%",
                        borderColor: contrastColour(tileColor).divider.mui,
                      }}
                    />
                  </>
                )}
                <Box color={contrastColour(tileColor).textColour}>
                  <RenderPortableText
                    previewData={previewData?.steps && previewData?.steps[index]}
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
