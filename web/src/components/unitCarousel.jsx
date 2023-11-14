import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { wrap } from "popmotion"
import {
  Container,
  Box,
  useMediaQuery,
  IconButton,
  useTheme,
  SvgIcon,
} from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

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

export const UnitCarousel = props => {
  const { tiles, previewData, sanityConfig } = props
  const [[page, direction], setPage] = useState([0, 0])

  const theme = useTheme()

  const ref = useRef(null)

  const tablet = useMediaQuery(theme.breakpoints.up("xs"))

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const slideIndex = wrap(0, tiles.length, page)

  const variants = {
    enter: direction => {
      return {
        opacity: 0,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 488,
      }
    },
    center: {
      opacity: 1,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      height: 488,
    },
    exit: direction => {
      return {
        opacity: 0,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: 488,
      }
    },
  }

  const paginate = newDirection => {
    setPage([page + newDirection, newDirection])
  }

  // useEffect(() => {
  //   const setDirection = -1
  //   const timer = setTimeout(() => {
  //     // console.log('This will run after 3 second!')
  //     paginate(setDirection)
  //   }, 9000)
  //   return () => clearTimeout(timer)
  // })

  return (
    <Container
      className="section carousel"
      maxWidth="xl"
      sx={{ mt: { xs: 10, md: 11 } }}
    >
      <Box
        sx={{
          position: "relative",
          height: 488,
          display: "grid",
          gridTemplateColumns: "repeat(24, 1fr)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridColumn: "1/25",
            gridRow: "auto/auto",
            alignItems: "center",
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
              style={{}}
            >
              <Box className="slide" sx={{ height: "inherit" }}>
                <Image
                  // pass asset, hotspot, and crop fields
                  crop={
                    (previewData && previewData[slideIndex]?.crop) ||
                    tiles[slideIndex].crop
                  }
                  hotspot={
                    (previewData && previewData[slideIndex]?.hotspot) ||
                    tiles[slideIndex].hotspot
                  }
                  asset={
                    getGatsbyImageData(
                      previewData && previewData[slideIndex]?.asset,
                      { maxWidth: 1330 },
                      sanityConfig,
                    ) || tiles[slideIndex]?.asset
                  }
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </motion.div>
          </AnimatePresence>

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
                {tiles &&
                  tiles.map((dot, index) => {
                    let dotColour =
                      index === slideIndex
                        ? theme.palette.primary.main
                        : theme.palette.primary.light
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

          <Box
            sx={{
              display: "grid",
              width: "100%",
              gridColumn: "1/23",
              gridRow: "1/auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Container
              maxWidth="lg"
              sx={{
                pt: 4,
                height: "min-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => paginate(-1)}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                <ArrowBackIcon color="primary" />
              </IconButton>

              <IconButton
                aria-label="delete"
                onClick={() => paginate(+1)}
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                <ArrowForwardIcon color="primary" />
              </IconButton>
            </Container>
          </Box>
        </Box>
      </Box>

      <Container maxWidth="xl" disableGutters={true}>
        <Box
          className="thumbnails"
          sx={{ mt: 4, overflowX: "hidden", position: "relative", height: 150 }}
        >
          <Box
            sx={{
              width: "inherit",
              height: "inherit",
              display: "grid",
              gridAutoFlow: "column",
              gridTemplateColumns: "repeat(6, 200px)",
              columnGap: 4,
              overflowY: 'hidden',
              overflowX: "auto",
              overscrollBehaviorInline: "contain",
              scrollSnapType: "inline mandatory",
              //paddingInline: 4,
              // paddingBlockEnd: "calc(4 / 2)",
            }}
          >
            {tiles &&
              tiles.map((node, index) => {
                let opacity = index === slideIndex ? 0.6 : 1
                return (
                  <Box
                    ref={ref}
                    sx={{
                      width: 200,
                      height: 150,
                      opacity: opacity,
                      scrollSnapAlign: "start",
                    }}
                  >
                    <Image
                      // pass asset, hotspot, and crop fields
                      // {...testimonialTiles[slideIndex].image}
                      crop={(previewData && previewData.crop) || node.crop}
                      hotspot={
                        (previewData && previewData.hotspot) || node.hotspot
                      }
                      asset={
                        getGatsbyImageData(
                          previewData && previewData.asset,
                          { maxWidth: 200 },
                          sanityConfig,
                        ) || node.asset
                      }
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>
                )
              })}
          </Box>
        </Box>
      </Container>
    </Container>
  )
}
