import React, {useState, useEffect} from "react"
import { graphql } from "gatsby"
import {
  Container,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import {Links} from '../components/links'
import {motion} from 'framer-motion'

import { STUDIO_ORIGIN } from "../../sanity/store"
import { useEncodeDataAttribute } from "@sanity/react-loader"

export const HeaderSection = props => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const {
    _rawTitle,
    _rawText,
    textAlign,
    image,
    linkGroup,
    previewData,
    sanityConfig,
    links,
  } = props

  const data = previewData
  const encodeDataAttribute = useEncodeDataAttribute(
    data,
    // sourceMap,
    STUDIO_ORIGIN,
  )

  const [rendered, setRendered] = useState(false);
useEffect(()=>{
   setRendered(true)
},[])

  return (
    <Container
      maxWidth="fluid"
      disableGutters
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(24, 1fr)",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "100vh",
        maxHeight: { xs: "", md: "100vh" },
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          gridColumn: "1/25",
          gridRow: "1/auto",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: textAlign ? textAlign : "flexstart",
          justifyContent: "center",
          pt: {xs: 16, md: 20},
        }}
      >
        <Box
          sx={{
            maxWidth: 660,
          }}
        >
          {_rawTitle && rendered && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              
            >
            <RenderPortableText
              previewData={previewData}
              sanityConfig={sanityConfig}
              variant={false}
              textAlign={textAlign}
              value={
                previewData && previewData._rawTitle ? _rawTitle : _rawTitle
              }
            />
            </motion.div>
         
          )}
        </Box>
        <Box
          sx={{
            maxWidth: 750,
            pb: 8,
          }}
        >
          {_rawText && (
            <RenderPortableText
              previewData={previewData}
              sanityConfig={sanityConfig}
              variant={false}
              textAlign={textAlign}
              value={previewData && previewData._rawText ? _rawText : _rawText}
            />
          )}
        </Box>
        <Links linkOne="secondary" links={links} previewData={previewData} highlighted/>
      </Container>

      <Box
        sx={{
          gridColumn: "1/25",
          gridRow: "1/auto",
          display: "grid",
          gridTemplateColumns: "repeat(24, 1fr)",
          height: "100%",
          maxHeight: "100%",
        }}
      >
        {image && (
          <Image
            // pass asset, hotspot, and crop fields
            crop={(previewData && previewData?.image?.crop) || image?.crop}
            hotspot={
              (previewData && previewData?.image?.hotspot) || image?.hotspot
            }
            asset={
              (previewData &&
                previewData.image &&
                previewData.image?._ref &&
                urlFor(previewData.image).width(200).url()) ||
              image.asset
            }
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              flexGrow: 1,
              minHeight: "100%",
              gridColumn: "1/25",
              gridRow: "1/auto",
            }}
          />
        )}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            gridColumn: "1/25",
            gridRow: "1/auto",
            width: "100%",
            height: "100%",
            //backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
      </Box>
    </Container>
  )
}

export const query = graphql`
  fragment HeaderSectionFragment on SanityHeaderSection {
    _key
    _type
    _rawTitle(resolveReferences: { maxDepth: 10 })
    _rawText(resolveReferences: { maxDepth: 10 })
    textAlign
    links {
      link {
        internal {
          ... on SanityPage {
            id
            slug {
              current
            }
          }
          ... on SanityPost {
            id
            slug {
              current
            }
          }
        }
        external
      }
      text
    }
    image {
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
