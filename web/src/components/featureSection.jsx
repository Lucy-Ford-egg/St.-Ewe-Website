import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-plugin-sanity-image"
import {urlFor} from "../utils/imageHelpers"
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  useTheme,
} from "@mui/material"
import { Icons } from "../components/icons"
import { ButtonFormat } from "./buttonFormat"

export const FeatureSection = props => {
  const theme = useTheme()
  const {
    title,
    icon,
    text,
    image,
    linkGroup,
    previewData,
    sanityConfig,
    mirror,
    topPadding,
    subtitle,
    links,
    highlighted,
  } = props

  const textColour = highlighted
    ? theme.palette.background.default
    : theme.palette.text.main
  const boxPx = highlighted
    ? { xs: theme.spacing(1), md: theme.spacing(3) }
    : false
  const boxPy = highlighted
    ? { xs: theme.spacing(6), md: theme.spacing(10) }
    : false

  return (
    <Container
      maxWidth={highlighted ? "fluid" : "xl"}
      sx={{
        pb: {
          xs: theme.spacing(10),
          md: highlighted ? theme.spacing(16) : theme.spacing(10),
        },
        pt: topPadding
          ? 0
          : {
              xs: theme.spacing(10),
              md: highlighted ? theme.spacing(16) : theme.spacing(10),
            },
        mt: topPadding
          ? 0
          : highlighted ? theme.spacing(10) : 0,
        backgroundColor: highlighted
          ? theme.palette.highlight.main
          : "transparent",
      }}
    >
      <Box
        sx={{
          maxWidth: theme.breakpoints.values.xl,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            py: boxPy,
            mx: boxPx,
            px: { xs: highlighted ? 6 : 0, md: 0 },
            border: highlighted
              ? `1px solid ${theme.palette.background.default}`
              : `unset`,
          }}
        >
          <Grid
            container
            rowSpacing={{ xs: 6, sm: 6, md: 6 }}
            columnSpacing={{ xs: 13, sm: 13, md: 13 }}
            direction={mirror ? "row-reverse" : "row"}
            sx={{
              px: { xs: 0, sm: theme.spacing(12) },
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sm={12} md={6}>
              <Box>
              {image && (
                  <Image
                  // pass asset, hotspot, and crop fields
                  crop={
                    (previewData && previewData?.image?.crop) ||
                    image?.crop
                  }
                  hotspot={
                    (previewData && previewData?.image?.hotspot) ||
                    image?.hotspot
                  }
                 
                   asset={
                    (previewData && previewData.image && previewData.image?._ref && urlFor(previewData.image).width(200).url()) || image.asset
                  }
        
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    flexGrow: 1,
                    minHeight: "100%",
                    gridColumn: "1/25",
                    gridRow: "1/auto",
                    borderRadius: theme.spacing(2),
                  }}
                />
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ pb: highlighted ? theme.spacing(10) : `unset` }}>
                {icon && (
                  <Icons
                    type={
                      previewData && previewData.icon ? previewData.icon : icon
                    }
                  />
                )}

                {subtitle && (
                  <Typography
                    color={textColour}
                    sx={{ mt: { xs: 4, md: 4 } }}
                    variant="overline"
                    component="p"
                  >
                    {previewData && previewData.subtitle
                      ? previewData.subtitle
                      : subtitle}
                  </Typography>
                )}

                <Typography color={textColour} variant="h2">
                  {previewData && previewData.title ? previewData.title : title}
                </Typography>
                {text && (
                  <Divider
                    component="div"
                    role="presentation"
                    sx={{
                      borderColor: highlighted
                        ? theme.palette.background.default
                        : theme.palette.primary.main,
                      maxWidth: 305,
                    }}
                  />
                )}
                <Typography
                  color={textColour}
                  sx={{ py: { xs: 5, md: 6 } }}
                  variant="body1"
                >
                  {previewData && previewData.text ? previewData.text : text}
                </Typography>

                <Box
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    flexBasis: "100%",
                    columnGap: 6,
                  }}
                >
                  {links &&
                    links.map((node, i) => {
                      return (
                        <ButtonFormat
                          variant={i === 0 ? "contained" : "outlined"}
                          color={i === 0 ? "primary" : highlighted ? "secondary" : "tertiary"}
                          node={
                            previewData && previewData.node
                              ? previewData.node
                              : node
                          }
                          sx={{}}
                        />
                      )
                    })}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export const query = graphql`
  fragment FeatureSectionFragment on SanityFeatureSection {
    _key
    _type
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
    icon
    subtitle
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
    mirror
    topPadding
    highlighted
  }
`
