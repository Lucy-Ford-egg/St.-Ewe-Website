import React from "react"
import { graphql } from "gatsby"
import { ModuleContainer } from "./moduleContainer"
import { useMediaQuery, useTheme } from "@mui/material"
import { RenderPortableText } from "../components/utils/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { styled } from "@mui/material/styles"
import { ButtonFormat } from "./buttonFormat"
import { contrastBrandPalette } from "../utils/colours"

const Wrapper = styled("div")(({ theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridTemplateColumns: "repeat(22, 1fr)",
  [theme.breakpoints.up("sm")]: {
    gridColumn: "2/24",
  },
}))

const LeftAsset = styled("div")(({ alignment }) => ({
  display: "grid",
  gridColumn: "2/5",
  alignItems: "center",
  justifyContent: "start",
}))

const Content = styled("div")(({ theme, alignment, backgroundColour }) => ({
  gridColumn: "2/24",
  display: "flex",
  justifyContent: "center",
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  [theme.breakpoints.up("sm")]: {
    gridColumn: "1/25",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: "5/19",
    color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  },
}))

const RightAsset = styled("div")(({ theme }) => ({
  display: "grid",
  gridColumn: "5/19",
  gridRow: "2/2",
  justifyContent: "start",
  [theme.breakpoints.up("sm")]: {
    gridRow: "1/1",
    gridColumn: "19/24",
  },
  [theme.breakpoints.up("lg")]: {
    alignItems: "center",
    justifyContent: "end",
    height: "100%",
    gridColumn: "19/24",
  },
}))

const Actions = styled("div")(({ theme, alignment }) => ({
  justifyContent: "start",
  gridColumn: "2/24",
  alignItems: "center",
  gridRow: "2/2",
  paddingTop: "unset",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
    width: "100%",
    gridColumn: "5/19",
    gridRow: "auto",
    paddingTop: "var(--ms0)",
  },
}))

const Asset = styled("div")({
  maxWidth: 200,
})

export const TextSection = props => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up("sm"))

  const { text, sideAssets, link, backgroundColour } = props

  return (
    <ModuleContainer {...props}>
      <Wrapper>
        {sm && (
          <LeftAsset>
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
        )}
        <Content backgroundColour={backgroundColour}>
          {text && (
            <RenderPortableText
              previewData={text}
              //   sanityConfig={sanityConfig}
              setAsHeading={false}
              value={text}
            />
          )}
        </Content>

        {link && (
          <Actions>
            <ButtonFormat
              key={link._key}
              variant="outlined"
              color="primary"
              node={link}
              size="large"
            />
          </Actions>
        )}

        <RightAsset>
          {sideAssets?.rightAsset && !link && sm && (
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
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment TextSectionFragment on SanityTextSection {
    _key
    _type
    text: _rawText(resolveReferences: { maxDepth: 10 })
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
