import React from "react"
import { graphql } from "gatsby"
import { ModuleContainer } from "./moduleContainer"
import { Typography, useTheme, useMediaQuery } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { styled } from "@mui/material/styles"
import { ButtonFormat } from "./buttonFormat"
import { contrastBrandPalette } from "../utils/colours"

const Wrapper = styled("div")(
  ({ borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "1/25",
    display: "grid",
    gridTemplateColumns: "subgrid",
    backgroundColor: backgroundColour?.value,
  }),
)

const Container = styled("div")(
  ({ borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "2/24",
    display: "grid",
    gridTemplateColumns: "subgrid",
  }),
)

const LeftAsset = styled("div")(({ alignment, theme }) => ({
  display: "none",
  [theme.breakpoints.up("lg")]: {
    display: alignment === "left" ? "none" : "grid",
    gridColumn: "2/6",
    alignItems: "center",
    justifyContent: "start",
  },
}))

const Content = styled("div")(({ alignment, theme, backgroundColour }) => ({
  gridColumn: "1/17",
  textAlign: "left",
  justifyContent: "start",
  display: "flex",
  flexDirection: "column",
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  [theme.breakpoints.up("lg")]: {
    gridColumn: alignment === "left" ? "2/17" : "7/17",
    textAlign: alignment === "left" ? "left" : "center",
    justifyContent: alignment === "left" ? "start" : "center",
  },
}))

const RightAsset = styled("div")(({ alignment, theme }) => ({
  display: "none",

  [theme.breakpoints.up("lg")]: {
    display: "grid",
    gridColumn: "17/24",
    alignItems: "center",
    gridRow: "1/1",
    justifyContent: alignment === "left" ? "end" : "end",
    gridColumn: alignment === "left" ? "17/22" : "17/22",
  },
  "& .button": {
    display: "flex",
    justifySelf: "end",
  },
}))

const Asset = styled("div")(({}) => ({
  maxWidth: 200,
}))

export const TitleSection = props => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down("sm"))

  const {
    _rawTitle,
    _type,
    alignment,
    previewData,
    sideAssets,
    link,
    isPost,
    isRecipe,
    pageData,
    backgroundColour,
  } = props

  const definedText =
    (previewData && _type === previewData?._type && previewData?.title) ||
    _rawTitle
  const definedLeftImage =
    (previewData &&
      _type === previewData?._type &&
      previewData?.sideAssets?.leftAsset) ||
    sideAssets?.leftAsset
  const definedRightImage =
    (previewData &&
      _type === previewData?._type &&
      previewData?.sideAssets?.rightAsset) ||
    sideAssets?.rightAsset
  const definedLink =
    (_type === previewData?._type && previewData && previewData?.link) || link
  const definedIsPost = isPost

  return (
    <ModuleContainer {...props}>
      <Wrapper backgroundColour={backgroundColour}>
        <Container>
          <LeftAsset alignment={alignment} theme={theme}>
            {definedLeftImage && (
              <Asset>
                <Image
                  // pass asset, hotspot, and crop fields
                  crop={definedLeftImage.crop}
                  hotspot={definedLeftImage?.hotspot}
                  asset={
                    (definedLeftImage?._ref &&
                      urlFor(definedLeftImage).width(206).url()) ||
                    definedLeftImage.asset
                  }
                  width={206}
                  height={206}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    flexGrow: 1,
                    minHeight: "100%",
                  }}
                />
              </Asset>
            )}
          </LeftAsset>

          <Content alignment={alignment} backgroundColour={backgroundColour}>
            {definedText && (
              <RenderPortableText
                previewData={definedText}
                //   sanityConfig={sanityConfig}
                setAsHeading={false}
                value={definedText}
              />
            )}
            {isRecipe && (
              <Typography
                color={
                  contrastBrandPalette[backgroundColour?.label]?.contrastText
                }
                variant="h2"
                component="h1"
              >
                {pageData?.sanityRecipes?.title}
              </Typography>
            )}
            {definedIsPost && (
              <Typography
                variant="body"
                sx={{
                  fontWeight: 900,
                }}
              >
                July 26th 2024
              </Typography>
            )}
            {isRecipe && (
              <Typography
                color={
                  contrastBrandPalette[backgroundColour?.label]?.contrastText
                }
                variant="body"
                sx={{
                  fontWeight: 900,
                }}
              >{`${pageData?.sanityRecipes?.serves?.serves ? "Serves " + pageData?.sanityRecipes?.serves?.serves : ""} ${pageData?.sanityRecipes?.serves?.note ? pageData?.sanityRecipes?.serves?.note : ""}`}</Typography>
            )}
          </Content>

          <RightAsset alignment={alignment} theme={theme}>
            {definedLink && (
              <ButtonFormat
                key={definedLink._key}
                variant="outlined"
                color="primary"
                node={definedLink}
                size="large"
              />
            )}

            {definedRightImage && !definedLink && (
              <Asset>
                <Image
                  // pass asset, hotspot, and crop fields
                  crop={definedRightImage.crop}
                  hotspot={definedRightImage?.hotspot}
                  asset={
                    (definedRightImage?._ref &&
                      urlFor(definedRightImage).width(206).url()) ||
                    definedRightImage.asset
                  }
                  width={206}
                  height={206}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    flexGrow: 1,
                    minHeight: "100%",
                  }}
                />
              </Asset>
            )}
          </RightAsset>
        </Container>
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment TitleSectionFragment on SanityTitleSection {
    _key
    _type
    _rawTitle(resolveReferences: { maxDepth: 10 })
    alignment
    isPost
    isRecipe
    link {
      ...LinkFragment
    }
    sideAssets {
      leftAsset {
        ...ImageFragment
      }
      rightAsset {
        ...ImageFragment
      }
    }
    verticalSpace {
      topPadding
      bottomPadding
    }
    backgroundColour {
      label
      value
    }
  }
`
