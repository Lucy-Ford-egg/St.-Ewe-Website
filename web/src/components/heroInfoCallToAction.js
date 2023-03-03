import React from "react";
import { motion } from "framer-motion";
import { graphql } from "gatsby"
import Image from "gatsby-plugin-sanity-image"
import { Container, Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import ButtonLink from '../utils/buttonLink'
import { RenderPortableText } from "./renderPortableText";
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme";


const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 50 : -50,
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
      x: direction < 0 ? 50 : -50,
      opacity: 0
    };
  }
};

export const HeroInfoCallToAction = ({ editor, image, linkGroup, mobileImage }) => {

  return (
    <Container maxWidth="fluid" disableGutters={true}>
      <Box sx={{ position: 'relative' }}>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '2fr' }}>
          <Box sx={{
            gridColumn: '1/1', gridRow: { xs: '2/2', md: '1/1' }, height: '100%', display: 'flex',
            zIndex: 2,
            position: 'relative',
            alignItems: 'flex-end'
          }}>
            <Container maxWidth="lg" sx={{ height: { xs: 'auto', md: '100%' } }}>
              <Grid container sx={{ height: { xs: 'auto', md: '100%' } }}>
                <Grid xs={12} sm={12} md={6} sx={{ py: { xs: 8, md: 9 }, px: { xs: 4, md: 9 }, backgroundColor: { xs: 'unset', md: 'rgba(255,255,255,0.2)' }, backdropFilter: { xs: 'unset', md: 'blur(10px)' }, height: { xs: 'auto', md: '100%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                  <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
                    <Box sx={{ marginBottom: 6 }}>
                      <RenderPortableText variant={false} value={editor[0]._rawChildren} textColor={clientTheme.palette.secondary.main} />
                    </Box>
                  </motion.div>

                  <ButtonLink linkGroup={linkGroup} variant="contained" color="primary" />
                </Grid>
              </Grid>
            </Container>
          </Box>



          <Box sx={{ gridColumn: '1/1', gridRow: { xs: '1/1', md: '1/2' } }}>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              {mobileImage ? <Image
                // pass asset, hotspot, and crop fields
                {...mobileImage}
                // tell Sanity how large to make the image (does not set any CSS)
                width={600}
                alt={mobileImage?.altText}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              /> :  <Image
              // pass asset, hotspot, and crop fields
              {...image}
              height={634}
              style={{
                width: "100%",
                height: 634,
                objectFit: "cover",
              }}
              alt={image.altText}
            />}
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Image
                // pass asset, hotspot, and crop fields
                {...image}
                height={634}
                // style it how you want it
                style={{
                  width: "100%",
                  height: 634,
                  objectFit: "cover",
                }}
                alt={image.altText}
              />
            </Box>

          </Box>

        </Box>

      </Box>
    </Container>
  );
};

export const query = graphql`
  fragment HeroInfoCallToActionFragment on SanityHeroInfoCallToAction {
    editor: text {
      _rawChildren
    }
    image {
      ...ImageWithPreview
    }
    mobileImage {
      ...ImageWithPreview
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
