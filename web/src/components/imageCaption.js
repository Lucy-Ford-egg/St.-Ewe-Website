import React, { useState, useEffect, useCallback } from 'react'
import { graphql } from "gatsby"
import { motion } from "framer-motion"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'

export const ImageCaption = ({ image, imageSize }) => {

  const [whatImageSize, setWhatImageSize] = useState(null)
  const [captionGrid, setCaptionGrid] = useState(null)
  const [captionOffset, setCaptionOffset] = useState(null)
  const [imageOffset, setImageOffset] = useState(null)
  const [imageGrid, setImageGrid] = useState(null)

  const matrix = {
    xl: {
      image: {
        xs: 12,
        md: 12,
        offset: {
          xs: 0,
          md: 0,
        }
      },
      caption: {
        xs: 12,
        md: 2,
        offset: {
          xs: 0,
          md: 10,
        }
      }
    },
    lg: {
      image: {
        xs: 12,
        md: 8,
        offset: {
          xs: 0,
          md: 2,
        }
      },
      caption: {
        xs: 12,
        md: 2,
        offset: {
          xs: 0,
          md: 0,
        }
      }
    }
  }

  const storeImage = useCallback(
    () => {
      debugger
      setWhatImageSize(image.asset[imageSize])
      setCaptionGrid({
        xs: matrix[imageSize].caption.xs,
        md: matrix[imageSize].caption.md
      })
      setCaptionOffset({
        xs: matrix[imageSize].caption.offset.xs,
        md: matrix[imageSize].caption.offset.md
      })
      setImageOffset({
        xs: matrix[imageSize].image.offset.xs,
        md: matrix[imageSize].image.offset.md
      })
      setImageGrid({
        xs: matrix[imageSize].image.xs,
        md: matrix[imageSize].image.md
      })
    },
    [image, imageSize],
  )

  useEffect(() => storeImage(), [storeImage])

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
      <Grid2 container columnSpacing={{ xs: 9, sm: 9, md: 9 }} rowSpacing={{ xs: 4, sm: 4, md: 4 }}>

        { imageOffset && imageGrid && <Grid2 item xsOffset={imageOffset.xs} mdOffset={imageOffset.md} xs={imageGrid.xs} md={imageGrid.md}>
          <motion.div style={{}} animate={"hovered"}
            variants={imageWrapper}>
            <GatsbyImage image={getImage(whatImageSize)} alt={image.alt} />
          </motion.div>
        </Grid2>
}
{ captionOffset && captionGrid && <Grid2 xsOffset={captionOffset.xs} mdOffset={captionOffset.md} item xs={captionGrid.xs} md={captionGrid.md}>
          <Typography variant="caption">{image.caption}</Typography>
        </Grid2>}

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