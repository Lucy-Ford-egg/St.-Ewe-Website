import React from "react"
import { graphql } from "gatsby"
import { ModuleContainer } from "./moduleContainer"
import { Typography, useTheme } from "@mui/material"
import { RenderPortableText } from "../components/utils/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { styled } from "@mui/material/styles"
import { ButtonFormat } from "./buttonFormat"
import { contrastBrandPalette } from "../utils/colours"

const Wrapper = styled("div")(({ backgroundColour }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  backgroundColor: backgroundColour?.value,
}))

const Container = styled("div")({
  gridColumn: "2/24",
  display: "grid",
  gridTemplateColumns: "repeat(22, 1fr)",
})

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
    color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
    gridColumn: alignment === "left" ? "2/17" : "7/17",
    textAlign: alignment === "left" ? "left" : "center",
    justifyContent: alignment === "left" ? "start" : "center",
  },
}))

const RightAsset = styled("div")(({ alignment, theme }) => ({
  display: "none",

  [theme.breakpoints.up("lg")]: {
    display: "grid",
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

const Asset = styled("div")({
  maxWidth: 200,
})

export const TitleSection = props => {
  const theme = useTheme()

  const {
    rawTitle,
    alignment,
    sideAssets,
    link,
    isPost,
    isRecipe,
    pageData,
    backgroundColour,
    pageContext,
  } = props

  return (
    <ModuleContainer {...props}>
      <Wrapper backgroundColour={backgroundColour}>
        <Container>
          <LeftAsset alignment={alignment} theme={theme}>
            {sideAssets?.leftAsset && (
              <Asset>
                <Image
                  // pass asset, hotspot, and crop fields
                  crop={sideAssets?.leftAsset.crop}
                  hotspot={sideAssets?.leftAsset?.hotspot}
                  alt={sideAssets?.leftAsset?.asset?.altText}
                  asset={
                    (sideAssets?.leftAsset?._ref &&
                      urlFor(sideAssets?.leftAsset).width(206).url()) ||
                    sideAssets?.leftAsset.asset
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
            {rawTitle && !isRecipe && (
              <RenderPortableText
                previewData={rawTitle}
                //   sanityConfig={sanityConfig}
                setAsHeading={false}
                value={rawTitle}
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
            {isPost && (
              <Typography
                variant="body"
                sx={{
                  fontWeight: 900,
                }}
              >
                {pageContext?.date}
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
              >{`${pageData?.sanityRecipes?.serves?.serves ? "Serves: " + pageData?.sanityRecipes?.serves?.serves : ""} ${pageData?.sanityRecipes?.serves?.note ? pageData?.sanityRecipes?.serves?.note : ""}`}</Typography>
            )}
          </Content>

          <RightAsset alignment={alignment} theme={theme}>
            {link && (
              <ButtonFormat
                key={link._key}
                variant="outlined"
                color="primary"
                node={link}
                size="large"
              />
            )}

            {sideAssets?.rightAsset && !link && (
              <Asset>
                <Image
                  // pass asset, hotspot, and crop fields
                  crop={sideAssets?.rightAsset.crop}
                  hotspot={sideAssets?.rightAsset?.hotspot}
                  alt={sideAssets?.rightAsset?.asset?.altText}
                  asset={
                    (sideAssets?.rightAsset?._ref &&
                      urlFor(sideAssets?.rightAsset).width(206).url()) ||
                    sideAssets?.rightAsset.asset
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
    rawTitle: _rawTitle(resolveReferences: { maxDepth: 10 })
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
