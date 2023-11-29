import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { Container, Box, useTheme, Typography, Grid } from "@mui/material"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { ButtonFormat } from "./buttonFormat"

export const CtaSection = props => {
  const {
    title,
    text,
    image,
    previewData,
    sanityConfig,
    overlay,
    leftAlign,
    links,
    topPadding,
  } = props

  const [align, setAlign] = useState(false)

  const theme = useTheme()

  useEffect(() => {
    setAlign(leftAlign)
  }, [leftAlign])

  return (
    <Container
      maxWidth="false"
      disableGutters="true"
      sx={{
        backgroundColor: theme.palette.background.main,
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
      <Box
        sx={{
          display: { xs: "grid", md: "grid" },
          gridTemplateColumns: "repeat(24,1fr)",
          alignItems: "center",
          width: "100%",
        }}
      >
        {align === true && image && (
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
              height: "100%",
              minHeight: "100%",
              gridColumn: "1/25",
              gridRow: "1/auto",
              width: "100%",
            }}
          />
        )}

        {align === false && image && (
          <Box
            sx={{
              display: "grid",
              gridColumn: "1/25",
              gridRow: "1/auto",
              height: "100%",
              width: "100%",
            }}
          >
            <Container maxWidth="xl">
              <Box
                sx={{
                  display: "grid",
                  height: "100%",
                  width: "100%",
                }}
              >
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
                    height: "100%",
                    minHeight: "100%",
                    gridColumn: "1/25",
                    gridRow: "1/auto",
                  }}
                />
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
                      backgroundColor: `rgba(36,36,36, ${overlay})`,
                    }}
                  />
                )}
              </Box>
            </Container>
          </Box>
        )}

        <Box
          sx={{
            display: "grid",
            gridColumn: "1/25",
            gridRow: "1/auto",
            position: "relative",
            zIndex: 1,
            py: { xs: !leftAlign ? 0 : 11, md: 0 },
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              py: leftAlign === true ? { xs: 0, md: 14 } : 8,
            }}
          >
            <Box
              sx={{
                border:
                  leftAlign === true
                    ? `1px solid ${theme.palette.background.main}`
                    : `unset`,
              }}
            >
              <Grid
                container
                justifyContent={leftAlign === true ? "flex-start" : "center"}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: leftAlign === true ? "flex-start" : "center",
                      px: { xs: 4, md: 11 },
                      py: { xs: 8, md: 11 },
                    }}
                  >
                    <Typography
                      color="background.main"
                      align={leftAlign === true ? "left" : "center"}
                      sx={{ my: { xs: 0, md: 5 } }}
                      variant="h2"
                    >
                      {previewData && previewData.title
                        ? previewData.title
                        : title}
                    </Typography>

                    <Typography
                      color="background.main"
                      align={leftAlign === true ? "left" : "center"}
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
      </Box>
    </Container>
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
