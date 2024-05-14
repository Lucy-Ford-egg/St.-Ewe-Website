import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { Container, Box, useTheme, useMediaQuery, Divider } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Links } from "../components/links"
import { LazyMotion, domAnimation} from "framer-motion"
import { Spiro } from "../components/spiro"
import { contrastColour } from "../utils/contrastColour"

export const HeaderSection = props => {
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("md"))
  const {
    _rawTitle,
    _rawText,
    textAlign,
    image,
    previewData,
    sanityConfig,
    links,
    spiro,
    backgroundColor,
    _type,
  } = props

  const [addSpiro, setAddSpiro] = useState(false)
  useEffect(() => {
    setAddSpiro(( previewData && _type === previewData?._type && previewData?.spiro) || spiro)
  }, [previewData, spiro])

  const definedTitle = ( previewData && _type === previewData?._type && previewData?.title) || _rawTitle
  const definedText = ( previewData && _type === previewData?._type && previewData?.text) || _rawText
  const definedLinks = ( previewData && _type === previewData?._type && previewData?.links) || links
  const definedImage = ( previewData && _type === previewData?._type && previewData?.image) || image
  const definedBackgroundColour =
    ( previewData && _type === previewData?._type && previewData?.backgroundColor) || backgroundColor
  const definedTextAlign = ( previewData && _type === previewData?._type && previewData?.textAlign) || textAlign

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
        minHeight: {xs: "78vh", sm: "min-content"},
        //maxHeight: (!addSpiro && !definedTitle && !definedText) && { xs: "55vh", sm: "65vh" },
        overflow: "hidden",
        px: "0 !important",
        position: "relative",
        pt: addSpiro && !definedImage ?  { xs: 15, md: 17 } : 0,
        pb: definedBackgroundColour && !definedImage && 15,
        backgroundColor: definedBackgroundColour?.value,
      }}
    >
      {addSpiro && (
        <Box
          sx={{
            position: "absolute",
            top: { xs: "5%", sm: "50%" },
            bottom: { xs: 0, sm: "unset" },
            mt: { xs: 6, md: 20 },
            transform: {
              xs: "translateX(-30px) rotate(180deg)",
              sm: "translateX(-150px) translateY(-50%) rotate(180deg)",
              md: "translateY(-50%)  rotate(180deg)",
            },
            left: 0,
            width: { xs: "85px", sm: "auto" },
            height: { xs: "239.91px", sm: "auto" },
            zIndex: 0,
            opacity: contrastColour(definedBackgroundColour).spiro.opacity,
            svg: {
              width: "100%",
              height: "auto",
              path: {
                stroke: contrastColour(definedBackgroundColour).spiro.fill,
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
          alignItems: definedTextAlign ? definedTextAlign : "flexstart",
          justifyContent: "center",
          py: !definedImage ? { xs: 20, sm: 0, md: 20 } : { xs: 20, sm: 20, md: 20 } ,

        }}
      >
        <Box>
          <Box
            sx={{
              maxWidth: 800,
              margin: definedTextAlign ? "0 auto" : "unset",
              mt:  {xs: "9vh", md: "9vh"}
            }}
          >
            <LazyMotion features={domAnimation}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <RenderPortableText
                previewData={previewData}
                sanityConfig={sanityConfig}
                variant={false}
                textAlign={definedTextAlign}
                value={definedTitle}
              />
            </LazyMotion>

            {addSpiro && (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: definedTextAlign
                    ? definedTextAlign
                    : "flexstart",
                }}
              >
                <Divider
                  sx={{
                    display: "flex",
                    my: 10,
                    width: "19.1875rem",
                    borderColor: contrastColour(definedBackgroundColour).divider
                      .hex,
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
            {definedText && (
              <RenderPortableText
                previewData={previewData}
                sanityConfig={sanityConfig}
                variant={false}
                textAlign={definedTextAlign}
                value={definedText}
              />
            )}
          </Box>
          {definedLinks && definedLinks.length > 0 && (
            <Box
              sx={{
                pt: 8,
              }}
            >
              <Links
                linkOne="secondary"
                links={definedLinks}
                previewData={previewData}
                highlighted
              />
            </Box>
          )}
        </Box>
      </Container>
      {definedImage && (
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
          {definedImage && (
            <Box sx={{
              height: "100%",
              flexGrow: 1,
              gridColumn: "1/25",
              gridRow: "1/auto",
            }}>
            <LazyMotion features={domAnimation} 
            
            initial={{
              opacity: 0,
            }} 
            animate={{
              opacity: 1
            }}
            transition={{
              type: "smooth",
              duration: 1,
              delay: 1,
            }}>
            <Image
              // pass asset, hotspot, and crop fields
              crop={definedImage?.crop}
              hotspot={definedImage?.hotspot}
              //loading="eager"
              asset={
                (definedImage &&
                  definedImage &&
                  definedImage?._ref &&
                  urlFor(definedImage).width(1440).url()) ||
                definedImage.asset
              }
              width={mobile ? 600 : 1440}
              height={mobile ? 400 : 708}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                //backgroundColor: theme.palette.text.mid,
              }}
            />
            </LazyMotion>
            </Box>
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
      )}
      {addSpiro && (
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
            mt: { xs: 6, md: 20 },
            width: { xs: "85px", sm: "auto" },
            height: { xs: "239.91px", sm: "auto" },
            display: "flex",
            alignItems: { xs: "flex-end", sm: "unset" },
            zIndex: 0,
            opacity: contrastColour(definedBackgroundColour).spiro.opacity,
            svg: {
              width: "100%",
              height: "auto",
              path: {
                stroke: contrastColour(definedBackgroundColour).spiro.fill,
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
