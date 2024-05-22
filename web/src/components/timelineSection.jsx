import React, { useRef, useState, useEffect } from "react"
import { graphql } from "gatsby"
import {
  Container,
  Grid,
  Typography,
  Divider,
  useMediaQuery,
  Box,
  useTheme,
} from "@mui/material"
// import { TimeTile } from "./timeTile"
import { RenderPortableText } from "../components/renderPortableText"
import { motion, useScroll, useSpring } from "framer-motion"

export const TimelineSection = props => {
  const theme = useTheme()
  const smallMobile = useMediaQuery("@media screen and (max-width: 320px)")

  // Scroll animation
  const lineRef = useRef(null)
  const targetRef = useRef(null)
  const referenceRef = useRef(null)
  const lastElement  = useRef(null)


  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["-50vh start", "end end"],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [height, setHeight] = useState(0)

  const {
    _rawTitle,
    _rawLeftText,
    _rawRightText,
    textAlign,
    subtitle,
    topPadding,
    steps,
    timelineColor,
    previewData,
    sanityConfig,
    _type,
  } = props

  const definedSubtitle =
    (previewData && _type === previewData?._type && previewData?.subtitle) ||
    subtitle
  const definedTitle =
    (previewData && _type === previewData?._type && previewData?.title) ||
    _rawTitle
  const definedLeftText =
    (previewData && _type === previewData?._type && previewData?.leftText) ||
    _rawLeftText
  const definedRightText =
    (previewData && _type === previewData?._type && previewData?.rightText) ||
    _rawRightText
  const definedSteps =
    (previewData && _type === previewData?._type && previewData?.steps) || steps
  const defineTimelineColor =
    (previewData &&
      _type === previewData?._type &&
      previewData?.timelineColor) ||
    timelineColor

  useEffect(() => {
    if (referenceRef.current && targetRef.current) {
      debugger
      const referenceHeight = referenceRef.current.clientHeight - (lastElement.current.clientHeight)
      setHeight(referenceHeight )
    }
  }, [referenceRef, targetRef, lastElement])

  const GridComponent = React.forwardRef((props, ref) => (
    <Grid {...props} ref={ref} />
  ))

  GridComponent.displayName = "GridComponent"

  const GridMotion = motion(GridComponent)

  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: { xs: theme.spacing(0), md: theme.spacing(15) },
        pt: topPadding ? 0 : { xs: theme.spacing(15), md: theme.spacing(15) },
        position: "relative",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        columnSpacing={{ xs: 0, md: 16 }}
        rowSpacing={6}
        justifyContent={textAlign}
        sx={{
          pb: { xs: 10, md: 15 },
        }}
      >
        <Grid item xs={12} sm={12} md={7}>
          {definedSubtitle && (
            <Typography
              variant="overline"
              color="primary.main"
              sx={{
                textAlign: textAlign === "flex-start" ? "left" : textAlign,
              }}
            >
              {definedSubtitle}
            </Typography>
          )}
          {definedTitle && (
            <RenderPortableText
              previewData={previewData}
              sanityConfig={sanityConfig}
              variant={false}
              textAlign={textAlign}
              value={definedTitle}
            />
          )}

          {definedLeftText && (
            <Divider
              sx={{
                display: "flex",
                my: 10,
                width: "19.1875rem",
                borderColor: "primary.main",
              }}
            />
          )}
          {definedLeftText && (
            <RenderPortableText
              previewData={previewData}
              sanityConfig={sanityConfig}
              variant={false}
              textAlign={textAlign}
              value={definedLeftText}
            />
          )}
        </Grid>
        {definedRightText && (
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexBasis: "100%",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <RenderPortableText
              previewData={previewData}
              sanityConfig={sanityConfig}
              variant={false}
              textAlign={textAlign}
              value={definedRightText}
            />
          </Grid>
        )}
      </Grid>
      <Container maxWidth="sm">
        <Grid
          ref={referenceRef}
          sx={{
            position: "relative",
          }}
          container
        >
          <Grid item xs={1} md={1} sx={{}}>
            <Box
              ref={targetRef}
              sx={{
                mt: 24,
                height: "100%",
                mx: "unset",
                display: "flex",
                justifyContent: "flex-start",
              }}
              component="figure"
            >
              <Box
                component="span"
                sx={{
                  position: "relative",
                  flexBasis: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  minHeight: height,
                  maxHeight: height,
                }}
              >
                <motion.div
                  key={lineRef.current}
                  className="line"
                  style={{
                    position: "relative",
                    width: 8,
                    backgroundColor: defineTimelineColor.value,
                    transformOrigin: "0% 0%",
                    scaleY: scaleY,
                    height: "100%",
                  }}
                ></motion.div>
              </Box>
            </Box>
          </Grid>
          <GridMotion
            item
            xs={11}
            md={11}
            sx={{
              pl: {md: 6}
            }}
          >
            {definedSteps &&
              definedSteps.map((step, index) => {
                const definedTitle =
                  (previewData && definedSteps && definedSteps[index]?.title) ||
                  step._rawTitle

                const definedDescription =
                  (definedSteps && definedSteps[index]?.description) ||
                  step._rawDescription

                const nodes = definedSteps.length
                const final = definedSteps[nodes]

                return (
                  <Box sx={{
                    py: { xs: 6, md: 16 },
                    "&:first-of-type": {
                      pt: 0,
                    },
                    "&:last-of-type": {
                      pb: 0,
                    }
                  }}>
                  <motion.div
                    ref={lastElement}
                    key={`event-${index}`}
                    initial={{
                      opacity: 0.3,
                    }}
                    whileInView={{
                      opacity: 1,
                    }}
                    //exit={{ opacity: 0.1 }}
                    viewport={{
                      amount: smallMobile ? "some" : "all",
                      //margin: "25%",
                      once: false,
                    }}
                  >
                    <Box
                      // ref={eventRef}
                      sx={{
                       
                        display: { xs: "flex", md: "flex" },
                        flexDirection: { xs: "column", md: "row" },
                       
                      }}
                    >
                      {definedTitle && (
                        <Box
                          sx={{
                            
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: {
                              xs: "flex-start",
                              md: "flex-end",
                            },
                            textAlign: { xs: "left", md: "right" },
                            alignItems: { xs: "center", md: "flex-start"}



                          }}
                        >
                          <Box
                            sx={{
                              pl: { xs: 3, md: "unset" },
                              pr: { xs: 0, md: 17 },
                              order: { xs: 1, md: 0 },
                              position: { md: "absolute" },
                              pt:{
                                md: 0,
                              },
                              h3: {
                                pb: 0,
                                pt: {md: 0},
                              },
                              h2: {
                                pb: 0,
                                pt: {md: "0 !important"},
                              },
                              maxWidth: {sm: "250px", lg: "unset"}
                            }}
                          >
                            {definedTitle && (
                              <RenderPortableText
                                previewData={
                                  previewData &&
                                  previewData?.steps &&
                                  previewData?.steps[index] &&
                                  previewData?.steps[index]
                                }
                                sanityConfig={sanityConfig}
                                setAsHeading="h2"
                                value={definedTitle}
                              />
                            )}
                          </Box>
                          <Box
                            sx={{
                              order: { xs: 0, md: 1 },
                              opacity: "1 !important",
                              display: "flex",
                              width: "20px",
                              height: "20px",
                              borderRadius: "1000px",
                              backgroundColor: timelineColor.value,
                              position: "absolute",
                              left: "4.1%",
                              // mt: 1,
                              transform: "translateX(-50%)",
                            }}
                          />
                        </Box>
                      )}
                      {definedDescription && (
                        <Box
                          sx={{
                            pl: { xs: 3, md: "unset" },
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <RenderPortableText
                            previewData={definedSteps[index]}
                            sanityConfig={sanityConfig}
                            setAsHeading={false}
                            value={definedDescription}
                          />
                        </Box>
                      )}
                    </Box>
                  </motion.div>
                  </Box>
                )
              })}
          </GridMotion>
        </Grid>
      </Container>
    </Container>
  )
}

export const query = graphql`
  fragment TimelineSectionFragment on SanityTimelineSection {
    _key
    _type
    subtitle
    _rawTitle(resolveReferences: { maxDepth: 10 })
    topPadding
    timelineColor {
      value
      label
    }
    _rawLeftText(resolveReferences: { maxDepth: 10 })
    _rawRightText(resolveReferences: { maxDepth: 10 })
    steps {
      ... on SanityTimeTile {
        _key
        _type
        _rawTitle(resolveReferences: { maxDepth: 10 })
        _rawDescription(resolveReferences: { maxDepth: 10 })
      }
    }
  }
`
