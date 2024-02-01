import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "popmotion"
import Image from "gatsby-plugin-sanity-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import imageUrlBuilder from "@sanity/image-url"
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  SvgIcon,
  Divider,
} from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import {Spiro} from '../components/spiro';

import { getSanityClient } from "../../sanityUtils/sanity"

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
  const { previewData, sanityConfig, testimonialTiles, topPadding, backgroundColor } = props

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

  return (
    <Box sx={{position: 'relative', backgroundColor: backgroundColor.value}}>
      <Box sx={{position: 'absolute', top: '50%', transform: 'translateY(-50%) rotate(180deg) ', left: 0}}>
        <Spiro/>
      </Box>
    <Container
      maxWidth="xl"
      sx={{
        
        pb: { xs: theme.spacing(10), md: theme.spacing(10) },
        pt: topPadding
          ? {
              xs: theme.spacing(10),
              md: theme.spacing(0),
            }
          : { xs: theme.spacing(10), md: theme.spacing(10) },
      }}
    >
      
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(24, 1fr)", position: 'relative', pb: 6 }}>
        <Box
          sx={{
            position:'relative',
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
                  <Typography align="center" color="white.main" variant="h3" sx={{ py: 6 }}>
                    {testimonialTiles[slideIndex].quote}
                  </Typography>
                  <Divider sx={{display: 'flex', my: 10, width: '5.625rem', borderColor: 'red'}}/>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {testimonialTiles[slideIndex].image &&
                      testimonialTiles[slideIndex].image.asset && (
                        <Image
                          // pass asset, hotspot, and crop fields
                          // {...testimonialTiles[slideIndex].image}
                          crop={
                            (previewData &&
                              previewData?.[slideIndex]?.image?.crop) ||
                            testimonialTiles[slideIndex].image.crop
                          }
                          hotspot={
                            (previewData &&
                              previewData?.[slideIndex]?.image?.hotspot) ||
                            testimonialTiles[slideIndex].image.hotspot
                          }
                          asset={
                            getGatsbyImageData(
                              previewData &&
                                previewData?.[slideIndex]?.image?.asset,
                              { maxWidth: 100 },
                              sanityConfig,
                            ) || testimonialTiles[slideIndex].image.asset
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
                      <Typography color="white.main" variant="body1" sx={{ fontWeight: 700 }}>
                        {testimonialTiles[slideIndex].citeName}
                      </Typography>
                      <Typography color="white.main" variant="body1">
                        {testimonialTiles[slideIndex].citeLocation}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </motion.div>
          </AnimatePresence>
        </Box>

        <Box
          sx={{
            gridColumn: "1/25",
            gridRow: "1/auto",
            height: "100%",
            display: {xs: 'none', md: 'flex'},
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <IconButton
            aria-label="delete"
            onClick={() => paginate(1)}
            sx={{ border: `1px solid ${theme.palette.primary.main}` }}
          >
            <ArrowBackIcon color="primary" />
          </IconButton>

          <IconButton
            aria-label="delete"
            onClick={() => paginate(-1)}
            sx={{ border: `1px solid ${theme.palette.primary.main}` }}
          >
            <ArrowForwardIcon color="primary" />
          </IconButton>
        </Box>

        <Box
           sx={{
           
            width: "100%",
            position: 'absolute',
            left: 0,
            right: 0,
            bottom:0,
             //px: { xs: 2, sm: 2, md: 8 },
           }}
        >
          <Container maxWidth="xl" sx={{display: 'flex', justifyContent: 'center'}}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              sx={{ position: "relative" }}
            >
              {testimonialTiles.map((dot, index) => {
                let dotColour =
                  index === slideIndex ? theme.palette.primary.main : theme.palette.primary.light
                return (
                  <SvgIcon
                    color={dotColour}
                    key={`dot-${index}`}
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
      </Box>
     
    </Container>
    <Box  sx={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 0}}>
        <Spiro/>
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
    }
    testimonialTiles {
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
      citeName
      citeLocation
      quote
    }
  }
`
