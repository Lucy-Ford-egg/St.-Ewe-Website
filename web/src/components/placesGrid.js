import React, { useState, useEffect, useCallback } from "react"
import { Container, Grid, useMediaQuery } from "@mui/material"
import { PlaceTile } from "../components/placeTile"
import { Filter } from "./filter"

export const PlacesGrid = ({ places, allPlace, searching = false, showFilter = true }) => {

  const [filterPlaces, setFilterData] = useState(allPlace)

  const mobile = useMediaQuery('(max-width:600px)');

  const updatePlaces = useCallback(() => {
    setFilterData(filterPlaces);
  }, [filterPlaces, setFilterData],)

  useEffect(() => {
    updatePlaces()
  }, [updatePlaces]);

  return (
    <>{places?.length >= 1 &&
      <Container className="section placesGrid" sx={{ pt: { xs: 10, md: 11 } }} maxWidth={mobile ? false : "xl"}>

        {showFilter && <Filter type="places" allData={allPlace} filterData={filterPlaces} setFilterData={setFilterData} />}

        <Container maxWidth="lg" sx={{ px: { xs: 0 } }}>
          {places && searching === false && (
            <Grid container spacing={{ xs: 0, md: 9 }}>
              {filterPlaces?.map((tile, i) => {
                return (
                  <Grid key={`${tile.title}-${i}`} item xs={12} sm={6} md={6}>
                    <PlaceTile
                      title={tile?.title}
                      image={tile.coverImage?.asset.gatsbyImageData}
                      category={tile?.categories}
                      date={tile?.date}
                      to={tile?.slug?.current}
                      excerpt={tile?.excerpt}
                    />
                  </Grid>
                )
              })}
            </Grid>
          )}
          {Array.isArray(places) && searching === true && (
            <Grid container spacing={{ xs: 0, md: 9 }}>
              {places.map((tile, i) => {
                return (
                  <Grid key={`${tile.title}-${i}`} item xs={12} sm={6} md={6}>
                    <PlaceTile
                      title={tile?.title}
                      image={searching === true ? tile.coverImage : tile.coverImage?.asset?.gatsbyImageData}
                      categories={tile?.categories}
                      date={tile?.date}
                      to={tile?.slug?.current}
                      excerpt={tile?.excerpt}
                    />
                  </Grid>
                )
              })}
            </Grid>
          )}
        </Container>
      </Container>
    }</>
  )
}