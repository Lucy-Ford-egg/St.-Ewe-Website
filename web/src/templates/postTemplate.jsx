import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
import { contrastColour } from "../utils/contrastColour"
import {RenderPortableText} from '../components/renderPortableText'
import {formattedDate } from "../utils/formattedDate"
import {
  Container,
  Grid,
  useTheme,
  Box,
  Typography,
  Divider,
  useMediaQuery
} from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
//Preview
import { useQuery } from "../../sanity/store"
import { POST_QUERY } from "../queries/documentQueries"

const PostTemplate = props => {
  const { data, pageContext, initial } = props
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  const { image, tileColor } = data.sanityPost

  // Preview
  const { data: previewData } = useQuery(
    POST_QUERY,
    { slug: data.sanityPost.slug.current },
    { initial },
  )

  const definedRawBody = (previewData && previewData?.body) || data?.sanityPost._rawBody
  const definedModules = (previewData && previewData?.pageBuilder)  || data?.sanityPost?.pageBuilder
  const definedTileColor = (previewData && previewData?.tileColor) || tileColor
  const definedCategory = (previewData && previewData?.category) || data.sanityPost?.category
  const definedTitle = (previewData && previewData?.title) || data?.sanityPost?.title
  const definedDate = (previewData && previewData?.date) || data.sanityPost?.date
  const definedAuthor = (previewData && previewData?.author) || data.sanityPost?.author 
  const definedImage = (previewData && previewData?.image) || image

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
          minHeight: { xs: "85vh", md: "65vh", lg: "100vh" },
          maxHeight: { xs: "85vh", md: "65vh", lg: "100vh" },
          overflow: "hidden",
          px: "0 !important",
          backgroundColor: definedTileColor?.value,
        }}
      >
        <Container
          maxWidth="xl"
          //disableGutters={false}
          sx={{
            gridColumn: "1/25",
            gridRow: "1/auto",
            position: "relative",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            pb: 6,
            pt: { xs: 0, md: 0 },
            alignSelf: { xs: "end", md: "end" },
          }}
        >
          <Grid container>
            <Grid item xs={12} md={12}>
              <Box
                sx={{ 
                  pt: 13,
                  pb: { xs: 6, md: 13 },
                }}
              >
                {definedCategory && (
                  <Typography
                    variant="overline"
                    component="h3"
                    color={contrastColour(definedTileColor).textColour}
                  >
                    {definedCategory.name}
                  </Typography>
                )}
                <Divider
                  sx={{
                    display: "flex",
                    my: 10,
                    width: "100%",
                    borderColor: contrastColour(definedTileColor).divider.hex,
                  }}
                />
                {definedTitle && (
                  <Typography
                    variant="h1"
                    color={contrastColour(definedTileColor).textColour}
                    sx={{
                      wordBreak: 'break-word'
                    }}
                  >
                    {definedTitle}
                  </Typography>
                )}
                <Divider
                  sx={{
                    display: "flex",
                    my: 10,
                    width: "100%",
                    borderColor: contrastColour(definedTileColor).divider.hex,
                  }}
                />
                <Box sx={{
                  display: 'flex',
                }}>
                {definedDate && (
                  <Typography
                    variant="h6"
                    component="p"
                    color={contrastColour(definedTileColor).textColour}
                    sx={{
                      fontStyle: 'italic',
                      fontWeight: '400'
                    }}
                  >
                    {formattedDate(definedDate)}
                  </Typography>
                )}
                <Box sx={{
                  display: 'inline-flex',
                  color: contrastColour(definedTileColor).textColour,
                  ml: "5px",
                  lineHeight: 1.4,
                }}>{` | `}</Box>
                {definedAuthor && (
                  
                  <Typography
                    variant="h6"
                    component="p"
                    color={contrastColour(definedTileColor).textColour}
                    sx={{
                      fontStyle: 'italic',
                      fontWeight: '400'
                    }}
                  >
                    <Box sx={{
                    display: 'inline-flex',
                    color: contrastColour(definedTileColor).textColour,
                    ml: "5px",
                  }}>{` By `}</Box> {definedAuthor.name}
                  </Typography>
                 
                )}
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
            position: 'relative',
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          {definedImage && (
            <Image
              // pass asset, hotspot, and crop fields
              crop={definedImage?.crop}
              hotspot={
                definedImage?.hotspot
              }
              asset={
                (definedImage && definedImage?._ref &&
                  urlFor(definedImage).width(1440).url(definedImage)) ||
                definedImage?.asset
              }
              width={1440}
              height={702}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                flexGrow: 1,
                minHeight: "100%",
                maxHeight: "100%",
                gridColumn: "1/25",
                gridRow: "1/auto",
              }}
            />
          )}
          {definedImage && <Box
            sx={{
              position: "relative",
              zIndex: 1,
              gridColumn: "1/25",
              gridRow: "1/auto",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          />}

        </Box>
      </Container>

      {definedRawBody && (<Container maxWidth="md" sx={{py: {xs: 15 ,md: 16}}} disableGutters={mobile ? false : true}>
        <RenderPortableText value={definedRawBody}/>
      </Container>)}

      <Modules
        pageContext={pageContext}
        modules={definedModules}
      />
    </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPost} location={location} />
}

export const pageTemplateQuery = graphql`
  query postTemplateQuery($slug: String!) {
    sanityPost(slug: { current: { eq: $slug } }) {
      ... SeoPostFragment
      navOverlay
      navColor {
        value
      }
      author {
        name
      }
      slug {
        current
      }
      title
      date(formatString: "MMM Do, YYYY")
      category {
        name
      }
      tileColor {
        value
        label
      }
      image {
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
export default PostTemplate
