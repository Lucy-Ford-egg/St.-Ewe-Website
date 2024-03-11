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
import { StepsTile } from "./stepsTile"
import { RenderPortableText } from "../components/renderPortableText"
import { motion, useScroll, useSpring } from "framer-motion"
import { contrastColour } from "../utils/contrastColour"
import {AccordionTile} from "../components/accordionTile"

export const StepsSection = props => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  // Scroll animation
  const lineRef = useRef(null)
  const targetRef = useRef(null);
  const referenceRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["-50vh start", "end end"],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })


  const [height, setHeight] = useState(0);

  
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

  const definedTitle = (previewData && previewData?.title) || _rawTitle
  const definedText = (previewData && previewData?.text) || _rawText
  const definedSteps = (previewData && previewData?.steps) || steps
  const definedTileColor = (previewData && previewData?.tileColor) || tileColor
  const definedTextAlign = (previewData && previewData?.textAlign) || textAlign
  

  const [pieSegments, setPieSegments] = useState(null)

  useEffect(() => {
    setPieSegments(definedSteps.filter(item => item._type === "stepTile"));
  }, [definedSteps]);

  useEffect(() => {
    if (referenceRef.current && targetRef.current) {
      const referenceHeight = referenceRef.current.clientHeight;
      setHeight(referenceHeight);
    }
  }, [referenceRef, targetRef]);

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
          sm={11}
          md={12}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              mb: 6,
              py: {xs: 6, sm:  4, lg: 6},
            }}
          >
            <Typography variant="overline"  sx={{mb: 3}}>
              {definedSteps[i].subtitle}
            </Typography>
            <Divider variant="fullWidth" component="div" role="presentation" sx={{ whiteSpace: {xs: "wrap", md: "pre-wrap"} }}>
              <Typography variant="body2" sx={{ textAlign: "center", width: { sm: 400} }}>
                {definedSteps[i].title}
              </Typography>
            </Divider>
          </Box>
        </Grid>)
        
      }
      if (currentItem._type === "accordionTile") {
        acc++
        steps.push(
        <Grid
          key={`step-${i}`}
          item
          xs={12}
          
          sm={currentItem.tileOrientation === true ? 12 : 6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          
            <AccordionTile
              tileColor={definedTileColor}
              tile={currentItem }
              previewData={previewData}
              index={i}
              displayNumber={[acc ]}
              sanityConfig={sanityConfig}
              pieSegments={pieSegments && pieSegments.length}
            />
         
        </Grid>
        )
      }
      if (currentItem._type === "stepTile") {
        acc++
        steps.push(
        <Grid
          key={`step-${i}`}
          item
          xs={12}
          
          sm={currentItem.tileOrientation === true ? 12 : 6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          
            <StepsTile
              tileColor={definedTileColor}
              tile={currentItem }
              previewData={previewData}
              index={i}
              displayNumber={[acc ]}
              sanityConfig={sanityConfig}
              pieSegments={pieSegments && pieSegments.length}
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
        justifyContent={definedTextAlign}
        sx={{
          pb: { xs: 10, md: 15 },
        }}
      >
        <Grid item xs={12} md={7}>
          {subtitle && (
            <Typography
              variant="overline"
              color="primary.main"
              sx={{
                textAlign: definedTextAlign === "flex-start" ? "left" : definedTextAlign,
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
              textAlign={definedTextAlign}
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
              textAlign={definedTextAlign}
              value={definedText}
            />
          )}
        </Grid>
      </Grid>
      <Container disableGutters={mobile ? true : false} maxWidth="lg" style={{ position: "relative" }}>
        <Grid
          ref={referenceRef}
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
          ref={targetRef}
            sx={{
              position: "absolute",
              top: 24,
              left: {xs: -8, sm: 8, md: -41},
              mt: 0,
              mb: 0,
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
                minHeight: height,
              }}
            >
              <motion.div
                key={lineRef.current}
                className="line"
                style={{
                  position: "relative",
                  width: 8,
                  backgroundColor: contrastColour(tileColor).line.hex,
                  transformOrigin: "0% 0%",
                  scaleY: scaleY,
                  height: "100%"
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
    _rawText(resolveReferences: { maxDepth: 10 })
    topPadding
    tileColor {
      value
      label
    }
    textAlign
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
        secondTitle
        tileOrientation
      }
      ... on SanityAccordionTile {
        _key
        _type
        _rawText(resolveReferences: {maxDepth: 10})
        title
      }
    }
  }
`
