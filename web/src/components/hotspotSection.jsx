import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery } from "@mui/material"
import { RenderPortableText } from "../components/utils/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { contrastBrandPalette } from "../utils/colours"
import { motion } from "framer-motion"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "1/25",
    display: "grid",
    gridTemplateColumns: "subgrid",
    overflowX: "hidden",
    gridRowGap: "var(--ms4)",
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {
      gridRowGap: "unset",
    },
  }),
)

const FeatureImage = styled(motion.div)(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "1/25",
    display: "grid",
    gridRow: "2/4",
    gridTemplateRows: "subgrid",
    overflow: "hidden",
    position: "relative",
    zIndex: 0,
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {
      gridRow: "1/1",
    },
  }),
)

const Content = styled("div")(({ mirror, theme, backgroundColour }) => ({
  gridColumn: "2/24",
  display: "grid",
  gridRow: "1/2",
  gridTemplateRows: "subgrid",
  alignItems: "center",
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  "& .header-title": {
    textTransform: "uppercase",
  },
  [theme.breakpoints.up("sm")]: {
    gridColumn: "2/24",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: mirror ? "14/24" : "2/14",
  },
}))

const Hotspot = styled("div")(({ mirror, x, y, theme, backgroundColour }) => ({
  left: `${x}%`,
  top: `${y}%`,
  position: "absolute",
  zIndex: 1,
  backgroundColor: "var(--rich-yolk-primary)",
  border: "2px solid var(--quirky-quail-secondary)",
  width: 32,
  height: 32,
  borderRadius: "99999px",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

const HotspotDetail = styled(motion.div)(
  ({ mirror, x, y, theme, backgroundColour }) => ({
    right: 0,
    top: "50%",
    position: "absolute",
    transform: "translateY(50%)",
    zIndex: 1,
    backgroundColor: " var(--quirky-quail-secondary)",
    padding: "var(--ms2) var(--ms1)",
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

export const HotspotSection = props => {
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const { hotspotData, previewData, sanityConfig, links, backgroundColour } =
    props

  const [spotSelected, setSpotSelected] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false) // Track image load state
  return (
    <ModuleContainer {...props}>
      <Wrapper theme={theme} backgroundColour={backgroundColour}>
        {hotspotData && (
          <FeatureImage theme={theme}>
            {hotspotData?.featureImage && (
              <Image
                onClick={() => setSpotSelected(null)}
                crop={hotspotData?.featureImage?.crop}
                hotspot={hotspotData?.featureImage?.hotspot}
                asset={
                  (hotspotData?.featureImage?._ref &&
                    urlFor(hotspotData?.featureImage).width(1440).url()) ||
                  hotspotData?.featureImage?.asset
                }
                width={mobile ? 362 : tablet ? 732 : 732}
                height={mobile ? 241 : tablet ? 438 : 438}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                onLoad={() => setImageLoaded(true)}
              />
            )}
            {hotspotData?.hotspots?.map((node, i) => {
              return (
                <Hotspot
                  onClick={() => setSpotSelected(i)}
                  key={node?._key}
                  x={node?.x}
                  y={node?.y}
                />
              )
            })}
            {spotSelected && (
              <HotspotDetail
                initial={{
                  x: "100%",
                }}
                animate={{
                  x: 0,
                }}
              >
                {hotspotData?.hotspots?.[spotSelected]?.details}
              </HotspotDetail>
            )}
          </FeatureImage>
        )}

        {/* {imageLoaded && (
          <Content
            theme={theme}
            backgroundColour={backgroundColour}
          >
              {text && (
                <RenderPortableText
                  previewData={previewData}
                  sanityConfig={sanityConfig}
                  variant={false}
                  value={text}
                />
              )}
          </Content>
        )} */}
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment HotspotSectionFragment on SanityHotspotSection {
    _key
    _type
    backgroundColour {
      label
      value
    }
    verticalSpace {
      bottomPadding
      topPadding
    }

    hotspotData {
      featureImage {
        ...ImageFragment
      }
      hotspots {
        _key
        details
        x
        y
      }
    }
  }
`
