import React, { useState, useEffect, useCallback } from "react"
import { graphql } from "gatsby"
import { Container, Grid, useMediaQuery, useTheme } from "@mui/material"
import { Pagination } from "./pagination"
import { CaseStudyTile } from "./caseStudyTile"
import { Filter } from "./filter"

//Preview
import { useQuery } from "../../sanity/store"
import {  CASE_STUDIES_BY_ID, ALL_CASE_STUDIES } from "../queries/documentQueries"

export const CaseStudySection = ({
  allSanityCaseStudy,
  searching = false,
  topPadding,
  previewData,
  initial,
  _type,
}) => {
  const [filtersPosts, setFilterData] = useState(null)

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  const updatePosts = useCallback(() => {
    const thePlaces = filtersPosts ? filtersPosts : allSanityCaseStudy
    setFilterData(thePlaces)
  }, [filtersPosts, setFilterData])

  useEffect(() => {
    updatePosts()
  }, [updatePosts])
  

  const { data: allCaseStudies } = useQuery(
    ALL_CASE_STUDIES,
    {},
    { initial },
  )

  const { data: caseStudyData } = useQuery(
    CASE_STUDIES_BY_ID,
    { categoryId: previewData && previewData?.showCaseStudyArchive?.archive && previewData?.showCaseStudyArchive?.archive.map((node) => node?._id ) || []},
    { initial },
  )

  const definedTopPadding =
    (previewData && _type === previewData?._type && previewData?.topPadding) || topPadding
  
  const definedAllSanityCaseStudy = (caseStudyData && caseStudyData?.length > 0 && caseStudyData) || (previewData?.showCaseStudyArchive?.setArchive === true && allCaseStudies && allCaseStudies) || allSanityCaseStudy.nodes


  return (
    <Container
      className="component-postsGrid"
      sx={{ 
        pb: { xs: theme.spacing(16), md: theme.spacing(16) },
          pt: definedTopPadding
            ? {
                xs: theme.spacing(16),
                md: theme.spacing(0),
              }
            : { xs: theme.spacing(16), md: theme.spacing(16) },
        }}
      maxWidth={mobile ? false : "xl"}
    >
      {/* <Filter className="component-filter" type="posts" allData={allPost} filtersData={filtersPosts} setFilterData={setFilterData}/> */}

      <Container sx={{ px: { xs: 0 } }}>
        {filtersPosts && searching === false && (
          <Grid container spacing={{ xs: 6, md: 9 }}>
            {definedAllSanityCaseStudy && definedAllSanityCaseStudy.map((tile, i) => {
            
              return (
                <Grid key={`${tile.title}-${i}`} item xs={12} sm={12} md={12}>
                  <CaseStudyTile {...tile} i={i} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Container>
      {/* <Pagination pageContext={pageContext}/> */}
    </Container>
  )
}

export const query = graphql`
  fragment CaseStudySectionFragment on SanityCaseStudySection {
    _key
    _type
    topPadding
    showCaseStudyArchive {
      setArchive
    }
  }
`
