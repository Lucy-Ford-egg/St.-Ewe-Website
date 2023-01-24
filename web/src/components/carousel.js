import React, { useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Typography, Box, SvgIcon, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';

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

export const Carousel = ({ carousel }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, carousel.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const setDirection = -1
    const timer = setTimeout(() => {
      console.log('This will run after 3 second!')
      paginate(setDirection)
    }, 3000);
    return () => clearTimeout(timer);
  });
  

  return (
    <Box sx={{ height: {xs: '85vh', md: '85vh'} }}>
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
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '2fr' }}>
            <Box sx={{
              gridColumn: '1/1', gridRow: '1/1', height: '100%', display: 'flex',
              zIndex: 2,
              position: 'relative',
              alignItems: 'flex-end'
            }}>
              <Container maxWidth="lg" sx={{ height: {xs: 'auto', md: '100%'}, px:{xs: 0, md: 8}}}>
                <Grid container sx={{ height: {xs: 'auto', md: '100%'} }}>
                  <Grid xs={12} sm={8} md={6} sx={{ py:{ xs: 8, md: 9}, px: {xs: 4, md: 9}, backdropFilter: 'blur(10px)', height: {xs: 'auto', md: '100%'}, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography color="primary.main" variant="subtitle1" pb={{ xs: 4 }}>{carousel[imageIndex].subtitle}</Typography>
                    <motion.div initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}>
                      <Typography color="white.main" variant="h1" component="h1" pb={{ xs: 4 }}>{carousel[imageIndex].title}</Typography>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}>
                      <Typography color="white.main" variant="body2" dangerouslySetInnerHTML={{ __html: carousel[imageIndex].text }} sx={{marginBottom: 6}}></Typography>
                    </motion.div>
                    <Button variant="contained" color="primary">See the list</Button>
                  </Grid>
                </Grid>
              </Container>
            </Box>



            <Box sx={{gridColumn: '1/1', gridRow: '1/1', minHeight: {xs: '85vh', md: '85vh'} }}>
              <GatsbyImage style={{minHeight: 'inherit'}} image={getImage(carousel[imageIndex].image.asset.gatsbyImageData)} alt="alt tag" />
            </Box>

          </Box>

        </motion.div>
      </AnimatePresence>

      <Container maxWidth="xl" sx={{ display: {xs: 'none', md: 'block' }, position: "relative", zIndex: 2, height: '100%', top: '50%', transform: 'translateY(-50%)', px: {xs: 2, sm: 4, md: 8} }}>
        <Box display="flex" flexDirection="column" justifyContent="center" sx={{height: '100%'}}>
          <Box display="flex" justifyContent="space-between">
            <div className="next" onClick={() => paginate(1)}>
              <SvgIcon sx={{ width: 22, height: 66}}>
                <path id="Union_2" data-name="Union 2" d="M-15786.88,2656.25l-.121.123.121-.123-.121-.123.121.123,21.956-22.25-21.956,22.25,21.956,22.251Z" transform="translate(15788.986 -2632.95)" fill="none" stroke="#fff" stroke-width="3"/>
              </SvgIcon>
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
              <SvgIcon sx={{ width: 22, height: 66}}>
                <g id="arrow" transform="translate(23.145 45.555) rotate(180)">
                  <path id="Union_1" data-name="Union 1" d="M-15786.88,2656.25l-.121.123.121-.123-.121-.123.121.123,21.956-22.25-21.956,22.25,21.956,22.251Z" transform="translate(15787.001 -2633.999)" fill="none" stroke="#fff" stroke-width="3"/>
                </g>
              </SvgIcon>
            </div>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2, bottom: 0, px: {xs: 2, sm: 4, md: 8}, pb: {xs: 7}}}>
        <Box display="flex" flexDirection="row" justifyContent="flex-end" sx={{position: 'relative', }}>
          {carousel.map((dot, index) => {
            let dotColour = index === imageIndex ? "#C3B187" : "rgba(255,255,255,0.45)"
            return (
              <SvgIcon color={dotColour} key={`dot-${index}`} sx={{ width: 22, height: 22}}>
                <circle id="dot" cx="5.5" cy="5.5" r="5.5" fill={dotColour}/>
              </SvgIcon>
            )
          })}
        </Box>
      </Container>

    </Box>
  );
};
