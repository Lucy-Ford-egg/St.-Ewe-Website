import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery, Typography } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Links } from "../components/links"
import { brandSpacing } from "../gatsby-theme-material-ui-top-layout/brandPalette"
import { contrastBrandPalette } from "../utils/colours"

import { motion, useScroll, useTransform } from "framer-motion"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"
import mask from "../../static/assets/svg-mask.svg"

const Wrapper = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(24, 1fr)",
    gridColumn: "1/25",
    gridTemplateRows: "400px 1fr",
    position: "relative",
    maskImage: "unset",
    [theme.breakpoints.up("lg")]: {
      height: "100%",
      gridTemplateRows: "1fr",
      maskRepeat: "no-repeat",
      maskSize: "cover",
      maskImage: `url(${mask})`,
    },
  }),
)

const BackgroundImage = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "1/25",
    gridRow: "1/1",
    [theme.breakpoints.up("sm")]: {
      gridRow: "1/2",
      maxHeight: "unset",
    },
  }),
)

const Overlay = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    display: "none",
    [theme.breakpoints.up("sm")]: {
      gridColumn: "1/25",
      display: "grid",
      backgroundColor: "rgba(0,0,0,0.2)",
      zIndex: 1,
      gridRow: "1/2",
    },
  }),
)

const Content = styled("div")(({ alignment, theme, backgroundColour }) => ({
  gridRow: "2/2",
  gridColumn: alignment === "left" ? "3/22" : "3/22",
  textAlign: alignment === "left" ? "left" : "center",
  display: "grid",
  justifyContent: "center",
  alignItems: alignment === "left" ? "center" : "center",
  zIndex: 2,
  paddingTop: "var(--ms6)",
  "& .header-title": {
    textTransform: "uppercase",
  },
  [theme.breakpoints.up("sm")]: {
    gridRow: "1/2",
    gridColumn: alignment === "left" ? "2/16" : "7/19",
  },
  [theme.breakpoints.up("lg")]: {
    gridRow: "1/2",
    gridColumn: alignment === "left" ? "2/13" : "7/19",
  },
}))

const Actions = styled("div")(({ theme, alignment }) => ({
  display: "flex",
  alignItems: alignment === "left" ? "start" : "center",
  justifyContent: alignment === "left" ? "start" : "center",
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    justifyContent: alignment === "left" ? "start" : "center",
  },
}))

const Title = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    color: `${contrastBrandPalette[backgroundColour?.label]?.contrastText}`,
    [theme.breakpoints.up("lg")]: {
      color: "white",
    },
  }),
)

export const HeaderSection = props => {
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const {
    title,
    _rawText,
    textAlign,
    image,
    previewData,
    sanityConfig,
    links,
    alignment,
    backgroundColour,
    pageContext,
    _type,
  } = props

  const definedText =
    (previewData && _type === previewData?._type && previewData?.text) ||
    _rawText
  const definedLinks =
    (previewData && _type === previewData?._type && previewData?.links) || links

  // const definedImage =
  //   (previewData && _type === previewData?._type && previewData?.image) || image

  const definedImage =
    (image?.asset && image) || pageContext?.node?.featuredMedia

  const definedBackgroundColour =
    (previewData &&
      _type === previewData?._type &&
      previewData?.backgroundColour) ||
    backgroundColour
  const definedTextAlign =
    (previewData && _type === previewData?._type && previewData?.alignment) ||
    alignment

  // Motion

  const [imageLoaded, setImageLoaded] = useState(false) // Track image load state

  const ref = useRef(null)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: [mobile ? "100vh" : "30vh", mobile ? "0px" : "0vh"],
  })
  const content = useTransform(scrollYProgress, [1, 0], [0, -50])
  const contentOpacity = useTransform(scrollYProgress, [1, 0], [1, 0])

  return (
    <ModuleContainer {...props} ref={containerRef}>
      <Wrapper
        className="maskLayer"
        theme={theme}
        backgroundColour={definedBackgroundColour}
        image={definedImage}
        mask={mask}
        ref={ref}
      >
        {definedImage && (
          <BackgroundImage theme={theme}>
            <Image
              crop={definedImage?.crop}
              hotspot={definedImage?.hotspot}
              asset={
                (definedImage?._ref && urlFor(definedImage).url()) ||
                definedImage?.asset
              }
              width={mobile ? 400 : tablet ? 768 : 1440}
              height={mobile ? 400 : tablet ? 600 : 700}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              onLoad={() => setImageLoaded(true)}
            />
            <Overlay />
          </BackgroundImage>
        )}

        {imageLoaded && definedText && (
          <Content alignment={alignment} theme={theme}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  opacity: contentOpacity,
                  y: content,
                  rowGap: `${brandSpacing["MS1"]?.value}px`,
                }}
              >
                {/* <Typography className="header-title" variant="h1" textAlign={definedTextAlign}>{definedTitle}</Typography> */}
                {definedText && (
                  <Title backgroundColour={backgroundColour}>
                    <RenderPortableText
                      previewData={previewData}
                      sanityConfig={sanityConfig}
                      variant={false}
                      textAlign={definedTextAlign}
                      value={definedText}
                    />
                  </Title>
                )}

                {definedLinks && definedLinks.length > 0 && (
                  <Actions alignment={alignment}>
                    <Links
                      alignment={alignment === "left" ? "start" : false}
                      className="links"
                      linkOne="primary"
                      links={definedLinks}
                      previewData={previewData}
                      highlighted
                    />
                  </Actions>
                )}
              </motion.div>
            </motion.div>
          </Content>
        )}
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment HeaderSectionFragment on SanityHeaderSection {
    _key
    _type
    _rawText(resolveReferences: { maxDepth: 10 })
    alignment
    backgroundColour {
      value
      label
    }
    links {
      ...LinkFragment
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
  }
`
