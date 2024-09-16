import React from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery, Typography } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Links } from "../components/links"
import { motion } from "framer-motion"
import { ModuleContainer } from "./moduleContainer"
import { styled } from '@mui/material/styles'
import mask from '../../static/assets/svg-mask.svg'


const Wrapper = styled('div')(({ borderDirection, backgroundColour, joiningColour, mirror }) => ({
  gridColumn: '1/25',
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  maskRepeat: 'no-repeat',
  maskSize: '100%',
  maskImage: `url(${mask})`,
  height: '100%',
}));

const BackgroundImage = styled('div')(({ definedImage, borderDirection, backgroundColour, joiningColour, mirror }) => ({
  gridColumn: '1/25',
  display: 'grid',
  gridRow: 1,
}));

const Content = styled('div')(({ alignment }) => ({
  gridRow: 1,
  gridColumn: alignment === 'left' ? '2/13' : '7/18',
  textAlign: alignment === 'left' ? 'left' : 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: alignment === 'left' ? 'start' : 'center',
  zIndex: 1,
  "& .header-title": {
    textTransform: 'uppercase',
  }
}));

// const MaskImage = styled('div')(({ mask }) => ({
//   gridColumn: '1/25',
//   display: 'grid',
//   gridTemplateColumns: 'subgrid',
//   gridRow: 1,
 
// }));

export const HeaderSection = props => {
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("md"))
  const {
    title,
    _rawText,
    textAlign,
    image,
    previewData,
    sanityConfig,
    links,
    alignment,
    backgroundColour,
    _type,
  } = props

  const definedTitle =
    (previewData && _type === previewData?._type && previewData?.title) ||
    title
  const definedText =
    (previewData && _type === previewData?._type && previewData?.text) ||
    _rawText
  const definedLinks =
    (previewData && _type === previewData?._type && previewData?.links) || links
  const definedImage =
    (previewData && _type === previewData?._type && previewData?.image) || image
  const definedBackgroundColour =
    (previewData &&
      _type === previewData?._type &&
      previewData?. backgroundColour) ||
      backgroundColour
  const definedTextAlign =
    (previewData && _type === previewData?._type && previewData?.alignment) ||
    alignment


  return (
    <ModuleContainer {...props}>
      
      <Wrapper backgroundColour={definedBackgroundColour} image={definedImage} mask={mask}>

        {definedImage && (
          <BackgroundImage>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                type: "smooth",
                duration: 0.5,
                delay: 0,
              }}
            >
              <Image
                  
                  // pass asset, hotspot, and crop fields
                  crop={definedImage?.crop}
                  hotspot={definedImage?.hotspot}
                  //loading="eager"
                  asset={
                    definedImage?._ref && urlFor(definedImage).width(1440).url() || definedImage.asset
                  }
                  width={mobile ? 600 : 1440}
                  height={mobile ? 400 : 584}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    //backgroundColor: theme.palette.text.mid,
                  }}
                  mask="url(#texture)"
                />

            </motion.div>
          </BackgroundImage>
        )}

        <Content alignment={alignment}>

          <Typography className="header-title" variant="h1" textAlign={definedTextAlign}>{definedTitle}</Typography>
          {definedText && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: 0, opacity: 1, transition: {
                  delay: 0.6,
                }
              }}
            >
              <RenderPortableText
                previewData={previewData}
                sanityConfig={sanityConfig}
                variant={false}
                textAlign={definedTextAlign}
                value={definedText}
              />
            </motion.div>
          )}

          {definedLinks && definedLinks.length > 0 && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: 0, opacity: 1, transition: {
                  delay: 0.7,
                }
              }}
            >

              <Links
                linkOne="primary"
                links={definedLinks}
                previewData={previewData}
                highlighted
              />

            </motion.div>
          )}
        </Content>

      </Wrapper>
     
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment HeaderSectionFragment on SanityHeaderSection {
    _key
    _type
    title
    _rawText(resolveReferences: { maxDepth: 10 })
    alignment
    backgroundColour {
      value
      label
    }
    links {
      ...LinkFragment
    }
    image{
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
  }
`
