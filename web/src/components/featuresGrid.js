import React, { useState, useEffect, useCallback } from "react"
import { Container, Grid, useMediaQuery } from "@mui/material"
import { Pagination } from "../components/pagination"
import { FeatureTile } from "../components/featureTile"
import { Filter } from "./filter"


export const FeaturesGrid = ({ features, allFeature, searching = false, pageContext }) => {

const [filtersFeatures, setFilterData] = useState(null)
const mobile = useMediaQuery('(max-width:600px)');

  const updateFeatures = useCallback(() => { 
    const theFeatures = allFeature ? allFeature : filtersFeatures
    setFilterData(theFeatures);
  },[filtersFeatures, setFilterData],)

  useEffect(() => {
    updateFeatures()
  }, [updateFeatures]);


  return (
    
      <Container className="section featuresGrid" sx={{ pt: { xs: 10, md: 11 } }} maxWidth={mobile ? false : "xl"}>
      
      <Filter className="component-filter" type="features" allData={allFeature} filtersData={filtersFeatures} setFilterData={setFilterData}/>

      <Container maxWidth="lg" sx={{ px: { xs: 0 } }}>
        {filtersFeatures && searching === false && (
          <Grid container spacing={{ xs: 0, md: 9 }}>
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
      </Container>
      <Pagination pageContext={pageContext}/>
    </Container>
  )
}