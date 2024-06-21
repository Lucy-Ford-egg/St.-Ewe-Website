import React, { useState } from "react"
import { graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "popmotion"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { RenderPortableText } from "../components/renderPortableText"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import SvgIcon from "@mui/material/SvgIcon"
import Divider from "@mui/material/Divider"
import { useTheme } from "@mui/material"

import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Spiro } from "../components/spiro"
import { contrastColour } from "../utils/contrastColour"

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity
}

export const TestimonialSection = props => {
  const theme = useTheme()
  const {
    previewData,
    sanityConfig,
    testimonialTiles,
    topPadding,
    backgroundColor,
    _type,
  } = props

  const [[page, direction], setPage] = useState([0, 0])

  const variants = {
    enter: direction => {
      return {
        opacity: 0,
        display: "none",
      }
    },
    center: {
      opacity: 1,
      display: "block",
    },
    exit: direction => {
      return {
        opacity: 0,
        display: "none",
      }
    },
  }

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const definedTestimonialTiles =
    (previewData && previewData?.testimonialTiles) || testimonialTiles

  const slideIndex = wrap(0, definedTestimonialTiles?.length, page)

  const paginate = newDirection => {
    setPage([page + newDirection, newDirection])
  }

  const definedPreviewInternalAvatar =
    (previewData &&
      _type === previewData?._type &&
      previewData?.[slideIndex]?.cite?.teamMemberCite?.image) ||
    (testimonialTiles?.[slideIndex] &&
      testimonialTiles?.[slideIndex]?.cite?.teamMemberCite?.image)

  const definedPreviewExternalAvatar =
    (previewData &&
      _type === previewData?._type &&
      previewData?.[slideIndex]?.cite?.externalCite?.image) ||
    (testimonialTiles?.[slideIndex] &&
      testimonialTiles?.[slideIndex]?.cite?.externalCite?.image)

  const definedBackgroundColor =
    (previewData &&
      _type === previewData?._type &&
      previewData?.backgroundColor) ||
    backgroundColor

  const definedTopPadding =
    (previewData && _type === previewData?._type && previewData?.topPadding) ||
    topPadding

  const definedQuoteText =
    (previewData &&
      _type === previewData?._type &&
      previewData?.testimonialTiles &&
      previewData?.testimonialTiles[slideIndex] &&
      previewData?.testimonialTiles[slideIndex]._rawQuoteText) ||
    (testimonialTiles?.[slideIndex] &&
      testimonialTiles?.[slideIndex]._rawQuoteText)

  const definedInternalQuoteCite =
    (previewData &&
      _type === previewData?._type &&
      previewData?.testimonialTiles &&
      previewData?.testimonialTiles?.[slideIndex]?.cite?.teamMemberCite
        ?.name) ||
    (testimonialTiles?.[slideIndex] &&
      testimonialTiles?.[slideIndex]?.cite?.teamMemberCite?.name)

  const definedExternalQuoteCite =
    (previewData &&
      _type === previewData?._type &&
      previewData?.testimonialTiles &&
      previewData?.testimonialTiles?.[slideIndex]?.cite?.externalCite
        ?.citeName) ||
    (testimonialTiles?.[slideIndex] &&
      testimonialTiles?.[slideIndex]?.cite?.externalCite?.citeName)

  const definedInternalQuotePosition =
    (previewData &&
      _type === previewData?._type &&
      previewData?.testimonialTiles &&
      previewData?.testimonialTiles?.[slideIndex]?.cite?.teamMemberCite
        ?.position) ||
    (testimonialTiles?.[slideIndex] &&
      testimonialTiles?.[slideIndex]?.cite?.teamMemberCite?.position)

  const definedExternalQuotePosition =
    (previewData &&
      _type === previewData?._type &&
      previewData?.testimonialTiles &&
      previewData?.testimonialTiles?.[slideIndex]?.cite?.externalCite
        ?.citePosition) ||
    (testimonialTiles?.[slideIndex] &&
      testimonialTiles?.[slideIndex]?.cite?.externalCite?.citeLocation)

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: definedBackgroundColor?.value,
        overflowX: "hidden",
        mb: { xs: theme.spacing(16), md: theme.spacing(16) },
        mt: definedTopPadding
          ? {
              xs: theme.spacing(16),
              md: theme.spacing(0),
            }
          : { xs: theme.spacing(16), md: theme.spacing(16) },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: "unset", sm: "50%" },
          bottom: { xs: 0, sm: "unset" },
          transform: {
            xs: "translateX(-30px) rotate(180deg)",
            sm: "translateX(-150px) translateY(-50%) rotate(180deg)",
            md: "translateY(-50%)  rotate(180deg)",
          },
          left: 0,
          width: { xs: "85px", sm: "auto" },
          zIndex: 0,
          opacity: contrastColour(definedBackgroundColor)?.spiro?.opacity,
          svg: {
            width: "100%",
            height: "auto",
            path: {
              stroke: contrastColour(definedBackgroundColor)?.spiro?.fill,
            },
          },
        }}
      >
        <Spiro />
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: theme.spacing(16), md: theme.spacing(16) },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(24, 1fr)",
            position: "relative",
            pb: { xs: 0, md: 6 },
          }}
        >
          <Box
            sx={{
              position: "relative",
              minHeight: { xs: 680, sm: 450, md: 485 },
              gridColumn: "1/25",
              gridRow: "1/auto",
              overflow: "hidden",
              transition: "all 0.2s ease-in-out 0s",
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.1 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                style={{ height: "100%" }}
              >
                <Container
                  maxWidth="md"
                  className="slide"
                  sx={{
                    position: {xs: "absolute", sm: "absolute"},
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                   
                    overflow: "hidden",
                    transition: "all 0.2s ease-in-out 0s",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {definedQuoteText && (
                      <Box
                        sx={{
                          color: contrastColour(definedBackgroundColor)
                            .textColour,
                          py: 6,
                          textAlign: "center",
                        }}
                      >
                        <RenderPortableText
                          previewData={definedQuoteText}
                          sanityConfig={sanityConfig}
                          setAsHeading="h3"
                          value={definedQuoteText}
                        />
                      </Box>
                    )}

                    <Divider
                      sx={{
                        display: "flex",
                        my: 10,
                        width: "5.625rem",
                        borderColor: contrastColour(definedBackgroundColor)
                          .divider.hex,
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        maxWidth: { xs: "60vw", md: "unset" },
                        position: "relative",
                      }}
                    >
                      {
                        // Internal
                        definedPreviewInternalAvatar && (
                          <Box
                            sx={{
                              "&:after": {
                                content: "''",
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                right: 0,
                                left: 0,
                                width: 56,
                                height: 56,
                                borderRadius: 1000,
                                background: "rgba(0,40,86,0.5)",
                                border: `1px solid ${contrastColour(definedBackgroundColor).divider.hex}`,
                              },
                            }}
                          >
                            <Image
                              crop={definedPreviewInternalAvatar?.crop}
                              hotspot={definedPreviewInternalAvatar?.hotspot}
                              asset={
                                (definedPreviewInternalAvatar._ref &&
                                  urlFor(definedPreviewInternalAvatar)
                                    .width(100)
                                    .url()) ||
                                definedPreviewInternalAvatar.asset
                              }
                              // tell Sanity how large to make the image (does not set any CSS)
                              width={100}
                              // style it how you want it
                              style={{
                                width: 56,
                                height: 56,
                                objectFit: "cover",
                                borderRadius: 1000,
                                border: `1px solid ${contrastColour(definedBackgroundColor).divider.hex}`,
                                filter: "grayscale(1)",
                              }}
                            />
                          </Box>
                        )
                      }
                      {
                        // External
                        definedPreviewExternalAvatar && (
                          <Box
                            sx={{
                              "&:after": {
                                content: "''",
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                right: 0,
                                left: 0,
                                width: 56,
                                height: 56,
                                borderRadius: 1000,
                                background: "rgba(0,40,86,0.5)",
                                border: `1px solid ${contrastColour(definedBackgroundColor).divider.hex}`,
                              },
                            }}
                          >
                            <Image
                              // pass asset, hotspot, and crop fields
                              // {...testimonialTiles[slideIndex].image}
                              crop={definedPreviewExternalAvatar?.crop}
                              hotspot={definedPreviewExternalAvatar?.hotspot}
                              asset={
                                (definedPreviewExternalAvatar._ref &&
                                  urlFor(definedPreviewExternalAvatar)
                                    .width(100)
                                    .url()) ||
                                definedPreviewExternalAvatar.asset
                              }
                              // tell Sanity how large to make the image (does not set any CSS)
                              width={100}
                              // style it how you want it
                              style={{
                                width: 56,
                                height: 56,
                                objectFit: "cover",
                                borderRadius: 1000,
                                border: `1px solid ${contrastColour(definedBackgroundColor).divider.hex}`,
                                filter: "grayscale(1)",
                              }}
                            />
                          </Box>
                        )
                      }

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          ml: 4,
                        }}
                      >
                        <Typography
                          color={
                            contrastColour(definedBackgroundColor).textColour
                          }
                          variant="body1"
                          sx={{ fontWeight: 700 }}
                        >
                          {definedInternalQuoteCite || definedExternalQuoteCite}
                        </Typography>
                        <Typography
                          color={
                            contrastColour(definedBackgroundColor).textColour
                          }
                          variant="overline"
                        >
                          {definedInternalQuotePosition ||
                            definedExternalQuotePosition}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Container>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
        {testimonialTiles?.length > 1 && (
          <Container
            maxWidth="md"
            sx={{
              gridColumn: "1/25",
              gridRow: "1/auto",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              position: "relative",
              zIndex: 2,
              mt: { xs: 12, md: 0 },
            }}
          >
            <IconButton
              aria-label="previous testimonial"
              onClick={() => paginate(-1)}
              sx={{
                border: `1px solid ${contrastColour(definedBackgroundColor).svg.default.hex}`,
              }}
            >
              <ArrowBackIcon
                color={contrastColour(definedBackgroundColor).svg.default.mui}
              />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {testimonialTiles.map((dot, index) => {
                let dotColour =
                  index === slideIndex
                    ? contrastColour(definedBackgroundColor).svg?.default?.mui
                    : contrastColour(definedBackgroundColor).svg?.active?.hex
                return (
                  <SvgIcon
                    color={dotColour}
                    key={`dot-${index}`}
                    sx={{ width: 16, height: 16 }}
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

            <IconButton
              aria-label="next testimonial"
              onClick={() => paginate(1)}
              sx={{
                border: `1px solid ${contrastColour(definedBackgroundColor).svg.default.hex}`,
              }}
            >
              <ArrowForwardIcon
                color={contrastColour(definedBackgroundColor).svg.default.mui}
              />
            </IconButton>
          </Container>
        )}
      </Container>

      <Box
        sx={{
          position: "absolute",
          top: { xs: "unset", sm: "50%" },
          bottom: { xs: 0, sm: "unset" },
          transform: {
            xs: "translateX(30px)",
            sm: "translateX(150px) translateY(-50%)",
            md: "translateY(-50%)",
          },
          right: 0,
          width: { xs: "85px", sm: "auto" },
          display: "flex",
          alignItems: { xs: "flex-end", sm: "unset" },
          zIndex: 0,
          opacity: contrastColour(definedBackgroundColor).spiro.opacity,
          svg: {
            width: "100%",
            height: "auto",
            path: {
              stroke: contrastColour(definedBackgroundColor).spiro.fill,
            },
          },
        }}
      >
        <Spiro />
      </Box>
    </Box>
  )
}

export const query = graphql`
  fragment TestimonialSectionFragment on SanityTestimonialSection {
    _key
    _type
    topPadding
    backgroundColor {
      value
      label
    }
    testimonialTiles {
      _rawQuoteText(resolveReferences: { maxDepth: 10 })
      cite {
        teamMemberCite {
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
          name
          position
        }
        externalCite {
          citeName
          citeLocation
          image {
            asset {
              _id
              gatsbyImageData
              _key
              _type
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
        }
      }
    }
  }
`
