import React, { useRef } from "react"
import { graphql } from "gatsby"
import { useTheme, useMediaQuery } from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { motion, useScroll, useTransform } from "framer-motion"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"

// Styled Components
const Wrapper = styled(motion.div)(({ theme }) => ({
  display: "grid",
  gridColumn: "1/25",
  gridTemplateColumns: "repeat(24, 1fr)",
  gridTemplateRows: "1fr 1fr 1fr 1fr",
  overflow: "hidden",
  alignItems: "center",
  height: "48vh",
  position: "relative",
  marginTop: "var(--ms9)",
  [theme.breakpoints.up("lg")]: {
    marginTop: "unset",
    height: "110vh",
  },
}))

const Title = styled(motion.div)(({ theme }) => ({
  gridColumn: "4/22",
  gridRow: "1/2",
  alignSelf: "center",
  zIndex: 1,
  color: "var(--original-large)",
  textAlign: "center",
  fontFamily: "Colby Narrow",
  fontStyle: "normal",
  fontWeight: "700",
  textTransform: "uppercase",
  fontSize: "var(--ms5)",
  lineHeight: "var(--ms5)",
  [theme.breakpoints.up("lg")]: {
    gridRow: "1/4",
    fontSize: "var(--ms9)",
    lineHeight: "var(--ms9)",
  },
}))

const Layer = styled(motion.div)(({ theme }) => ({
  gridColumn: "1/25",
  gridRow: "1/4",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: "130vh",
  paddingTop: "var(--ms5)",
  [theme.breakpoints.up("lg")]: {
    paddingTop: "unset",
    height: "110vh",
  },
  img: {
    "&:last-of-type": {
      borderBottom: "1000px solid var(--super-eggs-primary)",
    },
  },
}))

const Base = styled(motion.div)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    height: "1000px",
    backgroundColor: "var(--super-eggs-primary)",
  },
}))

// Helper function to render layers
const renderLayer = (layer, index, transform, mobile, contentOpacity) => (
  <Layer
    key={index}
    style={{
      opacity: index < 3 ? contentOpacity : 1,
      y: transform,
      zIndex: index,
    }}
  >
    <Image
      fetchpriority="high"
      crop={layer?.crop}
      hotspot={layer?.hotspot}
      alt={layer?.altText}
      width={mobile ? 390 : 2880}
      height={mobile ? 300 : 2210}
      asset={layer?._id ? urlFor(layer).url() : layer?.asset}
      style={{
        objectFit: "cover",
        maxWidth: "100%",
        height: "auto",
      }}
    />
    <Base className="baseLayer" />
  </Layer>
)

export const HeroHeaderSection = props => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const { title, layers = [] } = props

  // Motion
  const ref = useRef(null)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start start", "end start"],
  })
  const transforms = [
    useTransform(scrollYProgress, [0, 1], ["0%", "0%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "80%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "10%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]),
  ]
  // Map x from these values:
  // Into these values:
  const contentOpacity = useTransform(scrollYProgress, [1, 0], ["0%", "100%"])
  //const titleOpacity = useTransform(scrollYProgress, [1, 0], ["0%", "100%"]);
  const content = useTransform(scrollYProgress, [0, 1], [0, 20])
  //const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <ModuleContainer
      {...props}
      elevation="1"
      ref={containerRef}
      style={{
        height: transforms[7],
      }}
    >
      {layers?.layers?.length > 0 && (
        <Wrapper ref={ref}>
          {layers?.layers?.map((layer, index) =>
            renderLayer(
              layer,
              index,
              transforms[index],
              mobile,
              tablet,
              contentOpacity,
            ),
          )}
          <Title
            style={{
              opacity: contentOpacity,
              y: content,
            }}
            // style={{
            //     opacity: contentOpacity ,
            //     y: titleY,
            // }}
          >
            {title}
          </Title>
        </Wrapper>
      )}
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment HeroHeaderSectionFragment on SanityHeroHeaderSection {
    _key
    _type
    title
    layers {
      ...SeasonalImageFragment
    }
    backgroundColour {
      value
      label
    }
  }
`
