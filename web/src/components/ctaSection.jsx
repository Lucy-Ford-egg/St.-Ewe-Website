import React from "react"
import { graphql } from "gatsby"
import { RenderPortableText } from "../components/renderPortableText"
import { useTheme } from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Links } from "../components/links"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "1/25",
    display: "grid",
    gridTemplateColumns: "subgrid",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      gridRowGap: "var(--ms4)",
    },
    [theme.breakpoints.up("lg")]: {
      gridRowGap: "unset",
    },
  }),
)

const BackgroundImage = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "1/25",
    display: "grid",
    gridRow: "1/1",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      gridRowGap: "var(--ms4)",
      height: "unset",
    },
    [theme.breakpoints.up("lg")]: {
      gridRowGap: "unset",
    },
  }),
)

const Content = styled("div")(({ mirror, theme }) => ({
  gridColumn: "2/24",
  display: "grid",
  gridRow: "1/1",
  gridTemplateRows: "subgrid",
  backgroundColor: "rgba(255,255,255,0.8)",
  borderRadius: "var(--ms1)",
  padding: "var(--ms3) var(--ms0)",
  marginTop: "var(--ms5)",
  marginBottom: "var(--ms5)",
  display: "flex",
  flexDirection: "column",
  "& .header-title": {
    textTransform: "uppercase",
  },
  [theme.breakpoints.up("sm")]: {
    gridColumn: "2/24",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: mirror ? "11/24" : "2/15",
    padding: "var(--ms4)",
  },
}))

const Actions = styled("div")(({ mirror, theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "var(--ms0)",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

const ImageAsset = styled("div")(({ mirror, theme }) => ({
  width: 122,
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

export const CtaSection = props => {
  const {
    image,
    asset,
    previewData,
    overlay,
    mirror,
    _type,
    _rawText,
    backgroundColour,
    sanityConfig,
    links,
  } = props

  const theme = useTheme()

  const definedOverlay =
    (_type === previewData?._type && previewData && previewData?.overlay) ||
    overlay

  const definedText =
    (_type === previewData?._type && previewData && previewData?.text) ||
    _rawText

  const definedImage = image?.asset && image
  const definedAsset = asset?.asset && asset

  const definedMirror =
    (previewData && _type === previewData?._type && previewData?.mirror) ||
    mirror

  const definedLinks =
    (previewData && _type === previewData?._type && previewData?.links) || links

  const definedBackgroundColour =
    (previewData &&
      _type === previewData?._type &&
      previewData?.backgroundColour) ||
    backgroundColour

  return (
    <ModuleContainer {...props}>
      <Wrapper
        theme={theme}
        backgroundColour={definedBackgroundColour}
        image={definedImage}
      >
        {definedImage && (
          <BackgroundImage>
            <Image
              // pass asset, hotspot, and crop fields
              crop={definedImage?.crop}
              hotspot={definedImage?.hotspot}
              asset={
                (definedImage?._ref && urlFor(definedImage).width(200).url()) ||
                definedImage.asset
              }
              width={1330}
              height={515}
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
          </BackgroundImage>
        )}

        {definedOverlay && (
          <div
            className="overlay"
            sx={{
              width: "100%",
              height: "100%",
              minHeight: "100%",
              gridColumn: "1/25",
              gridRow: "1/auto",
              position: "relative",
              zIndex: 1,
              backgroundColor: `rgba(0,40,86, ${definedOverlay})`,
            }}
          />
        )}

        {definedText && (
          <Content mirror={definedMirror}>
            <RenderPortableText
              previewData={previewData}
              sanityConfig={sanityConfig}
              variant={false}
              value={definedText}
            />
            <Actions>
              {definedLinks && definedLinks.length > 0 && (
                <Links
                  className="links"
                  linkOne="primary"
                  links={definedLinks}
                  previewData={previewData}
                  highlighted
                  backgroundColour={backgroundColour}
                />
              )}
              {definedAsset && (
                <ImageAsset>
                  <Image
                    // pass asset, hotspot, and crop fields
                    crop={definedAsset?.crop}
                    hotspot={definedAsset?.hotspot}
                    asset={
                      (definedAsset?._ref &&
                        urlFor(definedAsset).width(122).url()) ||
                      definedAsset.asset
                    }
                    width={122}
                    style={{
                      objectFit: "cover",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </ImageAsset>
              )}
            </Actions>
          </Content>
        )}
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment CtaSectionFragment on SanityCtaSection {
    _key
    _type
    backgroundColour {
      label
      value
    }
    mirror
    verticalSpace {
      bottomPadding
      topPadding
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
    _rawText(resolveReferences: { maxDepth: 10 })
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
    asset {
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
    links {
      ...LinkFragment
    }
    overlay
  }
`
