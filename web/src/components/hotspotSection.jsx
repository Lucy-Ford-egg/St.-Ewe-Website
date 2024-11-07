import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery, Typography } from "@mui/material"
import { RenderPortableText } from "../components/utils/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Links } from "../components/links"
import { motion } from "framer-motion"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"
import { LiaTimesCircle } from "react-icons/lia"

const Wrapper = styled("div")(({ theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridTemplateColumns: "repeat(22, 1fr)",
  overflowX: "hidden",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {
    gridRowGap: "unset",
  },
}))

const FeatureImage = styled(motion.div)(({ theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridRow: "1/1",
  //gridTemplateColumns: "repeat(22, 1fr)",
  overflow: "hidden",
  position: "relative",
  zIndex: 0,
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {
    gridRow: "1/1",
  },
}))

const Hotspot = styled("div")(({ x, y, theme }) => ({
  left: `${x}%`,
  top: `${y}%`,
  position: "absolute",
  zIndex: 1,
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

const HotspotDetail = styled(motion.div)(({ theme }) => ({
  gridColumn: "1/25",
  maxHeight: "fit-content",
  backgroundColor: " var(--quirky-quail-secondary)",
  gridTemplateColumns: "repeat(8, 1fr)",
  padding: "var(--ms2) var(--ms1)",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {
    zIndex: 1,
    gridColumn: "18/25",
    gridRow: "1/1",
  },
}))

const DetailImage = styled(motion.div)(({ theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridRow: "1/1",
  overflow: "hidden",
  position: "relative",
  zIndex: 0,
  paddingBottom: "var(--ms-3)",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {
    gridRow: "1/1",
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  paddingTop: "var(--ms0)",
  paddingBottom: "var(--ms0)",
  borderBottom: "1px solid var(--rich-yolk-primary)",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

const Close = styled(LiaTimesCircle)(({ theme }) => ({
  position: "absolute",
  top: "var(--ms0)",
  right: "var(--ms0)",
  zIndex: 2,
  fill: "var(--white)",
  width: 24,
  height: 24,
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

export const HotspotSection = props => {
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const { hotspotData, previewData, backgroundColour } = props

  const [spotSelected, setSpotSelected] = useState(null)

  useEffect(() => {
    setSpotSelected(hotspotData?.hotspots[0])
  }, [hotspotData, setSpotSelected])

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
                width={mobile ? 390 : tablet ? 732 : 732}
                height={mobile ? 245 : tablet ? 438 : 438}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
            {hotspotData?.hotspots?.map((node, i) => {
              const rotation = i * 1.168 * 100
              return (
                <Hotspot
                  onClick={() => setSpotSelected(node)}
                  key={node?._key}
                  x={node?.x}
                  y={node?.y}
                >
                  <svg
                    width="74"
                    height="74"
                    viewBox="0 0 74 74"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                    }}
                  >
                    {spotSelected && spotSelected?._key === node?._key && (
                      <motion.path
                        intitial={{
                          opacity: 0,
                          scale: 0.4,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 0.98,
                        }}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.0581 0.70214C31.9225 2.52089 33.0346 12.3505 39.1275 15.9981C46.3193 20.3035 57.5675 16.456 62.5868 23.1691C67.5889 29.8593 66.6084 40.1976 62.7671 47.6153C59.1013 54.6942 49.8876 55.9832 43.2825 60.4467C37.0016 64.691 32.5569 74.2077 25.0581 73.0976C17.3304 71.9536 15.403 61.5523 10.3732 55.575C6.88265 51.4269 1.15682 48.7867 0.122661 43.4649C-0.88206 38.2947 4.5981 34.1412 5.19106 28.9077C6.04355 21.3835 -0.0798274 12.9561 4.28075 6.76534C8.53956 0.719022 17.9091 -1.192 25.0581 0.70214Z"
                        fill="white"
                      />
                    )}
                    <circle
                      cx="30.348"
                      cy="36.6312"
                      r="11.6175"
                      fill="#EB7806"
                      strokeWidth="2px"
                      stroke="var(--white)"
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
              y: "var(--ms0)",
            }}
            animate={{
              y: 0,
            }}
          >
            {spotSelected?.image && (
              <DetailImage>
                <Close onClick={() => setSpotSelected(null)} />
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
