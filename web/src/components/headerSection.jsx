import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { Container, Box, useTheme, useMediaQuery, Divider } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Links } from "../components/links"
import { motion } from "framer-motion"
import { Spiro } from "../components/spiro"
import { contrastColour } from "../utils/contrastColour"

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
    spiro,
    backgroundColor,
  } = props

  const data = previewData
  const encodeDataAttribute = useEncodeDataAttribute(
    data,
    // sourceMap,
    STUDIO_ORIGIN,
  )

  const [rendered, setRendered] = useState(false)
  useEffect(() => {
    setRendered(true)
  }, [])

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
        maxHeight: { xs: "", md: "" },
        overflow: "hidden",
        px: "0 !important",
        position: "relative",
        pt: spiro ? 17 : 0,
        pb: 15,
        backgroundColor: previewData && previewData.backgroundColor.value || backgroundColor.value,
      }}
    >
      {spiro && (
        <Box
          sx={{
            position: "absolute",
            top: { xs:"5%", sm: "50%" },
            bottom: { xs: 0, sm: "unset" },
            transform: {
              xs: "translateX(-30px) rotate(180deg)",
              sm: "translateX(-150px) translateY(-50%) rotate(180deg)",
              md: "translateY(-50%)  rotate(180deg)",
            },
            left: 0,
            width: { xs: "85px", sm: "auto" },
            height: { xs: "239.91px", sm: "auto" },
            zIndex: 0,
            opacity: contrastColour(previewData && previewData.backgroundColor || backgroundColor).spiro.opacity,
            svg: {
              width: "100%",
              height: "auto",
              path: {
                stroke: contrastColour(previewData && previewData.backgroundColor || backgroundColor).spiro.fill,
              },
            },
          }}
        >
          <Spiro />
        </Box>
      )}
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
          pt: { xs: 20, md: 20 },
        }}
      >
        <Box>
          <Box
            sx={{
              maxWidth: 800,
              margin: textAlign ? "0 auto" : "unset",
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
            {spiro && (
              <Box sx={{display: 'flex', width: '100%', justifyContent: textAlign ? textAlign : "flexstart",}}>
              <Divider
                sx={{
                  display: "flex",
                  my: 10,
                  width: "19.1875rem",
                  borderColor: contrastColour(previewData && previewData.backgroundColor || backgroundColor).divider.hex,
                }}
              />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              maxWidth: 750,
            }}
          >
            {_rawText && (
              <RenderPortableText
                previewData={previewData}
                sanityConfig={sanityConfig}
                variant={false}
                textAlign={textAlign}
                value={
                  previewData && previewData._rawText ? _rawText : _rawText
                }
              />
            )}
          </Box>
          {links && links.length > 0 && <Box sx={{
            pt: 8,
          }}>
          <Links
            linkOne="secondary"
            links={links}
            previewData={previewData}
            highlighted
          />
          </Box>}
        </Box>
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
            width={1440}
            height={700}
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
      {spiro && (
        <Box
          sx={{
            position: "absolute",
            top: { xs: "5%", sm: "50%" },
            bottom: { xs: 0, sm: "unset" },
            transform: {
              xs: "translateX(30px)",
              sm: "translateX(150px) translateY(-50%)",
              md: "translateY(-50%)",
            },
            right: 0,
            width: { xs: "85px", sm: "auto" },
            height: { xs: "239.91px", sm: "auto" },
            display: "flex",
            alignItems: { xs: "flex-end", sm: "unset" },
            zIndex: 0,
            opacity: contrastColour(previewData && previewData.backgroundColor || backgroundColor).spiro.opacity,
            svg: {
              width: "100%",
              height: "auto",
              path: {
                stroke: contrastColour(previewData && previewData.backgroundColor || backgroundColor).spiro.fill,
              },
            },
          }}
        >
          <Spiro />
        </Box>
      )}
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
    spiro
    backgroundColor {
      value
      label
    }
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
