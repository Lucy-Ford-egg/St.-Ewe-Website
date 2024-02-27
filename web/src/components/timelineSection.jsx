import React, { useRef, useState, useEffect, useCallback } from "react"
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
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  // Scroll animation
  const lineRef = useRef(null)
  const eventRef = useRef(null)
  const targetRef = useRef(null)
  const referenceRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    //offset: [`${mobile ? "start" : "end"}${mobile ? "center" : "end"}`, "end end"],
    offset: ["start end", "end end"],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [height, setHeight] = useState(0)

  const {
    _rawTitle,
    tileColor,
    _rawLeftText,
    _rawRightText,
    textAlign,
    subtitle,
    topPadding,
    steps,
    timelineColor,
    previewData,
    sanityConfig,
  } = props

  const definedTitle = (previewData && previewData.title) || _rawTitle
  const definedLeftText = (previewData && previewData.leftText) || _rawLeftText
  const definedRightText =
    (previewData && previewData.rightText) || _rawRightText
  const definedSteps = (previewData && previewData.steps) || steps
  const defineTimelineColor =
    (previewData && previewData.timelineColor) || timelineColor

  useEffect(() => {
    if (referenceRef.current && targetRef.current) {
      const referenceHeight = referenceRef.current.clientHeight
      setHeight(referenceHeight)
    }
  }, [referenceRef, targetRef])

  const GridComponent = React.forwardRef((props, ref) => (
    <Grid {...props} ref={ref} />
  ));

  GridComponent.displayName = 'GridComponent';

  const GridMotion = motion(GridComponent);

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
          {subtitle && (
            <Typography
              variant="overline"
              color="primary.main"
              sx={{
                textAlign: textAlign === "flex-start" ? "left" : textAlign,
              }}
            >
              {subtitle}
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

      <Grid ref={referenceRef} sx={{ position: "relative" }} container>
        <Grid
          item
          xs={1}
          md={3}
          sx={{
            position: "relative",
          }}
        >
          <Box
            ref={targetRef}
            sx={{
              position: "absolute",
              top: 24,
              left: { xs: "0%", sm: "4%", md: "0%", lg: "100%" },
              ml: {xs: 0, sm: 10, md: 10, lg: -5, xl: 0},
              height: "100%",
              display: "flex",
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
          xs={11} md={9} 
          sx={{ transform: {xs: "unset", md: "translateX(-222px)"} }}
          
        >
          {definedSteps &&
            definedSteps.map((step, index) => {
              const definedTitle =
                (previewData && definedSteps && definedSteps[index]?.title) ||
                step._rawTitle

              const definedDescription =
                (definedSteps && definedSteps[index]?.description) ||
                step._rawDescription

              return (
                <motion.div
                key={`event-${index}`}
                initial={{
                  opacity: 0.1,
                }}
                whileInView={{
                  opacity: 1,
                }}
                exit={{ opacity: 1 }}
                viewport={{
                  amount: 'all',
                  margin: '-10%',
                  once: false,
                }}
                >
                <Box
                  ref={eventRef}
                  sx={{
                    py: { xs: 6, md: 16 },
                    display: {xs: "flex", md:"grid"},
                    flexDirection: {xs: "column", md: "row"},
                    gridTemplateColumns: {xs: "unset", md: "minmax(200px, 2fr) 0.8fr 6fr"},
                  }}
                >
                  {definedTitle && (
                  
                      <Box sx={{ gridColumn: "1/2", display: "flex", flexDirection: "row", justifyContent: {xs: "flex-start", md: "flex-end"}, alignItems: "center",  textAlign: {xs: "left", md: "right"},
                      }}>
                        <Box sx={{
                          pr: {xs: 0, md: "104px"},
                          order: {xs: 1, md: 0},
                          h3:{
                            pb: 0,
                          }
                        }}>
                          {definedTitle && (
                        <RenderPortableText
                          previewData={previewData && previewData?.steps[index] && previewData?.steps[index]}
                          sanityConfig={sanityConfig}
                          setAsHeading="h2"
                          value={definedTitle}
                        />
                        )}
                        </Box>
                        <Box sx={{
                          order: {xs: 0, md: 1}, 
                          opacity: "1 !important", 
                          mr: {xs: 0, md: "-46px"},
                          ml: {xs: 2, md: 0}, 
                          color: timelineColor.value, 
                          display: "list-item", 
                          fontSize: "64px"}}/>
                      </Box>
                    
                  )}
                  {definedDescription && (
                    <Box sx={{ pl: {xs: 3, md: "unset" },gridColumn: "3/4", display: "flex", alignItems: "center" }}>
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
              )
            })}
        </GridMotion>
      </Grid>
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
