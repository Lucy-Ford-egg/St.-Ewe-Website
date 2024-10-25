import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery } from "@mui/material"
import { RenderPortableText } from "../components/utils/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Links } from "../components/links"
import { brandSpacing } from "../gatsby-theme-material-ui-top-layout/brandPalette"
import { contrastBrandPalette } from "../utils/colours"
import { motion, useScroll, useTransform } from "framer-motion"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "1/25",
    display: "grid",
    gridTemplateColumns: "subgrid",
    //overflowX: 'hidden',
    gridRowGap: "var(--ms4)",
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {
      gridRowGap: "unset",
    },
  }),
)

const FeatureImage = styled(motion.div)(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "2/24",
    display: "grid",
    gridRow: "2/4",
    gridTemplateRows: "subgrid",
    overflow: "hidden",
    gridColumn: "2/24",
    [theme.breakpoints.up("sm")]: {
      gridColumn: "2/24",
    },
    [theme.breakpoints.up("lg")]: {
      gridRow: "1/1",
      gridColumn: mirror ? "2/12" : "12/24",
    },
    "& img": {
      borderRadius: "var(--ms4)",
    },
  }),
)

const Content = styled("div")(({ mirror, theme, backgroundColour }) => ({
  gridColumn: "2/24",
  display: "grid",
  gridRow: "1/2",
  gridTemplateRows: "subgrid",
  // paddingTop: brandSpacing['MS6']?.value,
  // paddingBottom: brandSpacing['MS6']?.value,
  alignItems: "center",
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  "& .header-title": {
    textTransform: "uppercase",
  },
  [theme.breakpoints.up("sm")]: {
    gridColumn: "2/24",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: mirror ? "14/24" : "3/10",
  },
}))

const Asset = styled(motion.div)(({ mirror, theme }) => ({
  display: "grid",
  gridTemplateRows: "subgrid",
  gridColumn: "1/3",
  gridRow: "3/4",
  position: "relative",
  zIndex: 1,
  alignItems: "start",

  "& img": {
    transform: "translateX(-10px) translateY(100px) ",
    maxWidth: 110,
    maxHeight: 110,
    [theme.breakpoints.up("sm")]: {
      maxWidth: 220,
      maxHeight: 220,
      transform: "translateY(100px)",
    },
  },

  [theme.breakpoints.up("sm")]: {
    gridColumn: "21/24",
    gridRow: "1/1",
    alignItems: "end",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: mirror ? "10/13" : "10/13",
    gridRow: "1/1",
    alignItems: "end",
  },
}))

export const FeatureSection = props => {
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const {
    title,
    _rawText,
    mirror,
    image,
    previewData,
    sanityConfig,
    links,
    backgroundColour,
    centerAsset,
    _type,
  } = props

  const definedTitle =
    (previewData && _type === previewData?._type && previewData?.title) || title
  const definedText =
    (previewData && _type === previewData?._type && previewData?.text) ||
    _rawText
  const definedLinks =
    (previewData && _type === previewData?._type && previewData?.links) || links

  // const definedImage =
  //   (previewData && _type === previewData?._type && previewData?.image) || image

  const definedImage = image?.asset && image

  const definedBackgroundColour =
    (previewData &&
      _type === previewData?._type &&
      previewData?.backgroundColour) ||
    backgroundColour
  const definedMirror =
    (previewData && _type === previewData?._type && previewData?.mirror) ||
    mirror
  const definedAsset =
    (previewData && _type === previewData?._type && previewData?.centerAsset) ||
    centerAsset

  // Motion

  const [imageLoaded, setImageLoaded] = useState(false) // Track image load state

  const ref = useRef(null)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start start", "center end"],
  })

  const content = useTransform(scrollYProgress, [1, 0], [-20, 0])

  const imageY = useTransform(scrollYProgress, [1, 0], [20, 0])
  const assetY = useTransform(scrollYProgress, [1, 0], [0, -200])

  return (
    <ModuleContainer {...props} ref={containerRef}>
      <Wrapper
        theme={theme}
        backgroundColour={definedBackgroundColour}
        image={definedImage}
      >
        {definedImage && (
          <FeatureImage
            theme={theme}
            mirror={definedMirror}
            style={{
              x: !mobile && imageY,
            }}
          >
            <Image
              crop={definedImage?.crop}
              hotspot={definedImage?.hotspot}
              asset={
                (definedImage?._ref &&
                  urlFor(definedImage).width(1440).url()) ||
                definedImage?.asset
              }
              width={mobile ? 362 : tablet ? 732 : 732}
              height={mobile ? 241 : tablet ? 438 : 438}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                //transform: 'scale(1.2)',
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </FeatureImage>
        )}
        {definedAsset && (
          <Asset
            theme={theme}
            mirror={definedMirror}
            style={{
              y: assetY,
            }}
          >
            <div ref={ref}>
              <Image
                // pass asset, hotspot, and crop fields
                crop={definedAsset?.crop}
                hotspot={definedAsset?.hotspot}
                asset={
                  (definedAsset?._ref &&
                    urlFor(definedAsset).width(440).url()) ||
                  definedAsset?.asset
                }
                width={440}
                height={440}
              />
            </div>
          </Asset>
        )}
        {imageLoaded && (
          <Content
            mirror={definedMirror}
            theme={theme}
            backgroundColour={backgroundColour}
          >
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                x: !mobile && content,
                rowGap: `${brandSpacing["MS1"]?.value}px`,
              }}
            >
              {definedText && (
                <RenderPortableText
                  previewData={previewData}
                  sanityConfig={sanityConfig}
                  variant={false}
                  textAlign={definedMirror}
                  value={definedText}
                />
              )}

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
            </motion.div>
          </Content>
        )}
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment FeatureSectionFragment on SanityFeatureSection {
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
    centerAsset {
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
    mirror
    _rawText(resolveReferences: { maxDepth: 10 })
    links {
      ...LinkFragment
    }
  }
`
