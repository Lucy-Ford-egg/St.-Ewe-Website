import React from "react"
import { graphql } from "gatsby"
import { textAlignToJustifyContent } from "../utils/alignment"
import {
  Container,
  Typography,
  Box,
  useTheme,
  Grid,
  Divider,
} from "@mui/material"
import { Map } from "./map"
import { RenderPortableText } from "../components/renderPortableText"

export const LocationSection = props => {
  const theme = useTheme()
  const {
    previewData,
    sanityConfig,
    subtitle,
    _rawTitle,
    _rawText,
    geopoint,
    topPadding,
    textAlign,
  } = props

  const definedTopPadding =
    (previewData && previewData?.topPadding) || topPadding
  const definedSubtitle = (previewData && previewData?.subtitle) || subtitle
  const definedTitle = (previewData && previewData?.title) || _rawTitle
  const definedText = (previewData && previewData?.text) || _rawText

  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: { xs: theme.spacing(10), md: theme.spacing(10) },
        pt: definedTopPadding
          ? {
              xs: theme.spacing(10),
              md: theme.spacing(0),
            }
          : { xs: theme.spacing(10), md: theme.spacing(10) },
      }}
    >
      <Grid
        container
        rowSpacing={6}
        justifyContent="center"
        sx={{
          pb: { xs: 10, md: 15 },
        }}
      >
        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
          {definedSubtitle && (
            <Typography
              align={textAlign}
              sx={{ mt: { xs: 4, md: 4 } }}
              variant="overline"
              component="p"
            >
              {definedSubtitle}
            </Typography>
          )}
          {definedTitle && (
            <RenderPortableText
              previewData={definedTitle}
              sanityConfig={sanityConfig}
              setAsHeading={false}
              value={definedTitle}
            />
          )}
          {definedText && (
            <RenderPortableText
              previewData={definedText}
              sanityConfig={sanityConfig}
              setAsHeading={false}
              value={definedText}
            />
          )}
        </Grid>
      </Grid>

      {/* <Map geopoint={geopoint}/> */}
    </Container>
  )
}

export const query = graphql`
  fragment LocationSectionFragment on SanityLocationSection {
    _key
    _type
    topPadding
    _rawText(resolveReferences: { maxDepth: 10 })
    _rawTitle(resolveReferences: { maxDepth: 10 })
    subtitle
    textAlign
  }
`
