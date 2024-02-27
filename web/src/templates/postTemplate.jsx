import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
import { pageQuery } from "./queries/documentQueries"
import { contrastColour } from "../utils/contrastColour"
import {RenderPortableText} from '../components/renderPortableText'
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

const PostTemplate = props => {
  const { data, pageContext, previewData, sanityConfig } = props
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  const { image, tileColor } = data.sanityPost

  return (
    <IncludePreview
      documentQueries={pageQuery}
      slug={data.sanityPost.slug} //
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
          backgroundColor: tileColor?.value,
        }}
      >
        <Container
          maxWidth="xl"
          disableGutters={true}
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
                {data.sanityPost?.category && (
                  <Typography
                    variant="overline"
                    component="h3"
                    color={contrastColour(tileColor).textColour}
                  >
                    {data.sanityPost?.category.name}
                  </Typography>
                )}
                <Divider
                  sx={{
                    display: "flex",
                    my: 10,
                    width: "100%",
                    borderColor: contrastColour(tileColor).divider.hex,
                  }}
                />
                {data?.sanityPost?.title && (
                  <Typography
                    variant="h1"
                    color={contrastColour(tileColor).textColour}
                    sx={{
                      wordBreak: 'break-word'
                    }}
                  >
                    {data?.sanityPost?.title}
                  </Typography>
                )}
                <Divider
                  sx={{
                    display: "flex",
                    my: 10,
                    width: "100%",
                    borderColor: contrastColour(tileColor).divider.hex,
                  }}
                />
                <Box sx={{
                  display: 'flex',
                }}>
                {data.sanityPost?.date && (
                  <Typography
                    variant="h6"
                    component="p"
                    color={contrastColour(tileColor).textColour}
                    sx={{
                      fontStyle: 'italic',
                      fontWeight: '400'
                    }}
                  >
                    {data.sanityPost?.date}
                  </Typography>
                )}
                <Box sx={{
                  display: 'inline-flex',
                  color: contrastColour(tileColor).textColour,
                  ml: "5px",
                  lineHeight: 1.4,
                }}>{` | `}</Box>
                {data.sanityPost?.author && (
                  
                  <Typography
                    variant="h6"
                    component="p"
                    color={contrastColour(tileColor).textColour}
                    sx={{
                      fontStyle: 'italic',
                      fontWeight: '400'
                    }}
                  >
                    <Box sx={{
                    display: 'inline-flex',
                    color: contrastColour(tileColor).textColour,
                    ml: "5px",
                  }}>{` By `}</Box> {data.sanityPost?.author.name}
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
          {/* <Box
            sx={{
              position: "relative",
              zIndex: 1,
              gridColumn: "1/25",
              gridRow: "1/auto",
              width: "100%",
              height: "100%",
              //backgroundColor: "rgba(0,0,0,0.3)",
            }}
          /> */}
        </Box>
      </Container>

      <Container maxWidth="md" sx={{py: {xs: 15 ,md: 16}}} disableGutters={mobile ? false : true}>
        <RenderPortableText value={data?.sanityPost._rawBody}/>
      </Container>

      <Modules
        pageContext={pageContext}
        modules={data?.sanityPost?.pageBuilder}
      />
    </IncludePreview>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPost} location={location} />
}

export const pageTemplateQuery = graphql`
  query postTemplateQuery($slug: String!) {
    sanityPost(slug: { current: { eq: $slug } }) {
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
        ...PageBuilderFragment
      }
    }
  }
`
export default PostTemplate
