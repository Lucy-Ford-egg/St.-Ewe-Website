import React from "react"
import { graphql } from "gatsby"
import { Container, Typography } from "@mui/material"
import { AnimatedText } from "./animatedText"
import {PlacesGrid} from "../components/placesGrid"

export const Places = ({ gridTitleSubtitleText, places, allPlace }) => {
  
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 9 } }}>
      <Container maxWidth="md">
        {gridTitleSubtitleText.subtitlePosition === null && (
          <Typography
            variant="subtitle1"
            color="primary.main"
            align="center"
            sx={{ pb: { xs: 5 } }}
          >
            {gridTitleSubtitleText.subtitle}
          </Typography>
        )}
       <AnimatedText text={gridTitleSubtitleText.title} titleSize={gridTitleSubtitleText.titleSize ? gridTitleSubtitleText.titleSize : "h2"} titleWidth={gridTitleSubtitleText.titleWidth ? gridTitleSubtitleText.titleWidth : "100%"}/> 
        {gridTitleSubtitleText.subtitlePosition && (
          <Typography variant="subtitle1" color="primary.main" align="center">
            {gridTitleSubtitleText.subtitle}
          </Typography>
        )}
      </Container>

      <Container maxWidth="md">
        <Typography variant="body1">{gridTitleSubtitleText.text}</Typography>
      </Container>
  
      <PlacesGrid allPlace={allPlace} places={places}/>
      
    </Container>
  )
}

export const query = graphql`
  fragment PlacesGridFragment on SanityPlacesGrid {
    ...PlaceFragment
    gridTitleSubtitleText {
      subtitle
      subtitlePosition
      text
      title
      titleSize
      titleWidth
    }
  }
`
