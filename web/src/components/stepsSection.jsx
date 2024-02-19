import React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Grid,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { StepsTile } from "./stepsTile"
import {RenderPortableText} from '../components/renderPortableText'

export const StepsSection = props => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))
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

  const definedTitle = previewData && previewData.title || _rawTitle
  const definedText = previewData && previewData.text || _rawText
  const definedSteps = previewData && previewData.steps || steps
  debugger
  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: { xs: theme.spacing(0), md: theme.spacing(15) },
        pt: topPadding ? 0 : { xs: theme.spacing(15), md: theme.spacing(15) },
      }}
    >
      <Grid
        container
        rowSpacing={6}
        justifyContent="center"
        sx={{
          pb: {xs: 10, md: 15},
        }}
      >
        <Grid item xs={12} sm={12} md={12}>
          {subtitle && <Typography variant="overline" sx={{
            textAlign: textAlign,
          }}>{subtitle}</Typography>}
        {definedTitle && (
              <RenderPortableText
                previewData={previewData}
                sanityConfig={sanityConfig}
                variant={false}
                textAlign={textAlign}
                value={
                  definedTitle
                }
              />
            )}
          {definedText && (
              <RenderPortableText
                previewData={previewData}
                sanityConfig={sanityConfig}
                variant={false}
                textAlign={textAlign}
                value={
                  definedText
                }
              />
            )}
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={6}
        columnSpacing={{ xs: 13, sm: 6, md: 16 }}
        sx={{
          pt: theme.spacing(6),
          px: { xs: 0, sm: theme.spacing(12) },
        }}
      >
        
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          { definedSteps &&
             definedSteps.map((tile, i) => {
              return (
                <StepsTile
                  node={tile}
                  previewData
                  sanityConfig
                />
              )
            })}
        </Grid>
      </Grid>
    </Container>
  )
}

export const query = graphql`
fragment StepsSectionFragment on SanityStepsSection {
  _key
  _type
  _rawTitle(resolveReferences: {maxDepth: 10})
  topPadding
  tileColor {
    value
    label
  }
  textAlign
  _rawText(resolveReferences: {maxDepth: 10})
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
      _rawTitle(resolveReferences: {maxDepth: 10})
      _rawDescription(resolveReferences: {maxDepth: 10})
      _rawInvolves(resolveReferences: {maxDepth: 10})
    }
  }
}
`
