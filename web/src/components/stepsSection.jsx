import React, {useRef} from "react"
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
    ref: lineRef,
    offset: ["start end", "end end"]
  });
  const scaleY = useSpring(scrollYProgress)

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
      <Container maxWidth="lg" ref={lineRef}>
        <Grid
          container
          rowSpacing={6}
          columnSpacing={{ xs: 13, sm: 6, md: 6 }}
          sx={{
            pt: theme.spacing(6),
            justifyContent: "center",
            display: "flex",
            position: "relative",
          }}
          
        >
          <Box sx={{ position: "absolute", top: 41, left: -41 }}>
            <motion.div
              style={{
                backgroundColor: "red",
                scaleY: scaleY,
                width: "10px",
                transformOrigin: "0%",
                height: 10,
              }}
            />
          </Box>
          {definedSteps &&
            definedSteps.map((tile, i) => {
              return (
                <Grid
                  key={`step-${i}`}
                  item
                  xs={12}
                  sm={12}
                  md={tile._type === "stepDivider" ? 12 : 6}
                  sx={{ display: "flex", flexDirection: "column" }}
                  
                >
                  {tile._type !== "stepDivider" && (
                    <StepsTile
                      tileColor={defineTileColor}
                      tile={tile}
                      previewData={previewData}
                      index={i}
                      sanityConfig={sanityConfig}
                    />
                  )}
                  {tile._type === "stepDivider" && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        mb: 6,
                        py: 6,
                      }}
                    >
                      <Typography variant="overline">
                        {previewData?.steps[i].tile?.subtitle || tile.subtitle}
                      </Typography>
                      <Divider
                        component="div"
                        role="presentation"
                        variant="middle"
                      >
                        <Typography
                          variant="body2"
                          sx={{ textAlign: "center" }}
                        >
                          {previewData?.steps[i].tile?.title || tile.title}
                        </Typography>
                      </Divider>
                    </Box>
                  )}
                </Grid>
              )
            })}
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
      }
    }
  }
`
