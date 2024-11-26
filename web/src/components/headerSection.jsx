import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery, Typography } from "@mui/material"
import { RenderPortableText } from "../components/utils/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Links } from "../components/links"
import { brandSpacing } from "../gatsby-theme-material-ui-top-layout/brandPalette"
import { contrastBrandPalette } from "../utils/colours"
import { motion, useScroll, useTransform } from "framer-motion"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"
import mask from "../../static/assets/svg-mask.svg"
import { LuClock5 } from "react-icons/lu"
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share"

const Wrapper = styled("div")(({ theme, image }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  gridColumn: "1/25",
  gridTemplateRows: !image ? "90px 1fr" : "400px 1fr",
  position: "relative",
  maskImage: "unset",
  [theme.breakpoints.up("sm")]: {
    gridTemplateRows: "700px 1fr",
  },
  [theme.breakpoints.up("lg")]: {
    height: "100%",
    gridTemplateRows: "1fr",
    paddingTop: !image ? "var(--ms8)" : "unset",
    maskRepeat: "no-repeat",
    maskSize: "cover",
    maskImage: `url(${mask})`,
  },
}))

const BackgroundImage = styled("div")(({ theme }) => ({
  gridColumn: "1/25",
  gridRow: "1/1",
  [theme.breakpoints.up("sm")]: {
    gridRow: "1/2",
    maxHeight: "unset",
  },
}))

const Overlay = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    gridColumn: "1/25",
    display: "grid",
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 1,
    gridRow: "1/2",
  },
}))

