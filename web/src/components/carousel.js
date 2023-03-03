import React, { useState, useEffect , useRef} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { graphql } from "gatsby"
import { wrap } from "popmotion";
import { GatsbyImage, getImage, withArtDirection } from "gatsby-plugin-image"
import { Container, Typography, Box, SvgIcon } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import ButtonLink from '../utils/buttonLink'


const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 50 : -50,
      opacity: 0
    };
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? 50 : -50,
      opacity: 0
    };
  }
};



//sx={{ maxWidth: '100vw', height: '85%', position: 'relative', top: 0 }}
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

export const Carousel = ({ carousel }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const [imageHeight, setImageHeight] = useState(null);

  const imageRef = useRef()


  useEffect(() => {

    const handleResize = () => {
      setImageHeight(imageRef.current.clientHeight)
    }

    handleResize();


    // if (typeof window !== `undefined`) {
    //   window.addEventListener('resize', handleResize)
    // }

    // return _ => {
    //   if (typeof window !== `undefined`) {
    //     window.removeEventListener('resize', handleResize)
    //   }
    // }
  }, [])
  

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, carousel.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const renderImages = (node) => {
    const images = withArtDirection(getImage(node?.image?.asset.gatsbyImageData), [
      {
        media: "(max-width: 600px)",
        image: getImage(node?.mobile?.asset.gatsbyImageData),
      },
    ])
    return images
  }


  useEffect(() => {
    const setDirection = -1
    const timer = setTimeout(() => {
      console.log('This will run after 3 second!')
      paginate(setDirection)
    }, 3000);
    return () => clearTimeout(timer);
  });


  return (
    <Container className="section carousel" maxWidth="fluid" disableGutters={true} sx={{mt:{xs: 10, md: 11 }, height: {xs: 650, md: imageHeight}}}>
      <Box sx={{ position: 'relative', height: '100%' }}>
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
          >
            <Box className="slide" >
             <Box sx={{display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '2fr', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, minHeight: 'min-content', height: 'min-content'}}>
              <Box sx={{ gridColumn: '1/2', gridRow: '1/2', position: 'relative', zIndex: 1, ".art-directed": { width: '100%', height: '650px' } }} ref={imageRef}>
                <GatsbyImage className="art-directed" image={renderImages(carousel[imageIndex])} alt={carousel[imageIndex].image?.asset.altText} />
              </Box>
              <Box sx={{
                gridColumn: '1/2', gridRow: '1/2', height: '100%', display: 'flex',
                zIndex: 2,
                position: 'relative',
                alignItems: 'flex-end'
              }}>
                <Container maxWidth="lg" sx={{ height: { xs: 'auto', md: '100%' }}}>
                  <Grid container sx={{ height: { xs: 'auto', md: '100%' } }}>
                    <Grid xs={12} sm={12} md={6} sx={{ py: { xs: 8, md: 9 }, px: { xs: 6, md: 9 }, backdropFilter: 'blur(10px)', height: { xs: 'auto', md: '100%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography color="primary.main" variant="subtitle1" pb={{ xs: 4 }}>{carousel[imageIndex].subtitle}</Typography>
                      <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}>
                        <Typography color="white.main" variant="h1" component="h1" pb={{ xs: 4 }}>{carousel[imageIndex].title}</Typography>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}>
                        <Typography color="white.main" variant="body2" dangerouslySetInnerHTML={{ __html: carousel[imageIndex].text }} sx={{ marginBottom: 6 }}></Typography>
                      </motion.div>
                      <ButtonLink linkGroup={carousel[imageIndex].linkGroup} variant="contained" color="primary" />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
              </Box>
            </Box>

          </motion.div>
        </AnimatePresence>


        <Container maxWidth="xl" sx={{ height: 'min-content', position: 'absolute', zIndex: 1, right: 0, left: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          <Box className="next" onClick={() => paginate(1)} display="flex" alignItems="center" justifyContent="flex-start" sx={{ display: { xs: 'none', md: 'flex' }, position: "relative", zIndex: 2 }}>

            <SvgIcon sx={{ width: 22, height: 66 }}>
              <path id="Union_2" data-name="Union 2" d="M-15786.88,2656.25l-.121.123.121-.123-.121-.123.121.123,21.956-22.25-21.956,22.25,21.956,22.251Z" transform="translate(15788.986 -2632.95)" fill="none" stroke="#fff" strokeWidth="3" />
            </SvgIcon>

          </Box>

          <Box className="prev" onClick={() => paginate(-1)} display="flex" alignItems="center" justifyContent="flex-end" sx={{ display: { xs: 'none', md: 'flex' }, position: "relative", zIndex: 2 }}>

            <SvgIcon sx={{ width: 22, height: 66 }}>
              <g id="arrow" transform="translate(23.145 45.555) rotate(180)">
                <path id="Union_1" data-name="Union 1" d="M-15786.88,2656.25l-.121.123.121-.123-.121-.123.121.123,21.956-22.25-21.956,22.25,21.956,22.251Z" transform="translate(15787.001 -2633.999)" fill="none" stroke="#fff" strokeWidth="3" />
              </g>
            </SvgIcon>

          </Box>

        </Container>

<Box sx={{ position: "absolute", zIndex: 2, bottom: 62, width: '100%',  px: { xs: 2, sm: 2, md: 8 } }}>
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
        </Box>

      </Box>
    </Container>
  );
};

export const query = graphql`
  fragment CarouselFragment on SanityHeroSlide {
    title
    text
    subtitle
    image {
      asset {
        gatsbyImageData( aspectRatio: 2.17, layout: FULL_WIDTH)
        altText
      }
    }
    mobile: image {
      asset {
        gatsbyImageData( aspectRatio: 0.63, layout: FULL_WIDTH)
        altText
      }
    }
    linkGroup {
      externalLinkGroup {
        href
        blank
        label
      }
      internalLinkGroup {
        reference {
          ... on SanityPage {
            id
            slug {
              current
            }
          }
        }
        label
      }
    }
  }
`
