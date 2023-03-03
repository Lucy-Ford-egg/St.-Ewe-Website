import React from "react"
import { graphql } from "gatsby"
import {PlacesGrid} from "../components/placesGrid"
import {TitleSubtitleText} from "../components/titleSubtitleText"

export const Places = ({ gridTitleSubtitleText, places, allPlace, showFilter}) => {
  
  return (
    <>

      <TitleSubtitleText displayTitle={gridTitleSubtitleText.displayTitle} subtitle={gridTitleSubtitleText.subtitle} text={gridTitleSubtitleText.text} subtitlePosition={gridTitleSubtitleText.subtitlePosition} showAdornment={gridTitleSubtitleText.showAdornment}/>

      <PlacesGrid allPlace={allPlace} places={places} showFilter={showFilter}/>

    </>
  )
}

export const query = graphql`
  fragment PlacesGridFragment on SanityPlacesGrid {
    ...PlaceFragment
    showFilter
    gridTitleSubtitleText {
      ...TitleSubtitleTextFragment
      
    }
  }
`
