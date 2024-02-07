import React, { useState, useEffect, useCallback } from "react"
import { graphql } from "gatsby"
import { Container, Grid, useMediaQuery, useTheme } from "@mui/material"
import { Pagination } from "./pagination"
import { CaseStudyTile } from "./caseStudyTile"
import { Filter } from "./filter"

export const CaseStudySection = ({
  allCaseStudy,
  searching = false,
  pageContext,
  topPadding,
}) => {
  const [filtersPosts, setFilterData] = useState(null)

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  const updatePosts = useCallback(() => {
    const thePlaces = filtersPosts ? filtersPosts : allCaseStudy
    setFilterData(thePlaces)
  }, [filtersPosts, setFilterData])

  useEffect(() => {
    updatePosts()
  }, [updatePosts])

  return (
    <Container
      className="component-postsGrid"
      sx={{ 
        pb: { xs: theme.spacing(16), md: theme.spacing(16) },
          pt: topPadding
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
            {filtersPosts?.map((tile, i) => {
              debugger
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
