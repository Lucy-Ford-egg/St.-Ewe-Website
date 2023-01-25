import React from 'react'
import { graphql } from "gatsby"
import { Container, Typography } from '@mui/material';

export const PlacesGrid = ({gridTitleSubtitleText}) => {
  
  <Container maxWidth="lg" sx={{ height: {xs: 'auto', md: '100%'}, px:{xs: 0, md: 8}, backgroundColor: 'red'}}>
    {gridTitleSubtitleText.subtitlePosition === null && <Typography variant="subtitle1">{gridTitleSubtitleText.subtitle}</Typography>}
    <Typography variant="h1">{gridTitleSubtitleText.title}</Typography>
    {gridTitleSubtitleText.subtitlePosition && <Typography variant="subtitle1">{gridTitleSubtitleText.subtitle}</Typography>}
    <Typography variant="body1">{gridTitleSubtitleText.text}</Typography>
  </Container>
}

export const query = graphql`
  fragment PlacesGridFragment on SanityPlacesGrid {
    ...PlaceFragment
    gridTitleSubtitleText {
      subtitle
      subtitlePosition
      text
      title
    }
  }
`

