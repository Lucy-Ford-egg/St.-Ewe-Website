import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "popmotion"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { RenderPortableText } from "../components/renderPortableText"

import {
  Container,
  Typography,
  Box,
  useTheme,
  IconButton,
  SvgIcon,
  Divider,
} from "@mui/material"
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
  } = props

  const [[page, direction], setPage] = useState([0, 0])

  const variants = {
    enter: direction => {
      return {
        opacity: 0,
      }
    },
    center: {
      opacity: 1,
    },
    exit: direction => {
      return {
        opacity: 0,
      }
    },
  }

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const definedTestimonialTiles =
    (previewData && previewData?.testimonialTiles) || testimonialTiles

  const slideIndex = wrap(0, definedTestimonialTiles.length, page)

  const paginate = newDirection => {
    setPage([page + newDirection, newDirection])
  }

  useEffect(() => {
    const setDirection = -1
    const timer = setTimeout(() => {
      // console.log('This will run after 3 second!')
      paginate(setDirection)
    }, 9000)
    return () => clearTimeout(timer)
  })

  const definedPreviewInternalAvatar =
    (previewData && previewData?.[slideIndex]?.cite?.teamMemberCite?.image) ||
    testimonialTiles[slideIndex]?.cite?.teamMemberCite?.image

  const definedPreviewExternalAvatar =
    (previewData && previewData?.[slideIndex]?.cite?.externalCite?.image) ||
    testimonialTiles[slideIndex]?.cite?.externalCite?.image

  const definedBackgroundColor =
    (previewData && previewData?.backgroundColor) || backgroundColor

  const definedTopPadding =
    (previewData && previewData?.topPadding) || topPadding

  const definedQuoteText =
    (previewData && previewData?.testimonialTiles[slideIndex].quoteText) ||
    testimonialTiles[slideIndex]._rawQuoteText

  const definedInternalQuoteCite =
    (previewData &&
      previewData?.testimonialTiles[slideIndex]?.cite?.teamMemberCite?.name) ||
    testimonialTiles[slideIndex]?.cite?.teamMemberCite?.name

  const definedExternalQuoteCite =
    (previewData &&
      previewData?.testimonialTiles[slideIndex]?.cite?.externalCite
        ?.citeName) ||
    testimonialTiles[slideIndex]?.cite?.externalCite?.citeName

  const definedInternalQuotePosition =
    (previewData &&
      previewData?.testimonialTiles[slideIndex]?.cite?.teamMemberCite
        ?.position) ||
    testimonialTiles[slideIndex]?.cite?.teamMemberCite?.position

  const definedExternalQuotePosition =
    (previewData &&
      previewData?.testimonialTiles[slideIndex]?.cite?.externalCite
        ?.citePosition) ||
    testimonialTiles[slideIndex]?.cite?.externalCite?.citeLocation

  return (
    <Box
      sx={{
        py: { xs: 14 },
        position: "relative",
        backgroundColor: definedBackgroundColor.value,
        overflowX: "hidden",
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
          height: { xs: "239.91px", sm: "auto" },
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
      <Container
        maxWidth="xl"
        sx={{
          pb: { xs: theme.spacing(16), md: theme.spacing(16) },
          pt: definedTopPadding
            ? {
                xs: theme.spacing(16),
                md: theme.spacing(0),
              }
            : { xs: theme.spacing(16), md: theme.spacing(16) },
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
              minHeight: 415,
              gridColumn: "1/25",
              gridRow: "1/auto",
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
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    minHeight: { xs: 415, md: "unset" },
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
                      }}
                    >
                      {
                        // Internal
                        definedPreviewInternalAvatar && (
                          <Image
                            crop={definedPreviewInternalAvatar?.crop}
                            hotspot={definedPreviewInternalAvatar?.hotspot}
                            asset={
                              (definedPreviewInternalAvatar._ref &&
                                urlFor(definedPreviewInternalAvatar)
                                  .width(582)
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
                            }}
                          />
                        )
                      }
                      {
                        // External
                        definedPreviewExternalAvatar && (
                          <Image
                            // pass asset, hotspot, and crop fields
                            // {...testimonialTiles[slideIndex].image}
                            crop={definedPreviewExternalAvatar?.crop}
                            hotspot={definedPreviewExternalAvatar?.hotspot}
                            asset={
                              (definedPreviewExternalAvatar._ref &&
                                urlFor(definedPreviewExternalAvatar)
                                  .width(582)
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
                            }}
                          />
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
        <Box
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
            aria-label="delete"
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
                  sx={{ width: 22, height: 22 }}
                >
                  <circle id="dot" cx="5.5" cy="5.5" r="5.5" fill={dotColour} />
                </SvgIcon>
              )
            })}
          </Box>

          <IconButton
            aria-label="delete"
            onClick={() => paginate(1)}
            sx={{
              border: `1px solid ${contrastColour(definedBackgroundColor).svg.default.hex}`,
            }}
          >
            <ArrowForwardIcon
              color={contrastColour(definedBackgroundColor).svg.default.mui}
            />
          </IconButton>
        </Box>
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
          height: { xs: "239.91px", sm: "auto" },
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
