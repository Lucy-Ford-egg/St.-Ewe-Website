import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { Container, Box, useMediaQuery,IconButton, useTheme } from '@mui/material'
import {ServicesTile} from '../components/servicesTile'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

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

export const Carousel = (props) => {

  const { tiles, previewData, sanityConfig } = props
  const [[page, direction], setPage] = useState([0, 0]);
  const theme = useTheme()
  const tablet = useMediaQuery(theme.breakpoints.up('xs'))


  const variants = {
    enter: (direction) => {
      return {
        opacity: 0
      };
    },
    center: {
      opacity: 1
    },
    exit: (direction) => {
      return {
        opacity: 0
      };
    }
  };


  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const slideIndex = wrap(0, tiles.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const setDirection = -1
    const timer = setTimeout(() => {
      // console.log('This will run after 3 second!')
      paginate(setDirection)
    }, 9000);
    return () => clearTimeout(timer);
  });

  return (
    <Container className="section carousel" maxWidth={tablet ? "xs" : "fluid"} disableGutters={true} sx={{mt: { xs: 10, md: 11 }}}>
      <Box sx={{
        position: 'relative', minHeight: 415,   
      }}>
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
              opacity: { duration: 0.1 }
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
            style={{ height: '100%'}}
          >
            <Box className="slide" sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
              
                  <ServicesTile
                  title={tiles[slideIndex].title}
                  text={tiles[slideIndex].text}
                  node={tiles[slideIndex]}
                  link={tiles[slideIndex].link}
                  previewData={previewData}
                  sanityConfig={sanityConfig}
                />
                
            </Box>

          </motion.div>
        </AnimatePresence>
        </Box>

        <Box sx={{ pt: 4, height: 'min-content', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          
            <IconButton aria-label="previous image" onClick={() => paginate(1)} sx={{
              pl: 0
            }}>
              <ArrowBackIcon color='primary' />
            </IconButton>

            <IconButton aria-label="next image" onClick={() => paginate(-1)} sx={{
              pr: 0
            }}>
              <ArrowForwardIcon color='primary' />
            </IconButton>

         

          

        </Box>

        {/* <Box sx={{ position: "absolute", zIndex: 2, bottom: 62, width: '100%', px: { xs: 2, sm: 2, md: 8 } }}>
          <Container maxWidth="xl">
            <Box display="flex" flexDirection="row" justifyContent="flex-end" sx={{ position: 'relative', right: 0, pb: { xs: 0, md: 7 } }}>
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
        </Box> */}

      
    </Container>
  );
};

// export const query = graphql`
//   fragment CarouselFragment on SanityHeroSlide {
//     title
//     text
//     subtitle
//     image {
//       asset {
//         gatsbyImageData( aspectRatio: 2.17, layout: FULL_WIDTH)
//         altText
//       }
//     }
//     mobile: image {
//       asset {
//         gatsbyImageData( aspectRatio: 0.63, layout: FULL_WIDTH)
//         altText
//       }
//     }
//     linkGroup {
//       externalLinkGroup {
//         href
//         blank
//         label
//       }
//       internalLinkGroup {
//         reference {
//           ... on SanityPage {
//             id
//             slug {
//               current
//             }
//           }
//         }
//         label
//       }
//     }
//   }
// `
