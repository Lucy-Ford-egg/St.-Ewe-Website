import React, { useState, useRef, useEffect } from "react"
import { graphql } from "gatsby"
import { motion, MotionConfig } from "framer-motion"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { textAlignToJustifyContent } from "../utils/alignment"
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  SvgIcon,
  Grid,
  Divider,
} from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity >= 1.
 */
const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

export const ImageCarouselSection = props => {
  const theme = useTheme()
  const {
    previewData,
    sanityConfig,
    images,
    topPadding,
  } = props
  const [slides, setSlides] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    setSlides(images)
  }, [])
  // useEffect(() => {
  //   setWidth(ref.current.getBoundingClientRect().width)
  // }, []) //empty dependency array so it only runs once at render
  
  let [index, setIndex] = useState(0)

  const sm = useMediaQuery("(max-width:640px)")
  // const md = useMediaQuery("(max-width:900px)")
  // const lg = useMediaQuery("(min-width:1200px)")

  return (
    <Container
      maxWidth={slides && slides.length === 1 ? false : false}
      disableGutters={sm || (slides && slides.length === 1) ? true : true}
      sx={{
        pb: { xs: theme.spacing(10), md: theme.spacing(10) },
        pt: topPadding
          ? {
              xs: theme.spacing(0),
              md: theme.spacing(0),
            }
          : { xs: theme.spacing(10), md: theme.spacing(10) },
      }}
    >
      {slides && slides.length >= 1 && (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(24, 1fr)",
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: "max-content",
                gridColumn: "1/25",
                gridRow: "1/auto",
              }}
            >
              <MotionConfig
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mx: "auto",
                    height: "max-content",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      height: "max-content",
                    }}
                  >
                    <motion.div
                      animate={{
                        x:
                          index === 0
                            ? `0`
                            : `-${(ref.current.offsetWidth + 20) * index}px`,
                      }}
                      style={{ display: "flex", columnGap: 20 }}
                      className={ref.current && ref.current.offsetWidth}
                    >
                      {slides &&
                        slides.map((image, i) => {
                          return (
                            <Box>
                              <Box
                                ref={ref}
                                sx={{
                                  width: { xs: 394, md: 1440 },
                                  height: { xs: 380, md: 581 },
                                }}
                              >
                                {image && (
                                  <Image
                                    // pass asset, hotspot, and crop fields
                                    crop={
                                      (previewData &&
                                        previewData?.images[i]?.crop) ||
                                      image[i]?.crop
                                    }
                                    hotspot={
                                      (previewData &&
                                        previewData?.images[i]?.hotspot) ||
                                      images[i]?.hotspot
                                    }
                                    asset={
                                      (previewData &&
                                        previewData?.images &&
                                        previewData.images[i]?._ref &&
                                        urlFor(previewData.images[i])
                                          .width(200)
                                          .url()) ||
                                      image.asset
                                    }
                                    style={{
                                      objectFit: "cover",
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                          )
                        })}
                    </motion.div>
                  </Box>
                </Box>
              </MotionConfig>
            </Box>
            {slides && slides.length > 1 && (
              <Box
                sx={{
                  gridColumn: "1/25",
                  gridRow: "1/auto",
                  height: "100%",
                  position: "relative",
                  zIndex: 1,
                  
                }}
              >
                <Container
                  maxWidth="lg"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    height: "100%",
                  }}
                >
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    sx={{ backgroundColor: theme.palette.white.main }}
                    onClick={() => setIndex(index - 1)}
                    disabled={index === 0 ? true : false}
                  >
                    <ArrowBackIcon color="primary" />
                  </IconButton>

                  <IconButton
                    aria-label="delete"
                    color="primary"
                    sx={{ backgroundColor: theme.palette.white.main }}
                    onClick={() => setIndex(index + 1)}
                    disabled={index === images.length - 1 ? true : false}
                  >
                    <ArrowForwardIcon color="primary" />
                  </IconButton>
                </Container>
              </Box>
            )}
          </Box>

          {slides && slides.length > 1 && (
            <Box
              sx={{
                width: "100%",
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                //px: { xs: 2, sm: 2, md: 8 },
              }}
            >
              <Container
                maxWidth="xl"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  sx={{ position: "relative" }}
                >
                  {slides &&
                    slides.length >= 1 &&
                    slides.map((dot, dotIndex) => {
                      let dotColour =
                        dotIndex === index
                          ? theme.palette.primary.main
                          : theme.palette.primary.light
                      return (
                        <SvgIcon
                          color={dotColour}
                          key={`dot-${dotIndex}`}
                          sx={{ width: 22, height: 22 }}
                        >
                          <circle
                            id="dot"
                            cx="5.5"
                            cy="5.5"
                            r="5.5"
                            fill={dotColour}
                          />
                        </SvgIcon>
                      )
                    })}
                </Box>
              </Container>
            </Box>
          )}
        </Box>
      )}
      {slides && slides.length === 0 && (
        slides && (
          <Image
            // pass asset, hotspot, and crop fields
            crop={
              (previewData &&
                previewData?.slides[0]?.crop) ||
              slides[0]?.crop
            }
            hotspot={
              (previewData &&
                previewData?.slides[0]?.hotspot) ||
              slides[0]?.hotspot
            }
            asset={
              (previewData &&
                previewData?.slides &&
                previewData.slides[0]?._ref &&
                urlFor(previewData.slides[0])
                  .width(200)
                  .url()) ||
              slides[0].asset
            }
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        )
      )}
    </Container>
  )
}

export const query = graphql`
  fragment ImageCarouselSectionFragment on SanityImageCarouselSection {
    _key
    _type
    images {
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
  }
`
