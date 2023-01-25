import React from 'react'
import { graphql } from "gatsby"
import { Container, Grid, Typography } from '@mui/material';
import { PlaceTile } from '../components/placeTile'

export const PlacesGrid = ({ gridTitleSubtitleText, reference }) => {

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 9 } }}>
      <Container maxWidth="md">
        {gridTitleSubtitleText.subtitlePosition === null && <Typography variant="subtitle1" color="primary.main" align="center" sx={{ pb: { xs: 5 } }}>{gridTitleSubtitleText.subtitle}</Typography>}
        <Typography variant="h2" align="center" sx={{ pb: { xs: 8 } }}>{gridTitleSubtitleText.title}</Typography>
        {gridTitleSubtitleText.subtitlePosition && <Typography variant="subtitle1" color="primary.main" align="center">{gridTitleSubtitleText.subtitle}</Typography>}
      </Container>
      <Container maxWidth="sm">
        <Typography variant="body1">{gridTitleSubtitleText.text}</Typography>
      </Container>

      <Container maxWidth="lg" sx={{ py: { xs: 9 } }}>

        {Array.isArray(reference) &&
          <Grid container spacing={2}>
            {reference.map((tile, i) => {
              return <Grid key={`${tile.title}-${i}`} item xs={6}>
                <PlaceTile title={tile.title} image={tile.coverImage.asset.gatsbyImageData} category='cat' date={tile.date} to={tile.slug.current} excerpt={tile.excerpt} />
              </Grid>

            })}
          </Grid>
        }


        {reference.hasOwnProperty('title') && <PlaceTile title={reference.title} image={reference.coverImage.asset.gatsbyImageData} category="categroy" date={reference.date} to={reference.slug.current} excerpt={reference.excerpt}/>}
      </Container>
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
    }
  }
`

