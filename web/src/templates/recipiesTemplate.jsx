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

const RecipiesTemplate = props => {
  const { data, pageContext, initial, location } = props
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  // Preview
  const { data: previewData } = useQuery(
    `{"recipiesQuery:" ${CASE_STUDY_QUERY}`,
    { slug: data.sanityRecipies.slug.current },
    { initial },
  )

  const definedImage =
    (previewData && previewData?.recipiesQuery?.coverImage) || data.sanityRecipies?.coverImage

  const definedCategory =
    (previewData && previewData?.recipiesQuery?.category?.name) ||
    data.sanityRecipies?.category?.name

  const definedRawBody = (previewData && previewData?.recipiesQuery?.instructions) || data?.sanityRecipies._rawInstructions
  const definedModules = (previewData && previewData?.recipiesQuery?.pageBuilder)  || data?.sanityRecipies?.pageBuilder

  return (
    <>
      <Container
        maxWidth="fluid"
        disableGutters
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(24, 1fr)",
          alignItems: "flex-end",
          justifyContent: "center",
          height: "100%",
          minHeight: {xs: "78vh", sm: "min-content"},
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
            pb: {xs: 6, md: 16},
            pt: { xs: 0, md: 0 },
            alignSelf: { xs: "end", md: "unset" },
          }}
        >
          <Grid container>
            <Grid item xs={12} sm="auto">
              <Box
                sx={{
                  backgroundColor: location?.state?.backgroundColor ? `${location?.state?.backgroundColor}.main` : "primary.main",
                  px: { xs: 6, md: 13 },
                  pt: 13,
                  pb: { xs: 6, md: 13 },
                  maxWidth: "100%",
                }}
              >
              
              </Box>
            </Grid>

            <Grid item xs={12} sm={2} sx={{ flexGrow: 1 }}>
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
                      backgroundColor: location?.state?.backgroundColor ? `${location?.state?.backgroundColor}.light` : "primary.light",
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
                       {  pageContext.number ? String(pageContext.key + 1).padStart(2, "0") : location?.state ? String(location?.state?.number).padStart(2, "0") :  "01"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: location?.state?.backgroundColor ? `${location?.state?.backgroundColor}.mid` : "primary.mid",
                      px: 6,
                      py: 6,
                      display: "flex",
                      flexGrow: 1,
                      alignItems: "flex-end",
                      maxWidth: "100%",
                    }}
                  >
                    {definedCategory && (
                      <Typography
                        variant="overline"
                        component="h3"
                        color="white.main"
                      >
                        {definedCategory}
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
                  urlFor(definedImage).width(1400).height(700).url()) ||
                definedImage?.asset
              }
              width={1440}
              height={700}
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
        getAllPosts={data.getAllPosts}
        allSanityRecipies={data.allSanityRecipies}
      />
            
    </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityRecipies} location={location} />
}

export const recipiesTemplateQuery = graphql`
  query recipiesTemplateQuery($slug: String!, $recipiesIds:[String!]) {
    sanityRecipies(slug: { current: { eq: $slug } }) {
      ... SeoRecipiesFragment
      slug {
        current
      }
      title
      date(formatString: "Do MMMM YYYY")
      category {
        name
      }
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
      _rawInstructions(resolveReferences: { maxDepth: 10 })
      #...SeoPageFragment
      pageBuilder {
        ...PageBuilderFragment
      }
    }
    allSanityRecipies(filter: {
      category: {
        _id: {
          in: $recipiesIds
        }
      }
    }) {
    nodes {
      _key
      _id
      ...RecipiesTileFragment 
    }
  }
    getAllPosts: allSanityPost(sort: {date: DESC}){
      nodes {
        tileImage {
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
     
        slug {
          current
        }
        date
        category {
          name
          _id
          slug{
            current
          }
        }
        author {
          name
        }
        title
        tileColor{
          value
          label
        }
      }
    }
  }
`
export default RecipiesTemplate

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
