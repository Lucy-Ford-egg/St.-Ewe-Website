import React from "react"
import { graphql } from "gatsby"
import { Container } from "@mui/material"
import {PlacesGrid} from "../components/placesGrid"
import {TitleSubtitleText} from "../components/titleSubtitleText"

export const Places = ({ gridTitleSubtitleText, places, allPlace}) => {
  
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 9 } }}>

      <TitleSubtitleText title={gridTitleSubtitleText.displayTitle} subtitle={gridTitleSubtitleText.subtitle} text={gridTitleSubtitleText.text} titleSize={gridTitleSubtitleText.titleSize} subtitlePosition={gridTitleSubtitleText.subtitlePosition} titleWidth={gridTitleSubtitleText.titleWidth}/>

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
