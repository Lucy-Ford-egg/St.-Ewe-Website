import React from "react"
import { graphql } from "gatsby"
import { useTheme } from "@mui/material"
import { TeamTile } from "../components/teamTile"
import { ModuleContainer } from "./moduleContainer"
import { contrastBrandPalette } from "../utils/colours"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(({ props, theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridTemplateColumns: "subgrid",
  overflow: "hidden",
}))

const Grid = styled("div")(({ props, theme }) => ({
  display: "grid",
  gridColumn: "2/24",
  gridGap: 21,
  gridTemplateColumns: "subgrid",
  gridTemplateRows: "masonry",
  [theme.breakpoints.up("sm")]: {
    gridGap: 21,
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: "1/25",
    paddingLeft: "var(--ms4)",
    paddingRight: "var(--ms4)",
  },
}))

export const TeamSection = props => {
  const theme = useTheme()
  const { teamTiles, backgroundColour, tileColour } = props

  return (
    <ModuleContainer {...props}>
      <Wrapper theme={theme} backgroundColour={backgroundColour}>
        {teamTiles && (
          <Grid>
            {teamTiles &&
              teamTiles?.map((member, i) => {
                return (
                  <TeamTile
                    key={member?._id}
                    member={member}
                    backgroundColour={backgroundColour}
                    tileColour={tileColour}
                  />
                )
              })}
          </Grid>
        )}
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment TeamSectionFragment on SanityTeamSection {
    _key
    _type
    teamTiles {
      _id
      tileImage {
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
      favouriteEggs
      name
      position
    }
    tileColour {
      label
      value
    }
    backgroundColour {
      label
      value
    }
    verticalSpace {
      bottomPadding
      topPadding
    }
  }
`
