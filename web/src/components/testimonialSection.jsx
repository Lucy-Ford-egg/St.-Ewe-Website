import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "popmotion"
import Image from "gatsby-plugin-sanity-image"
import { getGatsbyImageData } from "gatsby-source-sanity"

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
import {contrastColour} from '../utils/contrastColour'

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
  const slideIndex = wrap(0, testimonialTiles.length, page)

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

  const previewAvatar = previewData?.[slideIndex].cite.externalCite ? previewData?.[slideIndex].cite.externalCite.image : previewData?.[slideIndex].cite.teamMemberCite.image
  const avatar = testimonialTiles[slideIndex].cite.externalCite && testimonialTiles[slideIndex].cite.externalCite.image ? testimonialTiles[slideIndex].cite.externalCite.image : testimonialTiles[slideIndex].cite.teamMemberCite.image

  let avatarImage = avatar.asset
  
  
  return (
    <Box sx={{ py: {xs: 14}, position: "relative", backgroundColor: backgroundColor.value, overflowX: 'hidden', }}>
      <Box
        sx={{
          position: "absolute",
          top: {xs: "unset", sm: "50%"},
          bottom: {xs: 0, sm: 'unset'},
          transform: {xs: "translateX(-30px) rotate(180deg)", sm: "translateX(-150px) translateY(-50%) rotate(180deg)", md: "translateY(-50%)  rotate(180deg)"},
          left: 0,
          width: {xs: '85px', sm: 'auto'},
          height: {xs: '239.91px', sm: 'auto'},
          svg: {
            width: '100%',
            height: 'auto',
          }
        }}
      >
        <Spiro />
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          pb: { xs: theme.spacing(16), md: theme.spacing(16) },
          pt: topPadding
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
            pb: {xs: 0, md: 6},
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
                style={{  minHeight: 415,}}
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
                    minHeight: 415,
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
                    <Typography
                      align="center"
                      color={contrastColour(backgroundColor).textColour}
                      variant="h3"
                      sx={{ py: 6 }}
                    >
                        {testimonialTiles[slideIndex]?.quoteText && testimonialTiles[slideIndex]?.quoteText}
                    </Typography>
                    <Divider
                      sx={{
                        display: "flex",
                        my: 10,
                        width: "5.625rem",
                        borderColor: contrastColour(backgroundColor).divider.hex,
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        maxWidth: {xs: '60vw', md: 'unset'} 
                      }}
                    >
                      
                      { avatarImage && (
                          <Image
                            // pass asset, hotspot, and crop fields
                            // {...testimonialTiles[slideIndex].image}
                            crop={
                              (previewData &&
                                previewAvatar?.crop) ||
                                avatar && avatar?.crop
                            }
                            hotspot={
                              (previewData &&
                                previewAvatar?.hotspot) ||
                                avatar && avatar?.hotspot
                            }
                            asset={
                              getGatsbyImageData(
                                previewData &&
                                previewAvatar,
                                { maxWidth: 100 },
                                sanityConfig,
                              ) || avatarImage
                             }
                            
                            // tell Sanity how large to make the image (does not set any CSS)
                            width={100}
                            // style it how you want it
                            style={{
                              width: 56,
                              height: 56,
                              objectFit: "cover",
                              borderRadius: 1000,
                            }}
                          />
                        )}
                        
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          ml: 4,
                        }}
                      >
                        <Typography
                          color={contrastColour(backgroundColor).textColour}
                          variant="body1"
                          sx={{ fontWeight: 700 }}
                        >
                          {testimonialTiles[slideIndex]?.cite.teamMemberCite ? testimonialTiles[slideIndex]?.cite.teamMemberCite?.name : testimonialTiles[slideIndex]?.cite.externalCite?.citeName}
                        </Typography>
                        <Typography color={contrastColour(backgroundColor).textColour} variant="overline">
                        {testimonialTiles[slideIndex]?.cite.teamMemberCite ? testimonialTiles[slideIndex]?.cite.teamMemberCite?.position : testimonialTiles[slideIndex]?.cite.externalCite?.citeLocation}
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
            position: 'relative',
            zIndex: 2,
            mt: {xs:12, md: 0 },
          }}
        >
          <IconButton
            aria-label="delete"
            onClick={() => paginate(-1)}
            sx={{ border: `1px solid ${contrastColour(backgroundColor).svg.default.hex}` }}
          >
            <ArrowBackIcon color={contrastColour(backgroundColor).svg.default.mui} />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: 'center',
              position: "relative",
            }}
          >
            {testimonialTiles.map((dot, index) => {
              let dotColour =
                index === slideIndex
                  ? contrastColour(backgroundColor).svg.default.mui
                  : contrastColour(backgroundColor).svg.active.hex
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
            sx={{ border: `1px solid ${contrastColour(backgroundColor).svg.default.hex}` }}
          >
            <ArrowForwardIcon color={contrastColour(backgroundColor).svg.default.mui} />
          </IconButton>
        </Box>
      </Container>
      <Box
        sx={{
          position: "absolute",
          top: {xs: "unset", sm: "50%"},
          bottom: {xs: 0, sm: 'unset'},
          transform: {xs: "translateX(30px)", sm: "translateX(150px) translateY(-50%)", md: "translateY(-50%)"},
          right: 0,
          width: {xs: '85px', sm: 'auto'},
          height: {xs: '239.91px', sm: 'auto'},
          display: 'flex',
          alignItems: {xs: 'flex-end', sm: 'unset'},
          svg: {
            width: '100%',
            height: 'auto',
          }
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
      quoteText
      cite {
        teamMemberCite {
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
