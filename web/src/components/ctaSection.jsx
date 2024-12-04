import React from "react"
import { graphql } from "gatsby"
import { RenderPortableText } from "../components/utils/renderPortableText"
import { useTheme } from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Links } from "../components/links"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"
import { MailChimp } from "./mailChimp"
import { Texture } from "../components/texture"

const Wrapper = styled("div")(({ theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    gridRowGap: "var(--ms4)",
  },
  [theme.breakpoints.up("lg")]: {
    gridRowGap: "unset",
  },
}))

const BackgroundImage = styled("div")(({ theme }) => ({
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
}))

const Content = styled("div")(({ alignment, theme, showForm }) => ({
  gridColumn: "2/24",
  gridRow: "1/1",
  zIndex: 2,
  gridTemplateColumns: "repeat(22, 1fr)",
  backgroundColor: !showForm ? "rgba(255,255,255,0.8)" : "unset",
  borderRadius: "var(--ms1)",
  padding: !showForm ? "var(--ms3) var(--ms0)" : "var(--ms3) 0",
  marginTop: "var(--ms5)",
  marginBottom: "var(--ms5)",
  display: "flex",
  flexDirection: "column",
  textAlign:
    alignment === "right" ? "left" : alignment === "center" ? "center" : "left",
  alignItems:
    alignment === "unset"
      ? "start"
      : alignment === "center"
        ? "center"
        : "unset",
  "& .header-title": {
    textTransform: "uppercase",
  },
  [theme.breakpoints.up("sm")]: {
    gridColumn: "2/24",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn:
      alignment === "right"
        ? "11/24"
        : alignment === "center"
          ? "7/19"
          : "2/15",
    padding: "var(--ms4)",
  },
}))

const Actions = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "var(--ms0)",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

const ImageAsset = styled("div")(({ theme }) => ({
  width: 122,
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

const ShowForm = styled("div")(({ theme }) => ({
  backgroundColor: "var(--original-large)",
  padding: "var(--ms4) var(--ms4)",
  width: "100%",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {
    borderRadius: "var(--ms2)",
  },
}))

const ShowTexture = styled("div")(({ theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridRow: "1/1",
  zIndex: 1,
  height: "100%",
  pointerEvents: "none",
  mixBlendMode: "multiply",
  opacity: 0.2,
  overflowX: "hidden",
  [theme.breakpoints.up("sm")]: {
    gridRowGap: "var(--ms4)",
  },
  [theme.breakpoints.up("lg")]: {
    gridRowGap: "unset",
  },
  "& svg": {
    width: "unset",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    "& g": {
      "&:first-of-type": {
        transform: "scale(0.7) translateX(17%)",
        [theme.breakpoints.up("sm")]: {
          transform: "unset",
        },
      },
      "&:last-of-type": {
        display: "none",
        [theme.breakpoints.up("sm")]: {
          display: "block",
        },
      },
    },
  },
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

export const CtaSection = props => {
  const {
    image,
    asset,
    previewData,
    overlay,
    alignment,
    showForm,
    text,
    backgroundColour,
    sanityConfig,
    links,
  } = props

  const theme = useTheme()

  return (
    <ModuleContainer {...props}>
      <Wrapper theme={theme} backgroundColour={backgroundColour} image={image}>
        {!image && (
          <ShowTexture>
            <Texture backgroundColour={backgroundColour} />
          </ShowTexture>
        )}
        {image && (
          <BackgroundImage>
            <Image
              // pass asset, hotspot, and crop fields
              crop={image?.crop}
              hotspot={image?.hotspot}
              alt={image?.asset?.altText}
              asset={
                (image?._ref && urlFor(image).width(200).url()) || image.asset
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

        {overlay && (
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
              backgroundColor: `rgba(0,40,86, ${overlay})`,
            }}
          />
        )}

        {text && (
          <Content alignment={alignment} showForm={showForm}>
            {asset && showForm && (
              <ImageAsset alignment={alignment}>
                <Image
                  // pass asset, hotspot, and crop fields
                  crop={asset?.crop}
                  hotspot={asset?.hotspot}
                  alt={image?.asset?.altText}
                  asset={
                    (asset?._ref && urlFor(asset).width(122).url()) ||
                    asset.asset
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

            <RenderPortableText
              previewData={previewData}
              sanityConfig={sanityConfig}
              variant={false}
              value={text}
            />
            <Actions>
              {links && links.length > 0 && (
                <Links
                  className="links"
                  linkOne="primary"
                  links={links}
                  previewData={previewData}
                  highlighted
                  backgroundColour={backgroundColour}
                />
              )}
              {asset && !showForm && (
                <ImageAsset alignment={alignment}>
                  <Image
                    // pass asset, hotspot, and crop fields
                    crop={asset?.crop}
                    hotspot={asset?.hotspot}
                    alt={image?.asset?.altText}
                    asset={
                      (asset?._ref && urlFor(asset).width(122).url()) ||
                      asset.asset
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
            {showForm && (
              <ShowForm>
                <MailChimp />
              </ShowForm>
            )}
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
    alignment
    showForm
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
    text: _rawText(resolveReferences: { maxDepth: 10 })
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
