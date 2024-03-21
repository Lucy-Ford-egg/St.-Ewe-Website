import React, { useState, useEffect, useCallback } from "react"
import { graphql } from "gatsby"
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  Divider,
  useTheme,
} from "@mui/material"
import { RenderPortableText } from "./renderPortableText"
import { CaseStudyTile } from "./caseStudyTile"

//Preview
import { useQuery } from "../../sanity/store"
import {
  CASE_STUDIES_BY_ID,
  ALL_CASE_STUDIES,
} from "../queries/documentQueries"

export const CaseStudySection = ({
  allSanityCaseStudy,
  searching = false,
  topPadding,
  previewData,
  initial,
  _type,
  subtitle,
  title,
  _rawTitle,
  _rawLeftText,
  _rawRightText,
  leftText,
  rightText,
}) => {
  const [filtersPosts, setFilterData] = useState(null)

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  const { data: allCaseStudies } = useQuery(ALL_CASE_STUDIES, {}, { initial })

  const { data: caseStudyData } = useQuery(
    CASE_STUDIES_BY_ID,
    {
      categoryId:
        (previewData &&
          previewData?.showCaseStudyArchive?.archive &&
          previewData?.showCaseStudyArchive?.archive.map(node => node?._id)) ||
        [],
    },
    { initial },
  )

  const definedTopPadding =
    (previewData && _type === previewData?._type && previewData?.topPadding) ||
    topPadding

  const definedAllSanityCaseStudy =
    (caseStudyData && caseStudyData?.length > 0 && caseStudyData) ||
    (previewData?.showCaseStudyArchive?.setArchive === true &&
      allCaseStudies &&
      allCaseStudies) ||
    allSanityCaseStudy?.nodes

  const definedSubtitle =
    (previewData && _type === previewData?._type && previewData?.subtitle) ||
    subtitle
  const definedTitle =
    (previewData && _type === previewData?._type && previewData?.title) ||
    title ||
    _rawTitle

  const definedLeftText =
    (previewData && _type === previewData?._type && previewData?.leftText) ||
    leftText ||
    _rawLeftText
  const definedRightText =
    (previewData && _type === previewData?._type && previewData?.rightText) ||
    rightText ||
    _rawRightText

    useEffect(() => {
      setFilterData(definedAllSanityCaseStudy )
    }, [])

debugger
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
      
        <Grid container sx={{ pb: 15 }} rowSpacing={6} columnSpacing={16}>
          <Grid item xs={12} md={7}>
            {definedSubtitle && (
              <Typography color="primary" variant="overline">
                {definedSubtitle}
              </Typography>
            )}

            {definedTitle && (
              <RenderPortableText
                previewData={definedTitle}
                setAsHeading={false}
                value={definedTitle}
              />
            )}
            {definedLeftText && (
              <Divider
                sx={{
                  borderColor: "primary.main",
                  mb: 5,
                  maxWidth: 307,
                }}
              />
            )}
            {definedLeftText && (
              <RenderPortableText
                previewData={definedLeftText}
                variant={false}
                value={definedLeftText}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5} sx={{ alignSelf: "flex-end" }}>
            {definedRightText && (
              <RenderPortableText
                previewData={definedRightText}
                variant={false}
                value={definedRightText}
              />
            )}
          </Grid>
        </Grid>
      
      
        {filtersPosts && (
          <Grid container rowSpacing={{ xs: 6, md: 9 }}>
            {definedAllSanityCaseStudy &&
              definedAllSanityCaseStudy.map((tile, i) => {
                return (
                  <Grid key={`${tile.title}-${i}`} item xs={12} sm={12} md={12}>
                    <CaseStudyTile {...tile} i={i} />
                  </Grid>
                )
              })}
          </Grid>
        )}
     
      {/* <Pagination pageContext={pageContext}/> */}
    </Container>
  )
}

export const query = graphql`
  fragment CaseStudySectionFragment on SanityCaseStudySection {
    _key
    _type
    topPadding
    _rawTitle(resolveReferences: { maxDepth: 10 })
    _rawLeftText(resolveReferences: { maxDepth: 10 })
    _rawRightText(resolveReferences: { maxDepth: 10 })
    subtitle
    showCaseStudyArchive {
      setArchive
    }
  }
`
