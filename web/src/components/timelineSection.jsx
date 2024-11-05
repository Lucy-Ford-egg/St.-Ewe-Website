import React from "react"
import { graphql } from "gatsby"
import { useTheme, Typography } from "@mui/material"
import { RenderPortableText } from "../components/utils/renderPortableText"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { contrastBrandPalette } from "../utils/colours"
import { ModuleContainer } from "./moduleContainer"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "1/25",
    display: "grid",
    gridTemplateColumns: "subgrid",
    overflowX: "hidden",
    gridRowGap: "var(--ms4)",
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {
      gridRowGap: "unset",
    },
  }),
)

const TimeLine = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "2/25",
    display: "grid",
    gridTemplateColumns: "subgrid",

    gridRow: "1/1",
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {
      gridColumnGap: 90,
    },
  }),
)

const TimeLineEntry = styled("div")(({ theme, isAsset }) => ({
  "& img": {
    maxWidth: isAsset ? 221 : "100%",
    borderRadius: isAsset ? "0px" : "var(--ms2)",
    height: "auto",
    objectFit: "contain",
  },
  display: "flex",
  flexDirection: "column",
  "&:nth-of-type(even)": {
    flexDirection: "column-reverse",
    alignSelf: "start",
  },
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {
    gridColumn: "span 8",
  },
}))

const Date = styled(Typography)(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

const Text = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

const Line = styled("div")(
  ({ theme, borderDirection, backgroundColour, joiningColour, mirror }) => ({
    gridColumn: "1/25",
    gridRow: "1/1",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("lg")]: {},
  }),
)

export const TimelineSection = props => {
  const theme = useTheme()

  const { times, _type, backgroundColour } = props

  return (
    <ModuleContainer {...props}>
      <Wrapper theme={theme} backgroundColour={backgroundColour}>
        <Line>
          <svg
            width="1440"
            height="153"
            viewBox="0 0 1440 153"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 34.8634C1124.5 -108.637 1757.5 345.863 2871 34.8637"
              stroke="#EB7806"
              stroke-width="12"
              stroke-linecap="round"
              stroke-dasharray="1 30"
            />
          </svg>
        </Line>
        <TimeLine>
          {times?.map(node => {
            debugger
            return (
              <TimeLineEntry isAsset={node?.isAsset}>
                {node?.image && (
                  <Image
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
                  <Date
                    variant="h2"
                    component="h4"
                    backgroundColour={backgroundColour}
                  >
                    {node?.title}
                  </Date>
                )}
                {node?.text && (
                  <Text backgroundColour={backgroundColour}>
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
