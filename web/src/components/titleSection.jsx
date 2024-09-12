import React from "react"
import { graphql } from "gatsby"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

export const TitleSection = props => {

  const {
    _rawTitle,
    backgroundColour,
    verticalSpace,
    _type,
  } = props

  return (
    <Container
      maxWidth="false"
      sx={{
        backgroundColor: backgroundColour
        ? "highlight.main"
        : "transparent",
      }}
    >
        <Grid>
HELLLOOOOOO
        </Grid>
    </Container>
  )
}

export const query = graphql`
  fragment TitleSectionFragment on SanityTitleSection {
    _key
    _type
    _rawTitle(resolveReferences: { maxDepth: 10 })
    verticalSpace {
        topPadding
        bottomPadding
      }
      backgroundColour{
        label
        value
      }
  }
`
