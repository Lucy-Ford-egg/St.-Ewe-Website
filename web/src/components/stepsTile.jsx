import React, { useRef, useEffect } from "react"
import { Box, Divider, Paper, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import { contrastColour } from "../utils/contrastColour"
import { useInView, useAnimate, motion } from "framer-motion"

export const StepsTile = props => {
  const { previewData, tile, sanityConfig, tileColor, index, displayNumber, pieSegments } =
    props
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down("sm"))
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: sm ? "some" : "all", once: false })

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
    1:[
      "M73.0355 72.7781V0.973145C112.692 0.973145 144.84 33.1213 144.84 72.7781C144.84 112.435 112.692 144.583 73.0355 144.583C33.3787 144.583 1.23047 112.435 1.23047 72.7781C1.23047 33.1213 33.3787 0.973145 73.0355 0.973145V72.7781Z"
    ],
    2:[
      "M72.3984 72.7718V0.966797C112.055 0.966797 144.203 33.115 144.203 72.7718C144.203 112.429 112.055 144.577 72.3984 144.577V72.7718Z",
      "M72.3988 72.7718V144.577C32.7419 144.577 0.59375 112.429 0.59375 72.7718C0.59375 33.115 32.7419 0.966797 72.3988 0.966797V72.7718Z"
    ],
    3:[
      "M72.4629 72.772V0.972656C112.117 0.972656 144.262 33.1183 144.262 72.772C144.262 85.3755 140.945 97.7568 134.643 108.672L72.4629 72.772Z",
"M72.4633 72.772L134.643 108.672C114.817 143.013 70.9047 154.779 36.5636 134.952C25.6487 128.65 16.5849 119.587 10.2832 108.672L72.4633 72.772Z",
"M72.4637 72.772L10.2836 108.672C-9.54323 74.3306 2.22291 30.4188 36.564 10.592C47.4789 4.29024 59.8603 0.972656 72.4637 0.972656V72.772Z",
    ],
    4:[
      "M72.5156 72.7781V0.973145C112.172 0.973145 144.321 33.1213 144.321 72.7781H72.5156Z",
      "M72.5156 72.7783H144.321C144.321 112.435 112.172 144.583 72.5156 144.583V72.7783Z",
      "M72.5159 72.7783V144.583C32.8591 144.583 0.710938 112.435 0.710938 72.7783H72.5159Z",
      "M72.5159 72.7781H0.710938C0.710938 33.1213 32.8591 0.973145 72.5159 0.973145V72.7781Z",
    ],
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
    ],
    7:[
      "M73.0918 72.7781V0.973145C94.9438 0.973145 115.607 10.9239 129.231 28.0085L73.0918 72.7781Z",
"M73.0918 72.778L129.231 28.0083C142.856 45.0929 147.959 67.452 143.096 88.7561L73.0918 72.778Z",
"M73.0918 72.7783L143.096 88.7564C138.234 110.061 123.935 127.991 104.247 137.472L73.0918 72.7783Z",
"M73.0906 72.7783L104.246 137.472C84.5576 146.954 61.6235 146.954 41.9355 137.472L73.0906 72.7783Z",
"M73.0906 72.7783L41.9356 137.472C22.2476 127.991 7.94847 110.061 3.08594 88.7564L73.0906 72.7783Z",
"M73.0908 72.778L3.0861 88.7561C-1.77643 67.452 3.32688 45.0929 16.9514 28.0083L73.0908 72.778Z",
"M73.0906 72.7781L16.9512 28.0085C30.5757 10.9239 51.2386 0.973145 73.0906 0.973145V72.7781Z",
    ],
    8:[
      "M73.0312 72.6673V0.862305C92.0751 0.862305 110.339 8.42745 123.805 21.8935L73.0312 72.6673Z",
"M73.0312 72.6674L123.805 21.8936C137.271 35.3596 144.836 53.6235 144.836 72.6674H73.0312Z",
"M73.0312 72.6675H144.836C144.836 91.7114 137.271 109.975 123.805 123.441L73.0312 72.6675Z",
"M73.0312 72.6675L123.805 123.441C110.339 136.907 92.0751 144.472 73.0312 144.472V72.6675Z",
"M73.0316 72.6675V144.472C53.9877 144.472 35.7239 136.907 22.2578 123.441L73.0316 72.6675Z",
"M73.0316 72.6675L22.2578 123.441C8.79171 109.975 1.22656 91.7114 1.22656 72.6675H73.0316Z",
"M73.0316 72.6674H1.22656C1.22656 53.6235 8.79171 35.3596 22.2578 21.8936L73.0316 72.6674Z",
"M73.0316 72.6673L22.2578 21.8935C35.7239 8.42745 53.9877 0.862305 73.0316 0.862305V72.6673Z",
    ],
    9:[
      "M73.1504 72.6673V0.862305C90.0319 0.862305 106.374 6.81024 119.306 17.6615L73.1504 72.6673Z",
"M73.1504 72.6674L119.306 17.6616C132.238 28.5129 140.933 43.5736 143.865 60.1986L73.1504 72.6674Z",
"M73.1504 72.6675L143.865 60.1987C146.796 76.8238 143.776 93.9502 135.335 108.57L73.1504 72.6675Z",
"M73.1504 72.6675L135.335 108.57C126.895 123.19 113.573 134.368 97.7091 140.142L73.1504 72.6675Z",
"M73.1506 72.6675L97.7093 140.142C81.8458 145.916 64.4553 145.916 48.5918 140.142L73.1506 72.6675Z",
"M73.1498 72.6675L48.591 140.142C32.7276 134.368 19.4056 123.19 10.9648 108.57L73.1498 72.6675Z",
"M73.1508 72.6675L10.9659 108.57C2.52512 93.9502 -0.494724 76.8238 2.43673 60.1987L73.1508 72.6675Z",
"M73.1497 72.6674L2.43555 60.1986C5.367 43.5736 14.0623 28.5129 26.9943 17.6616L73.1497 72.6674Z",
"M73.1495 72.6673L26.9941 17.6615C39.9262 6.81024 56.268 0.862305 73.1495 0.862305V72.6673Z",
    ],
    10:[
      "M73.209 72.3367V0.531738C88.3727 0.531738 103.147 5.33226 115.415 14.2453L73.209 72.3367Z",
"M73.209 72.3366L115.415 14.2451C127.683 23.1581 136.814 35.7261 141.5 50.1476L73.209 72.3366Z",
"M73.209 72.3369L141.5 50.1479C146.185 64.5695 146.185 80.1043 141.5 94.5259L73.209 72.3369Z",
"M73.209 72.3369L141.5 94.5259C136.814 108.947 127.683 121.515 115.415 130.428L73.209 72.3369Z",
"M73.209 72.3369L115.415 130.428C103.147 139.341 88.3727 144.142 73.209 144.142V72.3369Z",
"M73.2098 72.3369V144.142C58.0461 144.142 43.2716 139.341 31.0039 130.428L73.2098 72.3369Z",
"M73.2086 72.3369L31.0027 130.428C18.735 121.515 9.60382 108.947 4.91797 94.5259L73.2086 72.3369Z",
"M73.2093 72.3369L4.91868 94.5259C0.232835 80.1043 0.232835 64.5695 4.91868 50.1479L73.2093 72.3369Z",
"M73.2086 72.3366L4.91797 50.1476C9.60382 35.7261 18.735 23.1581 31.0027 14.2451L73.2086 72.3366Z",
"M73.2098 72.3367L31.0039 14.2453C43.2716 5.33226 58.0461 0.531738 73.2098 0.531738V72.3367Z",
    ],
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
        backgroundColor: tileColor?.value,
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
              <Grid container>
              <Grid item xs={8} md={8} sx={{ pl: {xs: 9, md: 12}, pb: {xs: 0, md: 6}, pt: {xs: 9, md: 12} }}>
                {definedTitle && (
                  <>
                    {tile._type !== "stepDivider" && (
                      <Typography
                        variant="overline"
                        color={contrastColour(tileColor).textColour}
                      >{`Step ${displayNumber}`}</Typography>
                    )}
                    <Box ref={ref} color={contrastColour(tileColor).textColour} sx={{mt: {xs: -1, md: -1}}}>
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
              <Grid item xs={4} md={4} sx={{ pr: {xs: 9, md: 12}, pb: {xs: 0, lg: 6}, pt: {xs: 9, lg: 12}, display: 'flex', flexDirection: "column", alignItems: "center" }}>
                <Box
                   
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
                   ref={scope}
                    viewBox="0 0 146 146"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    // animation prop
                    variants={pieContainer}
                    initial="hidden"
                    animate={isInView === true && "show"}
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
                   ref={scope}
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
                        //transition: `all 0.2s cubic-bezier(0.17, 0.55, 0.55, 1) ${pie[pieSegments].length / 10 + 0.3}s`,
                      }}
                    >
                      {String(displayNumber).padStart(2, "0")}
                    </Typography>
                  )}
                </Box>
              </Grid>
              </Grid>
              {definedDescription && (
              <Grid
              
                xs={12}
                md={definedOrientation ? 12 : 12}
                sx={{ px: {xs: 9, md: 12},  py: {xs: 6, sm: 6, lg: 6}}}
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
                  px: {xs: 9, lg: 12},
                  pt: {xs: 9, lg: 12},
                  pb: {xs: 9, lg: 12},
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
