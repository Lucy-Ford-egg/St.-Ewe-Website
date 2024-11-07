import React from "react"
import { graphql } from "gatsby"
import { useTheme } from "@mui/material"
import { RenderPortableText } from "../components/utils/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { contrastBrandPalette } from "../utils/colours"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(({ theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  overflowX: "hidden",
  gridRowGap: "var(--ms4)",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {
    gridRowGap: "unset",
  },
}))

const TimeLine = styled("div")(({ theme }) => ({
  gridColumn: "1/25",
  gridRow: "1/1",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  columnGap: 60,
  overflowX: "scroll",
  gridAutoFlow: "column",
  scrollSnapType: "x mandatory",
  scrollbarWidth: "none" /* Firefox */,
  scrollSnapAlign: "start",
  scrollPadding: "0 var(--ms1)",
  paddingRight: "var(--ms1)",
  paddingLeft: "var(--ms1)",
  "&::-webkit-scrollbar": {
    display: "none" /* Safari and Chrome */,
  },
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {
    columnGap: 90,
    paddingRight: "var(--ms7)",
    paddingLeft: "var(--ms7)",
    scrollPadding: "0 var(--ms7)",
  },
}))

const TimeLineEntry = styled("div")(({ theme, isAsset }) => ({
  "& img": {
    maxWidth: isAsset ? 221 : "100%",
    borderRadius: isAsset ? "0px" : "var(--ms2)",
    height: "auto",
    objectFit: "contain",
  },
  display: "flex",
  flexBasis: "70%",
  width: "70%",
  minWidth: "70%",
  rowGap: "var(--ms2)",
  scrollSnapAlign: "start",
  flexDirection: "column",

  alignSelf: isAsset ? "end" : "start",
  "&:nth-of-type(even)": {
    display: "flex",
    alignSelf: isAsset ? "start" : "end",
    "& .date": {
      order: 0,
    },
    "& .text": {
      order: 1,
    },
    "& .image": {
      order: 2,
    },
  },
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {
    flexBasis: "30%",
    width: "30%",
    minWidth: "30%",
    rowGap: "var(--ms2)",
  },
}))

const Date = styled("h4")(({ theme, backgroundColour }) => ({
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  backgroundColor: backgroundColour?.value,
  margin: "0!important",
  padding: "0!important",
  fontSize: "var(--ms5)",
  lineHeight: "var(--ms5)",
  fontFamily: "var(--font-primary)",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

const Text = styled("div")(({ theme, backgroundColour }) => ({
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  backgroundColor: backgroundColour?.value,
  "& p": {
    margin: "0!important",
    padding: "0!important",
  },
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

const Line = styled("div")(({ theme }) => ({
  gridColumn: "1/25",
  gridRow: "1/1",
  display: "flex",
  alignItems: "center",
  "& svg": {
    maxWidth: "100vw",
    path: {
      strokeWidth: "6",
      [theme.breakpoints.up("lg")]: {
        strokeWidth: "12",
      },
    },
  },
  [theme.breakpoints.up("sm")]: {},
}))

export const TimelineSection = props => {
  const theme = useTheme()

  const { times, backgroundColour } = props

  return (
    <ModuleContainer {...props}>
      <Wrapper theme={theme} backgroundColour={backgroundColour}>
        <Line>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <path
              d="M3 34.8634C1124.5 -108.637 1757.5 345.863 2871 34.8637"
              stroke="#EB7806"
              strokeLinecap="round"
              strokeDasharray="1 30"
            />
          </svg>
        </Line>
        <TimeLine>
          {times?.map(node => {
            return (
              <TimeLineEntry isAsset={node?.isAsset}>
                {node?.image && (
                  <Image
                    className="image"
                    // pass asset, hotspot, and crop fields
                    crop={node?.image?.crop}
                    hotspot={node?.image?.hotspot}
                    asset={
                      (node?.image?._ref &&
                        urlFor(node?.image).width(440).url()) ||
                      node?.image?.asset
                    }
                    width={node?.isAsset ? 221 : 440}
                    height={node?.isAsset ? 221 : 440}
                  />
                )}
                {node?.title && (
                  <Date className="date" backgroundColour={backgroundColour}>
                    {node?.title}
                  </Date>
                )}
                {node?.text && (
                  <Text className="text" backgroundColour={backgroundColour}>
                    <RenderPortableText variant={false} value={node?.text} />
                  </Text>
                )}
              </TimeLineEntry>
            )
          })}
        </TimeLine>
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment TimelineSectionFragment on SanityTimelineSection {
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
    times {
      title
      text {
        _rawChildren(resolveReferences: { maxDepth: 10 })
      }
      image {
        ...ImageFragment
      }
      isAsset
    }
  }
`
