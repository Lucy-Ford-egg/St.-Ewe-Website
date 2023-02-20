import React from "react";
import { motion } from "framer-motion";
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import ButtonLink from '../utils/buttonLink'
import { RenderPortableText } from "./renderPortableText";
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme";
import { Opacity } from "@mui/material";
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

export const HeroInfoCallToAction = ({ editor, image, linkGroup }) => {

  return (
    <Container maxWidth="fluid" disableGutters={true}>
      <Box sx={{ position: 'relative' }}>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '2fr' }}>
          <Box sx={{
            gridColumn: '1/1', gridRow: {xs: '2/2', md: '1/1'}, height: '100%', display: 'flex',
            zIndex: 2,
            position: 'relative',
            alignItems: 'flex-end'
          }}>
            <Container maxWidth="lg" sx={{ height: { xs: 'auto', md: '100%' }, px: { xs: 0, md: 8 } }}>
              <Grid container sx={{ height: { xs: 'auto', md: '100%' } }}>
                <Grid xs={12} sm={12} md={6} sx={{ py: { xs: 8, md: 9 }, px: { xs: 4, md: 9 }, backgroundColor: {xs: 'unset', md: 'rgba(255,255,255,0.2)'}, backdropFilter: {xs: 'unset', md: 'blur(10px)'}, height: { xs: 'auto', md: '100%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
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



          <Box sx={{ gridColumn: '1/1', gridRow: {xs: '1/1', md: '1/2'}, minHeight: { xs: '85vh', md: '85vh' } }}>
            <GatsbyImage style={{ minHeight: '100%', maxHeight: '100%' }} image={getImage(image?.asset.gatsbyImageData)} alt={image?.asset.altText} />
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
      asset {
        gatsbyImageData(width: 1440, height: 634)
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
