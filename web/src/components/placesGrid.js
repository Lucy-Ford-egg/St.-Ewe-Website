import React, { useState, useEffect, useCallback } from "react"
import { Container, Grid } from "@mui/material"
import { PlaceTile } from "../components/placeTile"
import { Filter } from "./filter"

export const PlacesGrid = ({ places, allPlace }) => {

  const [filterPlaces, setFilterPlaces] = useState(allPlace)

  const updatePlaces = useCallback(() => { 
    setFilterPlaces(filterPlaces);
  },[filterPlaces, setFilterPlaces],)

  useEffect(() => {
    updatePlaces()
  }, [updatePlaces]);

  return (
    <Container maxWidth="xl">
      
      <Filter allPlace={allPlace} filterPlaces={filterPlaces} setFilterPlaces={setFilterPlaces}/>

      <Container maxWidth="lg" sx={{ py: { xs: 9 } }}>
        {places.length === 0 && (
          <Grid container spacing={{ xs: 6, md: 9 }}>
            {filterPlaces.map((tile, i) => {
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