const Content = styled("div")(({ alignment, theme }) => ({
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

const Title = styled("div")(({ theme, backgroundColour }) => ({
  color: `${contrastBrandPalette[backgroundColour?.label]?.contrastText} !important`,
  whiteSpace: "wrap",
  [theme.breakpoints.up("sm")]: {
    //color: "white",
  },
}))

const RecipeDetails = styled("div")(({ theme }) => ({
  // color: `${contrastBrandPalette[backgroundColour?.label]?.contrastText}`,
  gridColumn: "2/24",
  gridRow: "1/1",
  display: "flex",
  alignSelf: "end",
  justifyContent: "space-between",
  paddingBottom: "var(--ms2)",
  [theme.breakpoints.up("lg")]: {
    paddingBottom: "var(--ms7)",
  },
}))

const Meta = styled("div")(({ theme }) => ({
  // color: `${contrastBrandPalette[backgroundColour?.label]?.contrastText}`,
  backgroundColor: "var(--original-primary)",
  borderRadius: "999px",
  padding: "var(--ms0)",
  maxWidth: "fit-content",
  display: "flex",
  alignItems: "center",
  columnGap: "var(--ms0)",
  color: "var(--white)",
  "& svg": {
    width: 24,
    height: 24,
  },
  [theme.breakpoints.up("lg")]: {
    // color: "white",
  },
}))

const Sharing = styled("div")(({ theme }) => ({
  // color: `${contrastBrandPalette[backgroundColour?.label]?.contrastText}`,
  backgroundColor: "var(--original-primary)",
  borderRadius: "999px",
  padding: "var(--ms0)",
  maxWidth: "fit-content",
  display: "flex",
  alignItems: "center",
  columnGap: "var(--ms0)",
  color: "var(--white)",
  "& svg": {
    width: 24,
    height: 24,
  },
  [theme.breakpoints.up("lg")]: {
    // color: "white",
  },
}))

export const HeaderSection = props => {
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const {
    text,
    image,
    previewData,
    sanityConfig,
    links,
    alignment,
    backgroundColour,
    pageContext,
    location,
  } = props

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
        backgroundColour={backgroundColour}
        image={image}
        mask={mask}
        ref={ref}
      >
        {image && (
          <BackgroundImage theme={theme}>
            <Image
              crop={image?.crop}
              hotspot={image?.hotspot}
              alt={image?.asset?.altText}
              asset={(image?._ref && urlFor(image).url()) || image?.asset}
              width={mobile ? 400 : tablet ? 768 : 1440}
              height={mobile ? 400 : tablet ? 700 : 700}
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

        {text && (
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
                {text && (
                  <Title backgroundColour={backgroundColour}>
                    <RenderPortableText
                      previewData={previewData}
                      sanityConfig={sanityConfig}
                      variant={false}
                      textAlign={alignment}
                      value={text}
                    />
                  </Title>
                )}

                {links && links.length > 0 && (
                  <Actions alignment={alignment}>
                    <Links
                      alignment={alignment === "left" ? "start" : false}
                      className="links"
                      linkOne="primary"
                      links={links}
                      previewData={previewData}
                      highlighted
                    />
                  </Actions>
                )}
              </motion.div>
            </motion.div>
          </Content>
        )}
        {pageContext?.node?.duration && (
          <RecipeDetails>
            <>
              <Meta backgroundColour={backgroundColour}>
                <LuClock5 />
                <Typography variant="body1" component="span" color="inherit">
                  {`${pageContext?.node?.duration?.hours ? pageContext?.node?.duration.hours + " hours" : ""} ${pageContext?.node?.duration?.minutes ? pageContext?.node?.duration.minutes + " mins" : ""}`}
                </Typography>
              </Meta>
              <Sharing>
                <FacebookShareButton
                  url={location?.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 10.3038C20 4.74719 15.5229 0.242676 10 0.242676C4.47715 0.242676 0 4.74719 0 10.3038C0 15.3255 3.65684 19.4879 8.4375 20.2427V13.2121H5.89844V10.3038H8.4375V8.0872C8.4375 5.56564 9.9305 4.1728 12.2146 4.1728C13.3088 4.1728 14.4531 4.36931 14.4531 4.36931V6.84529H13.1922C11.95 6.84529 11.5625 7.6209 11.5625 8.41658V10.3038H14.3359L13.8926 13.2121H11.5625V20.2427C16.3432 19.4879 20 15.3257 20 10.3038Z"
                      fill="white"
                    />
                  </svg>
                </FacebookShareButton>
                <TwitterShareButton
                  url={location?.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1761 0.242676H16.9362L10.9061 7.02008L18 16.2427H12.4456L8.0951 10.6493L3.11723 16.2427H0.35544L6.80517 8.99348L0 0.242676H5.69545L9.6279 5.3553L14.1761 0.242676ZM13.2073 14.6181H14.7368L4.86441 1.78196H3.2232L13.2073 14.6181Z"
                      fill="white"
                    />
                  </svg>
                </TwitterShareButton>
                <PinterestShareButton
                  url={location?.href}
                  media={image && urlFor(image).url()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_1678_16986"
                      style={{ masktype: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M19.9999 9.99992C19.9999 15.5227 15.5228 19.9999 9.99996 19.9999C4.47716 19.9999 0 15.5227 0 9.99992C0 4.47704 4.47716 -4.00543e-05 9.99996 -4.00543e-05C15.5228 -4.00543e-05 19.9999 4.47704 19.9999 9.99992Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_1678_16986)">
                      <path
                        d="M9.99996 -0.000284195C4.47716 -0.000284195 0 4.47688 0 9.99967C0 14.2362 2.63582 17.8578 6.35572 19.3148C6.26834 18.5236 6.18931 17.3068 6.39039 16.4431C6.57212 15.6626 7.56301 11.4725 7.56301 11.4725C7.56301 11.4725 7.26389 10.8734 7.26389 9.98779C7.26389 8.59729 8.06984 7.5592 9.07335 7.5592C9.92651 7.5592 10.3386 8.19973 10.3386 8.96781C10.3386 9.82581 9.79232 11.1086 9.51042 12.2974C9.27483 13.2927 10.0095 14.1044 10.9912 14.1044C12.7686 14.1044 14.1348 12.2303 14.1348 9.52514C14.1348 7.13081 12.4144 5.45677 9.95774 5.45677C7.1124 5.45677 5.4423 7.59092 5.4423 9.79647C5.4423 10.6559 5.77339 11.5776 6.18653 12.0786C6.26825 12.1776 6.28022 12.2643 6.25588 12.3654C6.17997 12.6812 6.01127 13.3605 5.97815 13.4995C5.93455 13.6825 5.83323 13.7214 5.64371 13.6332C4.39478 13.0518 3.61391 11.2258 3.61391 9.75917C3.61391 6.60471 5.90585 3.70773 10.2213 3.70773C13.6903 3.70773 16.3861 6.17969 16.3861 9.48325C16.3861 12.9296 14.2131 15.7032 11.197 15.7032C10.1837 15.7032 9.23106 15.1768 8.90497 14.555C8.90497 14.555 8.40355 16.4643 8.28198 16.9322C8.05623 17.8007 7.44677 18.8895 7.03912 19.5537C7.97475 19.8434 8.96908 19.9996 9.99996 19.9996C15.5228 19.9996 20 15.5225 20 9.99967C20 4.47688 15.5228 -0.000284195 9.99996 -0.000284195Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </PinterestShareButton>
              </Sharing>
            </>
          </RecipeDetails>
        )}
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment HeaderSectionFragment on SanityHeaderSection {
    _key
    _type
    text: _rawText(resolveReferences: { maxDepth: 10 })
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
