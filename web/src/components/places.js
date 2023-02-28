import React from "react"
import { graphql } from "gatsby"
import { Container } from "@mui/material"
import {PlacesGrid} from "../components/placesGrid"
import {TitleSubtitleText} from "../components/titleSubtitleText"

export const Places = ({ gridTitleSubtitleText, places, allPlace}) => {
  
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 9 } }}>

      <TitleSubtitleText displayTitle={gridTitleSubtitleText.displayTitle} subtitle={gridTitleSubtitleText.subtitle} text={gridTitleSubtitleText.text} subtitlePosition={gridTitleSubtitleText.subtitlePosition} showAdornment={gridTitleSubtitleText.showAdornment}/>

      <PlacesGrid allPlace={allPlace} places={places}/>

    </Container>
  )
}

export const query = graphql`
  fragment PlacesGridFragment on SanityPlacesGrid {
    ...PlaceFragment
    gridTitleSubtitleText {
      ...TitleSubtitleTextFragment
      
    }
  }
`
