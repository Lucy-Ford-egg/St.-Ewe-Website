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
import { StepsTile } from "./stepsTile"
import { RenderPortableText } from "../components/renderPortableText"
import { motion, useScroll, useSpring } from "framer-motion"

export const StepsSection = props => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  // Scroll animation
  const lineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end end"],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [calcContainerHeight, setCalcContainerHeight] = useState(null)

  useEffect(() => {
    setCalcContainerHeight(lineRef.current.offsetHeight)
  }, [lineRef])

  const {
    _rawTitle,
    tileColor,
    _rawText,
    textAlign,
    subtitle,
    topPadding,
    steps,
    previewData,
    sanityConfig,
  } = props

  const definedTitle = (previewData && previewData.title) || _rawTitle
  const definedText = (previewData && previewData.text) || _rawText
  const definedSteps = (previewData && previewData.steps) || steps
  const defineTileColor = (previewData && previewData.tileColor) || tileColor

  const renderSteps = () => {

    let steps = []
    let acc = 0
    for (let i = 0; i < definedSteps.length; i++) {
      let currentItem = definedSteps[i]

      if (currentItem._type === "stepDivider") {
        // Skip the divider
        
        steps.push(<Grid
          key={`step-${i}`}
          item
          xs={12}
          sm={12}
          md={12}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              mb: 6,
              py: 6,
            }}
          >
            <Typography variant="overline"  sx={{mb: 3}}>
              {previewData?.steps[i].tile?.subtitle || currentItem.subtitle}
            </Typography>
            <Divider variant="fullWidth" component="div" role="presentation" sx={{ whiteSpace: {xs: "wrap", md: "pre-wrap"} }}>
              <Typography variant="body2" sx={{ textAlign: "center", width: { md: 400} }}>
                {previewData?.steps[i].tile?.title || currentItem.title}
              </Typography>
            </Divider>
          </Box>
        </Grid>)
        
      }
      if (currentItem._type !== "stepDivider") {
        acc++
        steps.push(
        <Grid
          key={`step-${i}`}
          item
          xs={12}
          sm={12}
          md={currentItem.tileOrientation === true ? 12 : 6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          
            <StepsTile
              tileColor={defineTileColor}
              tile={currentItem }
              previewData={previewData}
              index={i}
              displayNumber={[acc ]}
              sanityConfig={sanityConfig}
            />
         
        </Grid>
        )
      }
      
    }
    return steps
  }

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

          {definedText && (
            <Divider
              sx={{
                display: "flex",
                my: 10,
                width: "19.1875rem",
                borderColor: "primary.main",
              }}
            />
          )}
          {definedText && (
            <RenderPortableText
              previewData={previewData}
              sanityConfig={sanityConfig}
              variant={false}
              textAlign={textAlign}
              value={definedText}
            />
          )}
        </Grid>
      </Grid>
      <Container ref={lineRef}  disableGutters={mobile ? true : false} maxWidth="lg" style={{ position: "relative" }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 0, sm: 6, md: 6 }}
          sx={{
            pt: theme.spacing(6),
            justifyContent: "center",
            display: "flex",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 24,
              left: {xs: 0, md: -41},
              ml: 0,
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
              }}
            >
              <motion.div
                className="line"
                style={{
                  position: "relative",
                  width: 8,
                  minHeight: calcContainerHeight,
                  backgroundColor: "#F04D5F",
                  transformOrigin: "0% 0%",
                  scaleY: scaleY,
                }}
              ></motion.div>
              {/* <motion.div
                style={{
                  width: 23,
                  height: 23,
                  display: "block",
                  backgroundColor: "#F04D5F",
                  borderRadius: 1000,
                  bottom: 0,
                }}
              /> */}
            </Box>
          </Box>
          {definedSteps && renderSteps()}
        </Grid>
      </Container>
    </Container>
  )
}

export const query = graphql`
  fragment StepsSectionFragment on SanityStepsSection {
    _key
    _type
    _rawTitle(resolveReferences: { maxDepth: 10 })
    topPadding
    tileColor {
      value
      label
    }
    textAlign
    _rawText(resolveReferences: { maxDepth: 10 })
    subtitle
    steps {
      ... on SanityStepDivider {
        _key
        _type
        title
        subtitle
      }
      ... on SanityStepTile {
        _key
        _type
        _rawTitle(resolveReferences: { maxDepth: 10 })
        _rawDescription(resolveReferences: { maxDepth: 10 })
        _rawInvolves(resolveReferences: { maxDepth: 10 })
        tileOrientation
      }
    }
  }
`
