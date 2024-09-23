import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery, Typography } from "@mui/material"
import { RenderPortableText } from "../components/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Links } from "../components/links"
import { brandSpacing } from "../gatsby-theme-material-ui-top-layout/brandPalette"
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ModuleContainer } from "./moduleContainer"
import { styled } from '@mui/material/styles'
import mask from '../../static/assets/svg-mask.svg'


const Wrapper = styled('div')(({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
  gridColumn: '1/25',
  gridTemplateRows: '1fr 1fr',
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  height: '100%',
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    height: '100%',
    gridTemplateRows: '1fr',
    maskRepeat: 'no-repeat',
    maskSize: '100%',
    maskImage: `url(${mask})`,
  }
}));

const BackgroundImage = styled('div')(({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
  gridColumn: '1/25',
  display: 'grid',
  gridRow: '1/1',
  gridTemplateRows: 'subgrid',
  [theme.breakpoints.up('sm')]: {
    gridRow: '1/2',
  }
}));

const Overlay = styled('div')(({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    gridColumn: '1/25',
    display: 'grid',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
    gridRow: '1/2',
  }
}));

const Content = styled('div')(({ alignment, theme }) => ({
  gridRow: '2/2',
  gridColumn: alignment === 'left' ? '2/24' : '2/24',
  textAlign: alignment === 'left' ? 'left' : 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: alignment === 'left' ? 'start' : 'center',
  zIndex: 2,
  paddingTop: brandSpacing['MS6']?.value,
  paddingBottom: brandSpacing['MS6']?.value,
  "& .header-title": {
    textTransform: 'uppercase',
  },
  [theme.breakpoints.up('sm')]: {
    gridRow: '1/2',
    gridColumn: alignment === 'left' ? '2/16' : '7/18',
  },
  [theme.breakpoints.up('lg')]: {
    gridRow: '1/2',
    gridColumn: alignment === 'left' ? '2/13' : '7/18',
  }

}));

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

  const definedTitle =
    (previewData && _type === previewData?._type && previewData?.title) ||
    title
  const definedText =
    (previewData && _type === previewData?._type && previewData?.text) ||
    _rawText
  const definedLinks =
    (previewData && _type === previewData?._type && previewData?.links) || links

  // const definedImage =
  //   (previewData && _type === previewData?._type && previewData?.image) || image

    const definedImage = (image?.asset && image) || (pageContext?.featuredMedia )

  const definedBackgroundColour =
    (previewData &&
      _type === previewData?._type &&
      previewData?.backgroundColour) ||
    backgroundColour
  const definedTextAlign =
    (previewData && _type === previewData?._type && previewData?.alignment) ||
    alignment

    debugger
  // Motion

  const [imageLoaded, setImageLoaded] = useState(false); // Track image load state

  const ref = useRef(null);
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, container: containerRef, offset: [mobile ? "100vh" : "30vh", mobile ? "0px" : "0vh"] });
  const content = useTransform(scrollYProgress, [1, 0], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [1, 0], [1, 0]);

  return (
   
    <ModuleContainer {...props} ref={containerRef}>

      <Wrapper theme={theme} backgroundColour={definedBackgroundColour} image={definedImage} mask={mask} ref={ref}>

        {definedImage && (
          <BackgroundImage theme={theme}>
            <Image
              crop={definedImage?.crop}
              hotspot={definedImage?.hotspot}
              asset={
                definedImage?._ref && urlFor(definedImage).width(1440).url() || definedImage?.asset
              }
              width={mobile ? 400 : tablet ? 768 : 1440}
              height={mobile ? 400 : tablet ? 600 : 600}
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

        {imageLoaded && (
          <Content alignment={alignment} theme={theme}>
            <motion.div
              initial={{ opacity: 0, y: 10, }}
              animate={{ opacity: 1, y: 0, }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: contentOpacity,
                  y: content,
                  rowGap: `${brandSpacing['MS1']?.value}px`,
                }}
              >
                <Typography className="header-title" variant="h1" textAlign={definedTextAlign}>{definedTitle}</Typography>
                {definedText && (

                  <RenderPortableText
                    previewData={previewData}
                    sanityConfig={sanityConfig}
                    variant={false}
                    textAlign={definedTextAlign}
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
                  />
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
    title
    _rawText(resolveReferences: { maxDepth: 10 })
    alignment
    backgroundColour {
      value
      label
    }
    links {
      ...LinkFragment
    }
    image{
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
