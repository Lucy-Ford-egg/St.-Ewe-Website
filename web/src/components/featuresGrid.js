import React, { useState, useEffect, useCallback } from "react"
import { Container, Grid } from "@mui/material"
import { Pagination } from "../components/pagination"
import { FeatureTile } from "../components/featureTile"
import { Filter } from "./filter"


export const FeaturesGrid = ({ features, allFeature, searching = false, pageContext }) => {

const [filtersFeatures, setFilterData] = useState(null)

  const updateFeatures = useCallback(() => { 
    const theFeatures = allFeature ? allFeature : filtersFeatures
    setFilterData(theFeatures);
  },[filtersFeatures, setFilterData],)

  useEffect(() => {
    updateFeatures()
  }, [updateFeatures]);


  return (
    <Container className="component-featuresGrid" maxWidth="xl">
      
      <Filter className="component-filter" type="features" allData={allFeature} filtersData={filtersFeatures} setFilterData={setFilterData}/>

      <Container maxWidth="lg" sx={{ pt: { xs: 9 } }}>
        {filtersFeatures && searching === false && (
          <Grid container spacing={{ xs: 6, md: 9 }}>
            {filtersFeatures?.map((tile, i) => {
              return (
                <Grid key={`${tile.title}-${i}`} item xs={12} sm={6} md={6}>
                  <FeatureTile
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
        {/* {Array.isArray(posts) && searching === true && (
          <Grid container spacing={{ xs: 6, md: 9 }}>
            {posts.map((tile, i) => {
              return (
                <Grid key={`${tile.title}-${i}`} item xs={12} sm={6} md={6}>
                  <PostTile
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
        )} */}
      </Container>
      <Pagination pageContext={pageContext}/>
    </Container>
  )
}