import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
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

export const BenifitsSection = props => {
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
    subItems,
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
        mt: topPadding ? 0 : highlighted ? theme.spacing(10) : 0,
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
                <Grid container columnSpacing={4} sx={{pt: {xs: 4, sm: 0}}}>
                  {subItems &&
                    subItems.map((subItem, i) => {
                      return (
                        <Grid item xs={6} md={6}>
                          {subItem.icon && (
                            
                              <Icons
                                type={
                                  previewData && previewData?.subItem?.icon
                                    ? previewData?.subItem.icon
                                    : subItem.icon
                                }
                              />
                               )}
                              <Typography color={textColour} variant="h5">
                                {previewData && previewData?.subItem?.title
                                  ? previewData.subItem.title
                                  : subItem.title}
                              </Typography>
                              <Typography
                                color={textColour}
                                sx={{ py: { xs: 5, md: 6 } }}
                                variant="body1"
                              >
                                {previewData && previewData?.subItem?.text
                                  ? previewData.subItem.text
                                  : subItem.text}
                              </Typography>
                            
                         
                        </Grid>
                      )
                    })}
                </Grid>
                <Box
                  sx={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    flexBasis: "100%",
                    columnGap: 6,
                    pt: {xs: 4, sm: 0}
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
  fragment BenifitsSectionFragment on SanityBenifitsSection {
    _key
    _type
    image {
      asset {
        gatsbyImageData
      }
    }
    icon
    subtitle
    title
    text
    subItems: subItem {
      title
      text
      icon
    }
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
