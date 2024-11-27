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

const Wrapper = styled("div")(({ theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  overflow: "hidden",
  gridRowGap: "var(--ms4)",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {
    gridRowGap: "unset",
  },
}))

const FeatureImage = styled(motion.div)(({ theme, mirror }) => ({
  gridColumn: "2/24",
  display: "grid",
  gridRow: "2/4",
  // gridTemplateColumns: "repeat(22, 1fr)",
  overflow: "hidden",
  [theme.breakpoints.up("sm")]: {
    gridRow: "1/1",
    gridColumn: mirror ? "2/12" : "14/24",
  },
  [theme.breakpoints.up("lg")]: {
    gridRow: "1/1",
    gridColumn: mirror ? "2/12" : "14/24",
  },
  "& img": {
    borderRadius: "var(--ms4)",
  },
}))

const Content = styled("div")(({ mirror, theme, backgroundColour }) => ({
  gridColumn: "2/24",
  display: "grid",
  gridRow: "1/2",
  //gridTemplateColumns: "repeat(22, 1fr)",
  alignItems: "center",
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  "& .header-title": {
    textTransform: "uppercase",
  },
  [theme.breakpoints.up("sm")]: {
    gridColumn: mirror ? "14/24" : "2/12",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: mirror ? "14/24" : "2/12",
  },
}))

const Asset = styled(motion.div)(({ mirror, theme }) => ({
  gridTemplateColumns: "repeat(22, 1fr)",
  gridColumn: "1/3",
  gridRow: "3/4",
  position: "relative",
  zIndex: 1,
  alignItems: "start",
  display: "none",
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
    display: "grid",
    gridColumn: "21/24",
    gridRow: "1/1",
    alignItems: "end",
  },
  [theme.breakpoints.up("md")]: {
    gridColumn: mirror ? "10/15" : "13/15",
    gridRow: "1/1",
    alignItems: "end",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: mirror ? "10/15" : "13/15",
    gridRow: "1/1",
    alignItems: "end",
  },
}))

export const FeatureSection = props => {
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const {
    text,
    mirror,
    image,
    previewData,
    sanityConfig,
    links,
    backgroundColour,
    centerAsset,
  } = props

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
      <Wrapper theme={theme} backgroundColour={backgroundColour} image={image}>
        {image && (
          <FeatureImage
            theme={theme}
            mirror={mirror}
            style={{
              x: !mobile && imageY,
            }}
          >
            <Image
              crop={image?.crop}
              hotspot={image?.hotspot}
              alt={image?.asset?.altText}
              asset={
                (image?._ref && urlFor(image).width(1440).url()) || image?.asset
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
          </FeatureImage>
        )}
        {centerAsset && (
          <Asset
            theme={theme}
            mirror={mirror}
            style={{
              y: assetY,
            }}
          >
            <div ref={ref}>
              <Image
                // pass asset, hotspot, and crop fields
                crop={centerAsset?.crop}
                hotspot={centerAsset?.hotspot}
                alt={image?.asset?.altText}
                asset={
                  (centerAsset?._ref && urlFor(centerAsset).width(440).url()) ||
                  centerAsset?.asset
                }
                width={440}
                height={440}
              />
            </div>
          </Asset>
        )}
        {imageLoaded && (
          <Content
            mirror={mirror}
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
              {text && (
                <RenderPortableText
                  previewData={previewData}
                  sanityConfig={sanityConfig}
                  variant={false}
                  textAlign={mirror}
                  value={text}
                />
              )}

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
    text: _rawText(resolveReferences: { maxDepth: 10 })
    links {
      ...LinkFragment
    }
  }
`
