import React, { useState } from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery, Typography } from "@mui/material"
import { RenderPortableText } from "../components/utils/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { contrastBrandPalette } from "../utils/colours"
import { Links } from "../components/links"
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
    alignItems: "center",
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
    gridRow: "1/1",
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    width: 66,
    height: 73.19,
  },
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

const HotspotDetail = styled(motion.div)(
  ({ mirror, x, y, theme, backgroundColour }) => ({
    zIndex: 1,
    gridColumn: "20/25",
    gridRow: "1/1",
    maxHeight: "fit-content",
    backgroundColor: " var(--quirky-quail-secondary)",
    padding: "var(--ms2) var(--ms1)",
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

const DetailImage = styled(motion.div)(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "1/25",
    display: "grid",
    gridRow: "1/1",
    gridTemplateRows: "subgrid",
    overflow: "hidden",
    position: "relative",
    zIndex: 0,
    paddingBottom: "var(--ms-3)",
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {
      gridRow: "1/1",
    },
  }),
)

const Title = styled(Typography)(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    paddingTop: "var(--ms0)",
    paddingBottom: "var(--ms0)",
    borderBottom: "1px solid var(--rich-yolk-primary)",
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

export const HotspotSection = props => {
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const { hotspotData, previewData, sanityConfig, backgroundColour } = props

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
                  onClick={() => setSpotSelected(node)}
                  key={node?._key}
                  x={node?.x}
                  y={node?.y}
                >
                  <svg
                    width="67"
                    height="74"
                    viewBox="0 0 67 74"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M25.1086 0.703554C31.9868 2.52596 33.1011 12.3754 39.2063 16.0303C46.4126 20.3444 57.6834 16.4891 62.7128 23.2158C67.725 29.9194 66.7425 40.2785 62.8935 47.7112C59.2203 54.8043 49.988 56.0959 43.3696 60.5684C37.0761 64.8213 32.6224 74.3571 25.1086 73.2448C17.3652 72.0985 15.434 61.6762 10.3941 55.6869C6.89651 51.5304 1.15914 48.8849 0.122908 43.5524C-0.883836 38.3718 4.60735 34.21 5.20151 28.9659C6.05572 21.4266 -0.0799881 12.9822 4.28936 6.77896C8.55676 0.72047 17.9452 -1.1944 25.1086 0.703554Z"
                      fill="white"
                    />
                  </svg>
                </Hotspot>
              )
            })}
          </FeatureImage>
        )}

        {spotSelected && (
          <HotspotDetail
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
          >
            {spotSelected?.image && (
              <DetailImage>
                <Image
                  crop={spotSelected?.image?.crop}
                  hotspot={spotSelected?.image?.hotspot}
                  asset={
                    (spotSelected?.image?._ref &&
                      urlFor(spotSelected?.image).width(1440).url()) ||
                    spotSelected?.image?.asset
                  }
                  width={mobile ? 362 : tablet ? 732 : 732}
                  height={mobile ? 241 : tablet ? 438 : 438}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </DetailImage>
            )}
            {spotSelected?.title && (
              <Title variant="h4">{spotSelected?.title}</Title>
            )}
            {spotSelected?.text && (
              <RenderPortableText variant={false} value={spotSelected?.text} />
            )}
            {spotSelected?.links && spotSelected?.links.length > 0 && (
              <Links
                className="links"
                linkOne="primary"
                links={spotSelected?.links}
                previewData={previewData}
                highlighted
                backgroundColour={backgroundColour}
              />
            )}
          </HotspotDetail>
        )}
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
      links {
        ...LinkFragment
      }
    }
  }
`
