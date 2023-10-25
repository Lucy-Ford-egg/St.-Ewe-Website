import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { Container, Typography, Box } from "@mui/material"

export const HeaderSectionAccommodationSearch = props => {
  const { title, text, image, linkGroup, previewData, sanityConfig, showSearch } = props

  return (
    <Container
      maxWidth="fluid"
      disableGutters
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(24, 1fr)",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: 639,
        maxHeight: 639,
      }}
    >
      <Container maxWidth="xl"
        sx={{
          gridColumn: "1/25",
          gridRow: "1/auto",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{
          maxWidth: 749,
        }}>
        <Typography
          color="white.main"
          align="center"
          sx={{ textAlign: "center", my: { xs: 5 } }}
          variant="h1"
        >
          {previewData && previewData.title ? previewData.title : title}
        </Typography>
        <Typography
          color="white.main"
          align="center"
          sx={{ textAlign: "center", my: { xs: 5 } }}
          variant="body1"
        >
          {previewData && previewData.text ? previewData.text : text}
        </Typography>
        </Box>
      </Container>

      {showSearch && <Box>Hello</Box>}

      <Box
        sx={{
          gridColumn: "1/25",
          gridRow: "1/auto",
          display: "grid",
          gridTemplateColumns: "repeat(24, 1fr)",
          height: "100%",
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
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            gridColumn: "1/25",
            gridRow: "1/auto",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
      </Box>
    </Container>
  )
}

export const query = graphql`
  fragment HeaderSectionAccommodationSearchFragment on SanityHeaderSectionAccommodationSearch {
    _key
    _type
    text
    title
    showSearch
    image {
      asset {
        _id
        gatsbyImage(width: 1440, height: 639)
        altText
      }
    }
  }
`
