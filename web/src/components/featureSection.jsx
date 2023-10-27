import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { Container, Grid, Typography, Box, Divider, useTheme } from "@mui/material"

export const FeatureSection = props => {
  const theme = useTheme()
  const {
    title,
    text,
    image,
    linkGroup,
    previewData,
    sanityConfig,
    mirror,
    topPadding,
    subtitle
  } = props

  return (
    <Container maxWidth="xl" sx={{pb: theme.spacing(10), pt: topPadding ? 0 : theme.spacing(10)}}>
      <Grid container columnSpacing={13} direction={mirror ? 'row-reverse' : 'row'} sx={{
        px: {xs: 0, sm: theme.spacing(12)}, alignItems: 'center'
      }}>
        <Grid item xs={12} sm={12} md={6}>
          <Box >
            {image && (
              <GatsbyImage
                image={
                  getGatsbyImageData(
                    previewData?.image?.asset?._ref,
                    { maxWidth: 1440 },
                    sanityConfig,
                  ) || getImage(image?.asset)
                }
                layout="constrained"
                aspectRatio={133 / 8}
                alt={image.asset?.altText}
                style={{
                  minHeight: "100%",
                  gridColumn: "1/25",
                  gridRow: "1/auto",
                  borderRadius: theme.spacing(2)
                }}
                
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box>
            <Typography
              color="text.primary"
              sx={{ my: { xs: 5 } }}
              variant="h2"
            >
              {previewData && previewData.title ? previewData.title : title}
            </Typography>
            <Divider component="div" role="presentation" sx={{backgroundColor: theme.palette.primary.main, maxWidth: 305}}/>
            <Typography
              color="text.primary"
              sx={{  my: { xs: 5 } }}
              variant="body1"
            >
              {previewData && previewData.text ? previewData.text : text}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export const query = graphql`
  fragment FeatureSectionFragment on SanityFeatureSection {
    _key
    _type
    mirror
    subtitle
    text
    title
    image {
      asset {
        gatsbyImageData
      }
    }
    topPadding
  }
`
