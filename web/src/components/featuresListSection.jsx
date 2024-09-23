import React from "react"
import { graphql } from "gatsby"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { FeaturesTile } from "./featuresTile"
import { RenderPortableText } from "../components/renderPortableText"

export const FeaturesListSection = props => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))
  const {
    _rawTitle,
    _rawText,
    previewData,
    sanityConfig,
    topPadding,
    featuresTile,
    image,
    _type,
  } = props

  const definedTopPadding =
    (previewData && _type === previewData?._type && previewData?.topPadding) || topPadding
  const definedTitle = (previewData && _type === previewData?._type && previewData?.title) || _rawTitle
  const definedText = (previewData && _type === previewData?._type && previewData?.text) || _rawText
  const definedImage = (previewData && _type === previewData?._type && previewData?.image) || image
  const definedFeaturesTile =
    (previewData && _type === previewData?._type && previewData?.featuresTile) || featuresTile
  // const definedMirror = (previewData && previewData.mirror) || mirror

  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: { xs: theme.spacing(0), md: theme.spacing(15) },
        pt: definedTopPadding
          ? 0
          : { xs: theme.spacing(15), md: theme.spacing(15) },
      }}
    >
      <Grid
        container
        rowSpacing={{xs:2, md:6}}
        justifyContent="center"
        sx={{
          pb: { xs: 0, md: 15 },
        }}
      >
        <Box
          sx={{
            opacity: 0.3,
            maxWidth: {xs:70, md:165},
            svg:{
              width:"100%",
              height:"auto"
            }
          }}
        >
         
        </Box>
        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
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

      <Grid
        container
        rowSpacing={{xs: 6, md: 0}}
        columnSpacing={{ xs: 13, sm: 13, md: 16 }}
        sx={{
          pt: theme.spacing(6),
          px: { xs: 0, md: theme.spacing(12) },
          
        }}
      >
        
        <Grid item xs={12} sm={6} md={6}>
          {definedImage && (
            <Image
              // pass asset, hotspot, and crop fields
              crop={definedImage.crop}
              hotspot={definedImage?.hotspot}
              asset={
                (definedImage?._ref && urlFor(definedImage).width(582).url()) ||
                definedImage.asset
              }
              width={582}
              height={mobile ? 582 : 1016}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                flexGrow: 1,
                minHeight: "100%",
              }}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {definedFeaturesTile &&
            definedFeaturesTile.map((tile, i) => {
              return (
                <FeaturesTile
                  key={tile._key}
                  node={tile}
                  index={i}
                  previewData={previewData}
                />
              )
            })}
        </Grid>
      </Grid>
    </Container>
  )
}

export const query = graphql`
  fragment FeaturesListSectionFragment on SanityFeaturesListSection {
    _key
    _type
    _rawTitle(resolveReferences: { maxDepth: 10 })
    _rawText(resolveReferences: { maxDepth: 10 })
    image {
      asset {
        _id
        gatsbyImageData
      }
      hotspot {
        x
        y
        width
        height
      }
      crop {
        bottom
        left
        right
        top
      }
    }
    topPadding
    featuresTile {
      title
      _key
      _rawText(resolveReferences: { maxDepth: 10 })
      link {
        text
        link {
          external
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
                    _type
                  }
                  categories {
                    name
                    slug{
                      current
                    }
                  }
            }
          }
        }
      }
    }
  }
`
