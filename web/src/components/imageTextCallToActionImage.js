import React from 'react'
import { graphql } from "gatsby"
import Image from "gatsby-plugin-sanity-image"
import { Container, Grid, Typography, Box, useMediaQuery } from '@mui/material';
import { RenderPortableText } from './renderPortableText';
import ButtonLink from '../utils/buttonLink';
import clientTheme from '../gatsby-theme-material-ui-top-layout/theme';

export const ImageTextCallToActionImage = ({ logo, _rawText, image, linkGroup, isAdvert }) => {

  return (
    <Container maxWidth="lg">

      <Grid container spacing={{xs: 2, sm: 6, md: 6}} sx={{justifyContent: 'space-between', py: {xs: 6}}}>
        <Grid item xs={12} sm={6} md={5}>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%'}}>
            {image && <Image
              // pass asset, hotspot, and crop fields
              {...logo}
              alt={logo?.asset.altText}
              // tell Sanity how large to make the image (does not set any CSS)
              width={100}
              // style it how you want it
              style={{
                width: "auto",
                maxHeight: "70px",
                objectFit: "cover",
              }}
             
            />}
            <RenderPortableText textColor={clientTheme.palette.secondary.main} variant={false} value={_rawText} />
            <ButtonLink linkGroup={linkGroup} variant="contained" color="secondary" />
          </Box>
        </Grid>
        <Grid item sx={12}  sm={6} md={5}>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%'}}>
            {isAdvert && <Typography variant="caption" component="p">Advertisment</Typography>}
            <Image
              // pass asset, hotspot, and crop fields
              {...image}
              alt={image?.asset.altText}
              // tell Sanity how large to make the image (does not set any CSS)
              width={410}
              height={320}
              // style it how you want it
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

        </Grid>
      </Grid>

    </Container>
  )

}

export const query = graphql`
  fragment ImageTextCallToActionImage on SanityImageTextCallToActionImage {
    _key
    _type
    _rawText
    logo {
      ...ImageWithPreview
      asset{
        altText
      }
    }
    image {
      ...ImageWithPreview
      asset{
        altText
      }
    }
    isAdvert
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