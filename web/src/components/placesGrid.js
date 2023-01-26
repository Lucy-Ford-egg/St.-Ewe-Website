import React from "react"
import { graphql } from "gatsby"
import { Container, Grid, Typography } from "@mui/material"
import { PlaceTile } from "../components/placeTile"
import { AnimatedText } from "./animatedText"
import { Filter } from "./filter"

export const PlacesGrid = ({ gridTitleSubtitleText, places, allPlace }) => {
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

      <Filter />

      <Container maxWidth="lg" sx={{ py: { xs: 9 } }}>
        {places.length === 0 && (
          <Grid container spacing={{ xs: 6, md: 9 }}>
            {allPlace.map((tile, i) => {
              return (
                <Grid key={`${tile.title}-${i}`} item xs={12} sm={6} md={6}>
                  <PlaceTile
                    title={tile.title}
                    image={tile.coverImage.asset.gatsbyImageData}
                    category={tile.categories}
                    date={tile.date}
                    to={tile.slug.current}
                    excerpt={tile.excerpt}
                  />
                </Grid>
              )
            })}
          </Grid>
        )}
        {Array.isArray(places) && (
          <Grid container spacing={{ xs: 6, md: 9 }}>
            {places.map((tile, i) => {
              return (
                <Grid key={`${tile.title}-${i}`} item xs={12} sm={6} md={6}>
                  <PlaceTile
                    title={tile.title}
                    image={tile.coverImage.asset.gatsbyImageData}
                    categories={tile.categories}
                    date={tile.date}
                    to={tile.slug.current}
                    excerpt={tile.excerpt}
                  />
                </Grid>
              )
            })}
          </Grid>
        )}
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
      titleSize
      titleWidth
    }
  }
`
