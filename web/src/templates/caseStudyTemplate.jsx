import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
import {
  Container,
  Grid,
  useTheme,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { RenderPortableText } from "../components/renderPortableText"
//Preview
import { useQuery } from "../../sanity/store"
import { CASE_STUDY_QUERY } from "../queries/documentQueries"

const CaseStudyTemplate = props => {
  const { data, pageContext, initial } = props
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  // Preview
  const { data: previewData, sourceMap } = useQuery(
    CASE_STUDY_QUERY,
    { slug: data.sanityCaseStudy.slug.current },
    { initial },
  )

  const definedImage =
    (previewData && previewData?.coverImage) || data.sanityCaseStudy?.coverImage
  const definedRawPerson =
    (previewData && previewData?.person) || data.sanityCaseStudy?._rawPerson
  const definedService =
    (previewData && previewData?.service?.name) ||
    data.sanityCaseStudy?.service?.name

  const definedRawBody = (previewData && previewData?.body) || data?.sanityCaseStudy._rawBody
  const definedModules = (previewData && previewData?.pageBuilder)  || data?.sanityCaseStudy?.pageBuilder
    
  return (
    <>
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
            alignSelf: { xs: "end", md: "unset" },
          }}
        >
          <Grid container>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  px: { xs: 6, md: 13 },
                  pt: 13,
                  pb: { xs: 6, md: 13 },
                  maxWidth: "100%",
                }}
              >
                {definedRawPerson && (
                  <Box sx={{ color: "white.main",  maxWidth: "100%", }}>
                    <RenderPortableText
                      setAsHeading="h1"
                      value={definedRawPerson}
                    />
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={2} sx={{ flexGrow: 1 }}>
              <Box sx={{ height: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {xs: "row", sm: "column"},
                    height: "100%",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "primary.light",
                      px: 6,
                      py: 6,
                      display: "flex",
                      flexGrow: 1,
                      alignItems: "flex-end",
                      maxWidth: "100%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      color="white.main"
                      sx={{ fontSize: theme.spacing(6) }}
                    >
                      {String(pageContext.key + 1).padStart(2, "0")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "primary.mid",
                      px: 6,
                      py: 6,
                      display: "flex",
                      flexGrow: 1,
                      alignItems: "flex-end",
                      maxWidth: "100%",
                    }}
                  >
                    {definedService && (
                      <Typography
                        variant="overline"
                        component="h3"
                        color="white.main"
                      >
                        {definedService}
                      </Typography>
                    )}
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
          {definedImage && (
            <Image
              // pass asset, hotspot, and crop fields
              crop={definedImage?.crop}
              hotspot={definedImage?.hotspot}
              asset={
                (definedImage?._ref &&
                  urlFor(definedImage).width(1400).url()) ||
                definedImage?.asset
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
            }}
          />
        </Box>
      </Container>
            {definedRawBody && (
      <Container
        maxWidth="md"
        sx={{ py: { xs: 15, md: 16 } }}
        disableGutters={mobile ? false : true}
      >
        <RenderPortableText value={definedRawBody} />
      </Container>
            )}
      <Modules
        pageContext={pageContext}
        modules={definedModules}
      />
            
    </>
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
      service {
        name
      }
      _rawPerson(resolveReferences: { maxDepth: 10 })
      coverImage {
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
        ...PageBuilderFragment
      }
    }
  }
`
export default CaseStudyTemplate

// TODO:
// ... on SanityLocationSection {
//   ...LocationSectionFragment
// }
// ... on SanityBenifitsSection {
//   ... BenifitsSectionFragment
// }
// ... on SanityContactSection {
//   ... ContactSectionFragment
// }
