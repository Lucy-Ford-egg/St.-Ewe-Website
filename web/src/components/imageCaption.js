import React from 'react'
import { graphql } from "gatsby"
import { motion } from "framer-motion"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Card, CardActions, CardContent, Box, Grid, Typography } from '@mui/material';

export const ImageCaption = ({ image, imageSize }) => {

debugger
  const imageWrapper = {
    hovered: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0
      }
    },
    unhovered: {
      opacity: 0,
      y: -10,
    },
  }

  return (
    <Container maxWidth="xl">
      <motion.div style={{}} animate={"hovered"}
        variants={imageWrapper}>
        <GatsbyImage image={getImage(image.asset.xlImage)} alt={image.asset.alt} />
      </motion.div>
      <Grid container spacing={9} justifyContent="flex-end" sx={{py:{xs: 4}}}>
        <Grid item xs={6} md={3}>
          <Typography variant="caption">{image.caption}</Typography>
        </Grid>
      </Grid>
    </Container>
  )

}

export const query = graphql`
  fragment ImageCaptionFragment on SanityImageWithCaption {
    image {
      caption
      asset {
        xlImage: gatsbyImageData(width: 1330, height: 748)
      }
      alt
    }
    imageSize
    portrait
  }
`