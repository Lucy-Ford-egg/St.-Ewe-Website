import React from "react"
import { graphql } from "gatsby"
import { Container, Box, useTheme, Typography, Grid } from "@mui/material"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"

export const CtaSection = props => {
  const { title, text, image, previewData, sanityConfig, overlay, leftAlign } = props

  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.main,
        display: "grid",
        gridTemplateColumns: "repeat(24,1fr)",
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridColumn: "1/25",
          gridRow: "1/auto",
          height: '100%',
        }}
      >
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
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridColumn: "1/25",
          gridRow: "1/auto",
          position: "relative",
          zIndex: 1,
          py: {xs: 11, md: 0}
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                backgroundColor: "background.main",
                p: 11,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  color="text.main"
                  align="center"
                  sx={{ my: { xs: 5 } }}
                  variant="h2"
                >
                  {previewData && previewData.title ? previewData.title : title}
                </Typography>

                <Typography
                  color="text.main"
                  align="center"
                  sx={{ my: { xs: 5 } }}
                  variant="body1"
                >
                  {previewData && previewData.text ? previewData.text : text}
                </Typography>
               
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export const query = graphql`
  fragment CtaSectionFragment on SanityCtaSection {
    _key
    _type
    image {
      asset {
        gatsbyImageData(height: 467)
      }
    }
    title
    text
    links {
      link {
        internal {
          ... on SanityPage {
            id
            slug {
              current
            }
          }
          ... on SanityPost {
            id
            slug {
              current
            }
          }
        }
        external
      }
      text
    }
    leftAlign
    topPadding
    overlay
  }
`
