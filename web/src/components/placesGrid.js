import React, { useState, useEffect } from "react"
import { Container, Grid, useMediaQuery } from "@mui/material"
import { PlaceTile } from "../components/placeTile"
import { Filter } from "./filter"
import { Pagination } from "./pagination"

export const PlacesGrid = ({ places, allPlace, searching = false, showFilter = true, pageContext }) => {

  const [filterPlaces, setFilterData] = useState( allPlace )

  const mobile = useMediaQuery('(max-width:600px)');


  // const updatePlaces = useCallback(() => {
   
  //   allPlace && setFilterData(allPlace)
  //   // const thePlaces = allPlace ? allPlace : filterPlaces
  //   //filterPlaces && setFilterData(filterPlaces);
  // }, [ setFilterData],)

  useEffect(() => {

    allPlace && setFilterData(allPlace)
  }, [setFilterData, allPlace]);

  return (
    <>{filterPlaces &&
      <Container className="section placesGrid" sx={{ pt: { xs: 10, md: 11 } }} maxWidth={mobile ? false : "xl"}>

        {showFilter && <Filter type="places" allData={allPlace} filterData={filterPlaces} setFilterData={setFilterData} />}

        <Container maxWidth="lg" sx={{ px: { xs: 0 } }}>
          {filterPlaces && (
            <Grid container spacing={{ xs: 0, md: 9 }}>
              {filterPlaces.map((tile, i) => {
                
                return (
                  <Grid key={`${tile.title}-${i}`} item xs={12} sm={6} md={6}>
                    <PlaceTile
                      title={tile?.title}
                      image={tile.coverImage?.asset?.gatsbyImageData}
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
          
        </Container>
        {pageContext.showPagination && <Pagination pageContext={pageContext}/>}
      </Container>
    }</>
  )
}