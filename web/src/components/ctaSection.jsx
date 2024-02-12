import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { Container, Box, useTheme, Typography, Grid } from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { ButtonFormat } from "./buttonFormat"

export const CtaSection = props => {
  const {
    title,
    text,
    image,
    previewData,
    sanityConfig,
    overlay,
    align,
    links,
    topPadding,
  } = props

  const theme = useTheme()

  return (
    <Container
      maxWidth="false"
      disableGutters="true"
      sx={{
        //backgroundColor: theme.palette.background.main,
        pt: topPadding
          ? 0
          : {
              xs: theme.spacing(10),
              md: theme.spacing(14),
            },
        pb: {
          xs: theme.spacing(0),
          md: theme.spacing(14),
        },
      }}
    >
      <Container maxWidth="xl"
        sx={{
          display: { xs: "grid", md: "grid" },
          gridTemplateColumns: "repeat(24,1fr)",
          alignItems: "center",
          width: "100%",
        }}
      >
        {image && (
          <Image
            // pass asset, hotspot, and crop fields
            crop={(previewData && previewData?.image?.crop) || image?.crop}
            hotspot={
              (previewData && previewData?.image?.hotspot) || image?.hotspot
            }
            asset={
              (previewData &&
                previewData.image &&
                previewData.image?._ref &&
                urlFor(previewData.image).width(200).url()) ||
              image.asset
            }
            width={1330}
            height={515}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              flexGrow: 1,
              minHeight: "100%",
              gridColumn: "1/25",
              gridRow: "1/auto",
            }}
          />
        )}

        {overlay && (
          <Box
            className="overlay"
            sx={{
              width: "100%",
              height: "100%",
              minHeight: "100%",
              gridColumn: "1/25",
              gridRow: "1/auto",
              position: "relative",
              zIndex: 1,
              backgroundColor: `rgba(0,40,86, ${overlay})`,
            }}
          />
        )}

        <Box
          sx={{
            display: "grid",
            gridColumn: "1/25",
            gridRow: "1/auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Container
            maxWidth="xl"
            
          >
            <Box>
              <Grid
                container
                justifyContent={align === "left" ? "flex-start" : "center"}
              >
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: align === "left" ? "flex-start" : "center",
                      px: { xs: 4, md: 11 },
                      py: { xs: 8, md: 11 },
                    }}
                  >
                    <Typography
                      color="white.main"
                      align={align === "left" ? "left" : "center"}
                      sx={{ my: { xs: 0, md: 5 } }}
                      variant="h2"
                    >
                      {previewData && previewData.title
                        ? previewData.title
                        : title}
                    </Typography>

                    <Typography
                      color="white.main"
                      align={align === "left" ? "left" : "center"}
                      sx={{ my: { xs: 0, md: 5 } }}
                      variant="body1"
                    >
                      {previewData && previewData.text
                        ? previewData.text
                        : text}
                    </Typography>

                    <Box
                      sx={{
                        width: "fit-content",
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                        flexDirection: "row",
                        flexWrap: { xs: "wrap", md: "no-wrap" },
                        flexBasis: "100%",
                        columnGap: 6,
                        rowGap: 6,
                        py: 2,
                      }}
                    >
                      {links &&
                        links.map((node, i) => {
                          return (
                            <ButtonFormat
                              variant={i === 0 ? "contained" : "outlined"}
                              color={i === 0 ? "primary" : "secondary"}
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
          </Container>
        </Box>
      </Container>
    </Container>
  )
}

export const query = graphql`
  fragment CtaSectionFragment on SanityCtaSection {
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
    align: leftAlign
    topPadding
    overlay
  }
`
