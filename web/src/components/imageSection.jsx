import React, { useState, useRef, useEffect } from "react"
import { graphql } from "gatsby"
import { motion, MotionConfig } from "framer-motion"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { ModuleContainer } from "./moduleContainer"
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(({ theme, navColour, menu, backgroundColour, verticalSpace }) => ({
  // Base styles
  backgroundColor: backgroundColour?.value,
  //
  gridColumn: '1/25',
  gridTemplateColumns: 'repeat(24, 1fr)',
  display: 'grid',
  alignItems: 'center',
}));

const Images = styled('div')(({ theme, images }) => ({
  gridColumn: '1/25',
  display: 'grid',
  gridRow: '1/1',
  overflowX: 'hidden',
}));

const ImagesContainer = styled(motion.div)(({ theme, images }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 'var(--ms9)',
  display: 'flex',
  height: images?.length === 0 ? 'auto' : 'var(--ms9)',
}));

const ImageContainer = styled('div')(({ theme, images }) => ({
  gridColumn: '1/25',
  // height: images?.length === 0 ? 'auto' : 'var(--ms9)',
  maxHeight: 360,
  [theme.breakpoints.up('md')]: {
    maxHeight: 820,
  },
  "& img": {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    maxHeight: 360,
    [theme.breakpoints.up('md')]: {
      maxHeight: 820,
    },
  },
}));



export const ImageSection = (props) => {
  const { images, text, textAlign = "center", backgroundColour, verticalSpace } = props

  // const expandedImages = [];
  // for (let i = 0; i < 3; i++) {
  //     expandedImages.push(...images);
  // }

  // Keyframing for the continuous scroll
  const scrollVariant = {
    animate: {
      x: [0, -1000], // Adjust based on how far the images should move
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 10, // Adjust the speed of scrolling
          ease: "linear",
        },
      },
    },
  };

  // Duplicate images array for infinite effect
  const duplicatedImages = [...images, ...images, ...images];

  const vs = images.length > 1 ? `vs${verticalSpace?.topPadding}-top vs${verticalSpace?.bottomPadding}-bottom` : ``
  return (

    <ModuleContainer {...props}>

    <Wrapper className={vs} {...props}>

      {images.length > 1 ? (
        <Images images={images}>
          <ImagesContainer
            style={{ display: 'flex' }}
            variants={scrollVariant}
            animate="animate"
          >
            {duplicatedImages.map((image, index) => (
              <Image
                crop={image?.crop}
                hotspot={image?.hotspot}
                asset={
                  image?._ref && urlFor(image).width(1440).url() || image?.asset
                }
                width={1440}
                height={600}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />

            ))}
          </ImagesContainer >

        </Images>
      ) : <ImageContainer>
        <Image
          crop={images[0]?.crop}
          hotspot={images[0]?.hotspot}
          asset={
            images[0]._ref && urlFor(images[0]).width(1440).url() || images[0]?.asset
          }
          width={1440}
          height={600}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </ImageContainer >
      }

    </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment ImageSectionFragment on SanityImageSection {
    _key
    _type
    images {
      asset {
        _id
        gatsbyImageData
      }
      hotspot {
        x
        y
        width
        height
      }
      crop {
        bottom
        left
        right
        top
      }
    }
    topPadding
  }
`
