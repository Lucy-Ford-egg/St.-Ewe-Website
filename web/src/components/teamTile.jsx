import React, { useState } from "react"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { motion } from "framer-motion"
import { Texture } from "../components/texture"
import { contrastBrandPalette } from "../utils/colours"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(({ props, theme, tileColour }) => ({
  display: "grid",
  gridColumn: "span 11",
  borderRadius: "var(--ms2)",
  overflow: "hidden",
  zIndex: 0,
  backgroundColor: tileColour?.value,
  [theme.breakpoints.up("sm")]: {
    gridColumn: "span 11",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: "span 6",
  },
}))

const BackgroundImage = styled("div")(({ props, theme }) => ({
  gridColumn: "1/1",
  gridRow: "1/1",
  zIndex: 2,
  [theme.breakpoints.up("lg")]: {},
}))

const SvgBackground = styled("div")(({ props, theme }) => ({
  gridColumn: "1/1",
  gridRow: "1/1",
  zIndex: 1,
  pointerEvents: "none",
  mixBlendMode: "multiply",
  opacity: 0.2,
  "& svg": {
    width: "100%",
    height: "100%",
  },
  [theme.breakpoints.up("lg")]: {},
}))

const Content = styled("div")(({ props, theme, backgroundColour }) => ({
  gridColumn: "1/1",
  gridRow: "1/1",
  zIndex: 3,
  //maxHeight: "fit-content",
  alignSelf: "flex-end",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("lg")]: {},
}))

const Inner = styled("div")(({ props, theme, tileColour }) => ({
  padding: "var(--ms-5) var(--ms0) var(--ms0) var(--ms0)",
  backgroundColor: contrastBrandPalette[tileColour?.label]?.contrastBase,
  [theme.breakpoints.up("lg")]: {},
}))

const Name = styled("h2")(({ props, theme }) => ({
  textTransform: "uppercase",
  marginTop: 0,
  marginBottom: 0,
  fontSize: "var(--ms0)",
  [theme.breakpoints.up("lg")]: {
    fontSize: "var(--ms2)",
  },
}))

const Position = styled("p")(({ props, theme }) => ({
  marginTop: 0,
  [theme.breakpoints.up("lg")]: {},
}))

const FavouriteEggs = styled(motion.p)(({ props, theme }) => ({
  marginTop: 0,
  [theme.breakpoints.up("lg")]: {},
}))

export const TeamTile = props => {
  const { member, tileColour } = props

  const [activeTile, setActiveTile] = useState(false)
  const name = member?.title
  const position = member?.position
  const image = member?.tileImage
  const favouriteEggs = member?.favouriteEggs

  const border = (
    <svg
      viewBox="0 0 330 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        maxWidth: "100%",
        height: "auto",
        marginBottom: "-2px",
      }}
    >
      <path
        d="M8.04859 11.5175C5.64395 12.2944 2.98304 12.3561 0.5 12.3561V22H329.5C329.5 19.116 328.469 18.0196 326.849 15.9434C326.314 15.2576 324.467 15.3166 323.69 15.0116C321.214 14.0402 318.809 12.8311 316.354 11.797C309.185 8.77815 302.304 7.64586 294.514 7.41763C290.614 7.30339 286.738 7.90837 282.851 8.16305C280.182 8.33798 277.509 8.4714 274.836 8.55906C274.448 8.57181 274.008 8.74769 273.67 8.53577C272.946 8.08152 272.989 7.03985 271.847 6.71879C268.38 5.7447 264.428 5.85214 260.884 5.64725C253.787 5.23691 246.694 5.40049 239.595 5.15806C236.219 5.04274 233.108 4.32194 229.799 3.87686C216.198 2.04726 202.513 2.93358 188.812 2.26954C185.492 2.10862 183.34 1.5074 180.394 0.801983C178.883 0.440235 177.13 0.6513 175.644 0.732098C170.589 1.00702 165.538 1.35927 160.484 1.64059C153.572 2.02524 146.069 3.01236 139.131 2.0133C137.909 1.83728 137.241 1.0006 136.141 0.732098C135.01 0.455978 133.242 1.09375 132.176 1.40764C127.143 2.89021 122.506 4.12515 117.291 4.66887C115.772 4.82727 117.873 4.94921 116.335 5.15525C115.154 5.31353 106.277 4.84308 105.14 5.15525C102.798 5.79855 98.8573 4.66887 100.455 3.80698C96.3768 3.05476 92.6617 3.04124 89.1748 0.522449C87.5475 -0.653053 83.7564 0.503141 81.923 0.638922C75.5545 1.11059 69.1828 1.94946 62.8395 2.71213C52.0087 4.01435 41.1222 5.03624 30.3127 6.50914C27.7548 6.85768 25.1987 7.24469 22.6369 7.55739C22.2014 7.61056 21.675 7.84297 21.3222 7.55739C20.8089 7.14186 20.7686 6.90515 19.9864 6.90515C15.9206 6.90515 11.8919 10.2756 8.04859 11.5175Z"
        fill={contrastBrandPalette[tileColour?.label]?.contrastBase}
      />
    </svg>
  )

  const favourite = {
    show: {
      opacity: 1,
      height: "fit-content",
    },
    hide: {
      opacity: 0,
      height: 0,
    },
  }

  const positionAnimation = {
    show: {
      opacity: 0,
      height: 0,
    },
    hide: {
      opacity: 1,
      height: "auto",
    },
  }

  return (
    <Wrapper
      tileColour={tileColour}
      onMouseEnter={() => setActiveTile(true)}
      onMouseLeave={() => setActiveTile(false)}
    >
      <SvgBackground>
        <Texture
          backgroundColour={{
            backgroundColour: {
              value: contrastBrandPalette[tileColour?.label]?.contrastBase,
            },
          }}
        />
      </SvgBackground>
      <BackgroundImage>
        {image && (
          <Image
            crop={image?.crop}
            hotspot={image?.hotspot}
            asset={
              (image?._ref && urlFor(image).width(1440).url()) || image?.asset
            }
            width={329}
            height={427}
            style={{
              objectFit: "cover",
              width: "100%",
            }}
          />
        )}
      </BackgroundImage>
      <Content>
        {border}
        <Inner tileColour={tileColour}>
          <Name>{activeTile ? "Favourite Eggs?" : name}</Name>
          {!activeTile && (
            <Position
              initial="hide"
              animate="show"
              variants={positionAnimation}
              transition={{ type: "spring", duration: 0.3 }}
            >
              {position}
            </Position>
          )}
          {activeTile && (
            <FavouriteEggs
              initial="hide"
              animate={activeTile ? "show" : "hide"}
              variants={favourite}
              transition={{ type: "spring", duration: 0.3 }}
            >
              {favouriteEggs}
            </FavouriteEggs>
          )}
        </Inner>
      </Content>
    </Wrapper>
  )
}
