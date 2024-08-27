import React, { useState, useEffect, useRef } from "react"
import { graphql } from "gatsby"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material"
import { RenderPortableText } from "./renderPortableText"
import { RecipiesTile } from "./recipiesTile"

//Preview
import { useQuery } from "../../sanity/store"
import {
  CASE_STUDIES_BY_ID,
  ALL_CASE_STUDIES,
} from "../queries/documentQueries"
import { Carousel } from "./framer-motion-carousel/src/carousel"

export const RecipiesSection = ({
  allSanityRecipies,
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
  asCarousel,
  disableSummary
}) => {
  const [filtersPosts, setFilterData] = useState(null)

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))
  const sm = useMediaQuery(theme.breakpoints.down("sm"))

  const slide = useRef(null)

  const { data: allCaseStudies } = useQuery(ALL_CASE_STUDIES, {}, { initial })

  const { data: recipiesData } = useQuery(
    CASE_STUDIES_BY_ID,
    {
      categoryId:
        (previewData &&
          previewData?.showRecipiesArchive?.archive &&
          previewData?.showRecipiesArchive?.archive.map(node => node?._id)) ||
        [],
    },
    { initial },
  )

  const definedTopPadding =
    (previewData && _type === previewData?._type && previewData?.topPadding) ||
    topPadding

  const definedallSanityRecipies =
    (recipiesData && recipiesData?.length > 0 && recipiesData) ||
    (previewData?.showRecipiesArchive?.setArchive === true &&
      allCaseStudies &&
      allCaseStudies) ||
    allSanityRecipies?.nodes

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

  const definedAsCarousel = (previewData && _type === previewData?._type && previewData?.asCarousel) || asCarousel

  const definedDisableSummary = (previewData && _type === previewData?._type && previewData?.disableSummary) || disableSummary

  useEffect(() => {
    setFilterData(definedallSanityRecipies)
  }, [])

  return (
    <>
      <Container
        className="component-postsGrid"
        sx={{
          pb: {
            xs: !definedAsCarousel && theme.spacing(16),
            md: !definedAsCarousel && theme.spacing(16),
          },
          pt: definedTopPadding
            ? {
                xs: theme.spacing(16),
                md: theme.spacing(0),
              }
            : { xs: theme.spacing(16), md: theme.spacing(16) },
            overflowX: "hidden",
        }}
        maxWidth={mobile ? false : "xl"}
      >
        {/* <Filter className="component-filter" type="posts" allData={allPost} filtersData={filtersPosts} setFilterData={setFilterData}/> */}

        {definedTitle && (
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
        )}

        {!definedAsCarousel && filtersPosts && (
          <Grid container rowSpacing={{ xs: 6, md: 9 }}>
            {definedallSanityRecipies &&
              definedallSanityRecipies.map((tile, i) => {
                return (
                  <Grid key={`${tile.title}-${i}`} item xs={12} sm={12} md={12}>
                    <RecipiesTile {...tile} i={i} />
                  </Grid>
                )
              })}
          </Grid>
        )}

        {/* <Pagination pageContext={pageContext}/> */}
      </Container>
{definedAsCarousel && 
      <Container maxWidth={false} disableGutters={sm ? false : true}
        sx={{
          pb: {
            xs: definedAsCarousel && theme.spacing(16),
            md: definedAsCarousel && theme.spacing(16),
          },
          pl: {sm: "3vw", lg: "34px", xl: "6%"},
          pr: {sm: 0},
          position: "relative",
         // maxWidth: {xl: "1300px"},
        }}
      >
       
          
          <Box sx={{
            overflowX: {sm: "hidden"},
            maxWidth: "100vw"
          }}>
        <Carousel
          autoPlay={false}
          loop={true}
          ref={slide}
          renderDots={false}
          style={{
            columnGap: theme.spacing(0),
           
          }}
        >
          {definedAsCarousel &&
            filtersPosts &&
            filtersPosts.map((tile, i) => {
              return (
                <Box
                  key={tile?._key}
                  ref={slide}
                  sx={{
                    pr: {sm: 16, md: 16, lg: 16},  
                  }}
                >
                  <recipiesTile disableSummary={definedDisableSummary} {...tile} i={i} />
                </Box>
              )
            })}
        </Carousel>
        </Box>
      </Container>
      }
    </>
  )
}

export const query = graphql`
  fragment RecipiesSectionFragment on SanityRecipiesSection {
    _key
    _type
    topPadding
    _rawTitle(resolveReferences: { maxDepth: 10 })
    _rawLeftText(resolveReferences: { maxDepth: 10 })
    _rawRightText(resolveReferences: { maxDepth: 10 })
    subtitle
    showRecipiesArchive {
      setArchive
    }
    asCarousel
    disableSummary
  }
`