import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { graphql } from "gatsby"
import { wrap } from "popmotion";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Typography, Box, SvgIcon } from '@mui/material'
import ButtonLink from '../utils/buttonLink'
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";


const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const GalleryCarousel = ({ carousel, carouselLinkGroup }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, carousel.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // useEffect(() => {
  //   const setDirection = -1
  //   const timer = setTimeout(() => {
  //     console.log('This will run after 3 second!')
  //     paginate(setDirection)
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // });


  return (
    <Container maxWidth="fluid" disableGutters={true}>
      <Box sx={{ height: { xs: '85vh', md: '85vh', lg: '663px' }, position: 'relative' }}>
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
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            style={{ position: 'absolute', maxWidth: '100vw', height: '100%' }}

          >

            <Box sx={{ gridColumn: '1/1', gridRow: '1/1', minHeight: { xs: '85vh', md: 'min-content' } }}>
              <GatsbyImage style={{ minHeight: 'inherit' }} image={getImage(carousel[imageIndex].asset.mainImage)} alt="alt tag" />
            </Box>

          </motion.div>
        </AnimatePresence>


        <Box display="flex" alignItems="center" flexDirection="column" sx={{ position: 'relative', height: '100%', bottom: 0, }}>
          <Box className="next" onClick={() => paginate(-1)} display="flex" alignItems="center" justifyContent="flex-start" sx={{ display: { xs: 'none', md: 'flex' }, position: "absolute", zIndex: 2, height: '100%', top: '50%', left: 0, transform: 'translateY(-50%)', px: { xs: 2, sm: 4, md: 8 } }}>

            <SvgIcon sx={{ width: 22, height: 66 }}>
              <path id="Union_2" data-name="Union 2" d="M-15786.88,2656.25l-.121.123.121-.123-.121-.123.121.123,21.956-22.25-21.956,22.25,21.956,22.251Z" transform="translate(15788.986 -2632.95)" fill="none" stroke="#fff" stroke-width="3" />
            </SvgIcon>

          </Box>

          <Box className="prev" onClick={() => paginate(1)} display="flex" alignItems="center" justifyContent="flex-end" sx={{ display: { xs: 'none', md: 'flex' }, position: "absolute", zIndex: 2, height: '100%', top: '50%', right: 0, transform: 'translateY(-50%)', px: { xs: 2, sm: 4, md: 8 } }}>

            <SvgIcon sx={{ width: 22, height: 66 }}>
              <g id="arrow" transform="translate(23.145 45.555) rotate(180)">
                <path id="Union_1" data-name="Union 1" d="M-15786.88,2656.25l-.121.123.121-.123-.121-.123.121.123,21.956-22.25-21.956,22.25,21.956,22.251Z" transform="translate(15787.001 -2633.999)" fill="none" stroke="#fff" stroke-width="3" />
              </g>
            </SvgIcon>

          </Box>
        </Box>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, bottom: clientTheme.spacing(10), px: { xs: 2, sm: 4, md: 8 }, pb: {xs: 9, md: 2} }}>
          <Box display="flex" flexDirection="row" justifyContent="center" sx={{ position: 'relative', right: 0, pb: { xs: 7 } }}>
            {carousel.map((dot, index) => {
              let dotColour = index === imageIndex ? "#C3B187" : "rgba(255,255,255,0.45)"
              return (
                <SvgIcon color={dotColour} key={`dot-${index}`} sx={{ width: 22, height: 22 }}>
                  <circle id="dot" cx="5.5" cy="5.5" r="5.5" fill={dotColour} />
                </SvgIcon>
              )
            })}
          </Box>
        </Container>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, bottom: clientTheme.spacing(10), py:{xs: 9, md: 6}, pr: {xs: 9, md: 0}, mr: {xs: 9, md:0 }, overflowX: 'hidden'}}>
          <Grid2 container columnSpacing={{ xs: 9, sm: 9, md: 9 }}>
            <Grid2 xs={12} md={2}>
              <Box display="flex" flexDirection="column" justifyContent="flex-start" sx={{ position: 'relative', right: 0, pb: { xs: 7 }, columnGap: 9, pt: {xs: 2, md: 2}}}>
                <Typography variant="caption">{carousel[imageIndex].caption}</Typography>
                {carouselLinkGroup && <Box sx={{mt: {xs: 4}, ml: {xs: 0, md: -5}}}><ButtonLink linkGroup={carouselLinkGroup} buttonType="text"/></Box>}
              </Box>
            </Grid2>
            <Grid2 mdOffset={1} xs={12} md={9} sx={{overflowX: 'hidden'}}>
              <Box className="scrollBar" display="flex" flexDirection="row" justifyContent="flex-start" sx={{ position: 'relative', right: 0, pb: { xs: 7 }, columnGap: 9, pt: {xs: 2, md: 2}, overflowX: 'scroll'}}>
                {carousel.map((thumb, index) => {
                  let currentThumb = index === imageIndex;
                  let thumbDirection = (selectedIndex) => {
                    return(
                      imageIndex > selectedIndex ? parseInt(`${selectedIndex - imageIndex }`) : parseInt(`${selectedIndex - imageIndex }`)
                    )
                  }

                  return (
                    <Box display="flex" sx={{position: 'relative', minWidth: '180px'}} onClick={() => paginate(thumbDirection(index))}>
                      {currentThumb && 
                        <SvgIcon color={clientTheme.palette.primary.main} sx={{ width: 19, height: 19, position: 'absolute', right: '-14px', top: -3, zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                        <circle id="dot" cx="5.5" cy="5.5" r="5.5" fill={clientTheme.palette.primary.main} />
                      </SvgIcon>}
                      <GatsbyImage key={`thumbnail-${index}`} style={{ minHeight: 'inherit' }} image={getImage(thumb.asset.thumbnail)} alt="alt tag" />
                    </Box>
                  )
                })}
              </Box>
            </Grid2>
          </Grid2>
        </Container>

      </Box>
    </Container>
  );
};

export const query = graphql`
  fragment GalleryCarouselFragment on SanityImageCarouselCaptionLink {
    _key
    _type
    carousel {
      caption
      asset {
        mainImage: gatsbyImageData(width: 1440, height: 663)
        thumbnail: gatsbyImageData(width: 180, height: 135)
      }
    }
    carouselLinkGroup {
      internalLinkGroup {
        label
        reference {
          ... on SanityPlace {
            id
          }
          ... on SanityPage {
            id
          }
          ... on SanityNews {
            id
            slug {
              current
            }
          }
        }
      }
      
      externalLinkGroup {
        href
        label
        blank
      }
    }
  }
`
