import React, { useState, useRef, useEffect } from "react"
import { graphql } from "gatsby"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { ModuleContainer } from "./moduleContainer"
import { styled } from '@mui/material/styles';
import { useMediaQuery, useTheme } from "@mui/material"

const Wrapper = styled('div')(({ theme, navColour, menu, backgroundColour, verticalSpace }) => ({
  // Base styles
  backgroundColor: backgroundColour?.value,
  //
  gridColumn: '1/25',
  gridTemplateColumns: 'repeat(24, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  display: 'grid',
  alignItems: 'center',
}));

const Images = styled('div')(({ theme, images }) => ({
  gridColumn: '1/25',
  display: 'grid',
  gridRow: '1/5',
  overflowX: 'hidden',
}));

const ImagesContainer = styled(motion.div)(({ theme, images, sideAssets, icons  }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  gridTemplateColumns: 'repeat(24, 1fr)',
  gridTemplateRows: '1fr',
  gap: 'var(--ms3)',
  flexWrap: 'nowrap',
  display: !sideAssets ? 'grid' : 'grid',
  //maxHeight: images?.length === 0 ? 'auto' : sideAssets ? '517px' : 'var(--ms6)',
  "& .imageWrapper": {
    gridColumn: !sideAssets ? 'span 2' : 'span 6',
    gridRow: '1/1',
  },
  "& img": {
    borderRadius: 'var(--ms2)',
    maxWidth: !sideAssets ? '100%' : '100%',
    objectFit: !sideAssets ? "contain" : "cover",
    height: !sideAssets ? "auto" : "auto",
  },
  [theme.breakpoints.up('md')]: {
    gap: 'var(--ms7)',
  }
}));

const ImageContainer = styled('div')(({ theme, images }) => ({
  gridColumn: '2/24',
  maxHeight: 269,
  gridTemplateColumns: 'repeat(24, 1fr)',
  display: 'grid',
  gridRow: '1/5',
  [theme.breakpoints.up('md')]: {
    gridColumn: '3/23',
    maxHeight: 790,
  },
  "& img": {
    gridColumn: '1/25',
    borderRadius: 'var(--ms2)',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    maxHeight: 269,
    zIndex: 0,
    [theme.breakpoints.up('md')]: {
      borderRadius: 'var(--ms2)',
      maxHeight: 790,
    },
  },
}));

const Description = styled(motion.div)(({ theme, images }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    gridColumn: '12/24',
    gridRow: '4/5',
    display: 'flex',
    marginTop: '-40px',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '10px',
    zIndex: 1,
    "& span": {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--quirky-quail-secondary)',
      maxWidth: 'fit-content',
      borderRadius: 'var(--ms-2)',
      whiteSpace: 'pre',
      padding: 'var(--ms0) var(--ms1)',
    }
  }
}));

const LeftAsset = styled('div')(({ alignment, theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    height: '100%',
    display: 'grid',
    gridColumn: '2/6',
    gridRow: '1/5',
    alignItems: 'start',
    justifyContent: 'start',
    zIndex: 2,
    marginTop: '-155px',
  }

}));

const RightAsset = styled('div')(({ alignment, theme }) => ({
  display: 'grid',
  gridColumn: '15/24',
  alignItems: 'end',
  justifyContent: 'end',
  gridRow: '1/5',
  height: '100%',
  marginBottom: '-155px',
  [theme.breakpoints.up('lg')]: {
    gridRow: '1/5',
    justifyContent: 'center',
    gridColumn: '15/24',
    zIndex: 2
  }
}));

const Asset = styled('div')(({ }) => ({
  maxWidth: 200,
}));


export const ImageSection = (props) => {
  const { images, text, textAlign = "center", backgroundColour, verticalSpace , sideAssets, icons = null} = props

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
   // Motion
   const ref = useRef(null)
   const { scrollYProgress } = useScroll()
   const transforms = {
        icons: { xs: useTransform(scrollYProgress, [0, 1], ["0%", "-950%"]), md: useTransform(scrollYProgress, [0, 1], ["0%", "-450%"]) },
        gallery: { xs: useTransform(scrollYProgress, [0, 1], ["0%", "-350%"]), md: useTransform(scrollYProgress, [0, 1], ["0%", "-450%"]) },
        product: useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]),
   }
   //! 

  // Duplicate images array for infinite effect
  const duplicatedImages = [...images, ...images,];

  const vs = images.length > 1 ? `vs${verticalSpace?.topPadding}-top vs${verticalSpace?.bottomPadding}-bottom` : ``
  return (

    <ModuleContainer {...props}>

      <Wrapper className={vs} {...props} ref={ref}>
        {sideAssets?.leftAsset && <LeftAsset><Asset>
          <Image
            crop={sideAssets?.leftAsset?.crop}
            hotspot={sideAssets?.leftAsset?.hotspot}
            asset={
              sideAssets?.leftAsset?._id && urlFor(sideAssets?.leftAsset).width(600).url() || sideAssets?.leftAsset?.asset
            }
            alt={sideAssets?.leftAsset?.asset?.altText}
            width={600}
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              height: "auto",
            }}
          />
          </Asset>
        </LeftAsset>}
        {sideAssets?.rightAsset && <RightAsset>
          <Asset>
          <Image
            crop={sideAssets?.rightAsset?.crop}
            hotspot={sideAssets?.rightAsset?.hotspot}
            asset={
              sideAssets?.rightAsset?._id && urlFor(sideAssets?.rightAsset).width(1200).url() || sideAssets?.rightAsset?.asset
            }
            alt={sideAssets?.rightAsset?.asset?.altText}
            width={1200}

            style={{
              objectFit: "contain",
              maxWidth: "100%",
              height: "auto",
            }}
          />
          </Asset>
        </RightAsset>
        }
        {images.length > 1 ? (

          <Images images={images}>
            <ImagesContainer
              sideAssets={sideAssets}
              icons={icons}
            >
              {duplicatedImages.map((image, index) => (
                <motion.div className="imageWrapper" style={{ x:  transforms[sideAssets ? 'gallery' : 'icons'][sm ? 'xs' : 'md']}} >
                <Image
                 
                  crop={image?.crop}
                  hotspot={image?.hotspot}
                  asset={
                    image?._id && urlFor(image).width(1200).url() || image?.asset
                  }
                  alt={image?.asset?.altText}
                  width={1200}
                />
                </motion.div>

              ))}
            </ImagesContainer >

          </Images>

        ) :
          <ImageContainer>
            <Image
              crop={images[0]?.crop}
              hotspot={images[0]?.hotspot}
              asset={
                images[0]._id && urlFor(images[0]).width(1440).url() || images[0]?.asset
              }
              alt={images[0]?.asset?.altText}
              width={1440}
              height={790}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
            <Description><span>{images[0]?.asset?.description}</span></Description>
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
    sideAssets {
      leftAsset {
          ...ImageFragment
      }
      rightAsset {
          ...ImageFragment
      }
    }
  }
`
