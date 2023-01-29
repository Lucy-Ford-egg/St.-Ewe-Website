import React, {useState, useEffect, useCallback} from 'react'
import { graphql } from "gatsby"
import { motion } from "framer-motion"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Card, CardActions, CardContent, Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'

export const ImageCaption = ({ image, imageSize }) => {

  const [whatImageSize, setWhatImageSize] = useState(null)

  const storeImage = useCallback(
    () => {
      return(setWhatImageSize(image.asset[imageSize]))
    },
    [],
  )

  useEffect(() => {
    return (storeImage())

  }, [storeImage])
  
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

  const matrix = {
    xl: {
      image: {
        xs:12,
        md:12,
        offset:{
          xs:0,
          md:0,
        }
      },
      caption: {
        xs:12,
        md:2,
        offset:{
          xs:0,
          md:10,
        }
      }
    },
    lg:{
      image: {
        xs:12,
        md:8,
        offset:{
          xs:0,
          md:2,
        }
      },
      caption: {
        xs:12,
        md:2,
        offset:{
          xs:0,
          md:0,
        }
      }
    }
  }
  return (
    <Container maxWidth="xl">
      <Grid2 container columnSpacing={{ xs: 9, sm: 9, md: 9 }} rowSpacing={{ xs: 4, sm: 4, md: 4 }}>

        <Grid2 item xsOffset={matrix[imageSize].image.offset.xs} mdOffset={matrix[imageSize].image.offset.md}  xs={matrix[imageSize].image.xs} md={matrix[imageSize].image.md}>
          <motion.div style={{}} animate={"hovered"}
            variants={imageWrapper}>
            <GatsbyImage image={getImage(whatImageSize)} alt={image.alt} />
          </motion.div>
        </Grid2>
        <Grid2 xsOffset={matrix[imageSize].caption.offset.xs} mdOffset={matrix[imageSize].caption.offset.md} item xs={matrix[imageSize].caption.xs} md={matrix[imageSize].caption.md}>
          <Typography variant="caption">{image.caption}</Typography>
        </Grid2>

      </Grid2>
    </Container>
  )

}

export const query = graphql`
  fragment ImageCaptionFragment on SanityImageWithCaption {
    image {
      caption
      asset {
        xl: gatsbyImageData(width: 1330, height: 748)
        lg: gatsbyImageData(width: 870, height: 498)
      }
      alt
    }
    imageSize
    portrait
  }
`