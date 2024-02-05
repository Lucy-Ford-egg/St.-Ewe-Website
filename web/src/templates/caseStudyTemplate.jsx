import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
import { pageQuery } from "./queries/documentQueries"

import {
  Container,
  Grid,
  useTheme,
  Box,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { RenderPortableText } from "../components/renderPortableText"
import { CategoryLabel } from "../components/categoryLabel"

const CaseStudyTemplate = props => {
  const { data, pageContext, previewData, sanityConfig } = props
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  const image = data.sanityCaseStudy.image
  return (
    <IncludePreview
      documentQueries={pageQuery}
      slug={data.sanityCaseStudy.slug} //
      data={data}
    >
      <Container
        maxWidth="fluid"
        disableGutters
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(24, 1fr)",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "100vh",
          maxHeight: { xs: "", md: "100vh" },
          overflow: "hidden",
          px: "0 !important",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            gridColumn: "1/25",
            gridRow: "1/auto",
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            pb: 6,
            pt: { xs: 0, md: 0 },
            alignSelf: {xs: "end", md: "unset"},
          }}
        >
          <Grid container>
            <Grid item xs={6} md={4}>
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  px: {xs: 6, md: 13},
                  pt: 13,
                  pb: {xs: 6, md: 13},
                }}
              >
                <Typography variant="h1" component="h3" color="white.main">
                  {data.sanityCaseStudy.person}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} md={2} sx={{flexGrow: 1,}}>
              <Box sx={{height: '100%'}}>
              <Box sx={{ display: "flex", flexDirection: "column", height: '100%', flexGrow: 1 }}>
                <Box
                  sx={{
                    backgroundColor: "primary.light",
                    px: 6,
                    py: 6,
                    display: 'flex',
                    flexGrow: 1,
                    alignItems: 'flex-end',
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h3" color="white.main"
                    sx={{ fontSize: theme.spacing(6) }}
                  >
                    01
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "primary.mid",
                    px: 6,
                    py: 6,
                    display: 'flex',
                    flexGrow: 1,
                    alignItems: 'flex-end',
                  }}
                >
                  <Typography variant="overline" component="h3" color="white.main">
                    {data.sanityCaseStudy.category.name}
                  </Typography>
                </Box>
              </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Box
          sx={{
            gridColumn: "1/25",
            gridRow: "1/auto",
            display: "grid",
            gridTemplateColumns: "repeat(24, 1fr)",
            height: "100%",
            maxHeight: "100%",
          }}
        >
          {image && (
            <Image
              // pass asset, hotspot, and crop fields
              crop={(previewData && previewData?.image?.crop) || image?.crop}
              hotspot={
                (previewData && previewData?.image?.hotspot) || image?.hotspot
              }
              asset={
                (previewData &&
                  previewData.image &&
                  previewData.image?._ref &&
                  urlFor(previewData.image).width(1440).url()) ||
                image.asset
              }
              width={1440}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                flexGrow: 1,
                minHeight: "100%",
                gridColumn: "1/25",
                gridRow: "1/auto",
              }}
            />
          )}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              gridColumn: "1/25",
              gridRow: "1/auto",
              width: "100%",
              height: "100%",
              //backgroundColor: "rgba(0,0,0,0.3)",
            }}
          />
        </Box>
      </Container>

      <Container maxWidth="md" sx={{py: {xs: 15 ,md: 16}}} disableGutters={mobile ? false : true}>
        <RenderPortableText value={data?.sanityCaseStudy._rawBody}/>
      </Container>

      <Modules
        pageContext={pageContext}
        modules={data?.sanityCaseStudy?.pageBuilder}
      />
    </IncludePreview>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityCaseStudy} location={location} />
}

export const caseStudyTemplateQuery = graphql`
  query caseStudyTemplateQuery($slug: String!) {
    sanityCaseStudy(slug: { current: { eq: $slug } }) {
      slug {
        current
      }
      title
      date(formatString: "Do MMMM YYYY")
      category {
        name
      }
      person
      image: coverImage {
        asset {
          _id

          gatsbyImageData
        }
        hotspot {
          x
          y
          width
          height
        }
        crop {
          bottom
          left
          right
          top
        }
      }
      _rawBody(resolveReferences: { maxDepth: 10 })
      #...SeoPageFragment
      pageBuilder {
        ... on SanityHeaderSection {
          ...HeaderSectionFragment
        }
        ... on SanityFeatureSection {
          ...FeatureSectionFragment
        }
        ... on SanityTeamSection {
          ...TeamSectionFragment
        }
        ... on SanityVideoSection {
          ...VideoSectionFragment
        }
        ... on SanityFeaturesListSection {
          ...FeaturesListSectionFragment
        }
        ... on SanityCtaSection {
          ...CtaSectionFragment
        }
        ... on SanityServicesSection {
          ...ServicesSectionFragment
        }
        ... on SanityTestimonialSection {
          ...TestimonialSectionFragment
        }
        ... on SanityImageCarouselSection {
          ...ImageCarouselSectionFragment
        }
        ... on SanityLocationSection {
          ...LocationSectionFragment
        }

        ... on SanityBenifitsSection {
          ...BenifitsSectionFragment
        }
        ... on SanityContactSection {
          ...ContactSectionFragment
        }
      }
    }
  }
`
export default CaseStudyTemplate
