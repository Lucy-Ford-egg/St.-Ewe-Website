import React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Typography,
  Grid,
  useTheme,
  Box,
  Paper,
  Divider,
} from "@mui/material"
import { Button, IconButton } from "gatsby-theme-material-ui"
import Image from "gatsby-plugin-sanity-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { CategoryLabel } from "./categoryLabel"
import EastIcon from "@mui/icons-material/East"
import { Link } from "gatsby-theme-material-ui"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

export const BlogSection = props => {
  const {
    allSanityPost,
    previewData,
    sanityConfig,
    topPadding,
    pageContext,
    showArchive,
  } = props

  const theme = useTheme()

  const pages = Array.from({ length: pageContext.numberOfPages }, (_, index) => index + 1);

  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: { xs: theme.spacing(10), md: theme.spacing(10) },
        pt: topPadding
          ? {
              xs: theme.spacing(10),
              md: theme.spacing(0),
            }
          : { xs: theme.spacing(10), md: theme.spacing(10) },
      }}
    >
      <Grid container columnSpacing={6} rowSpacing={12}>
        {allSanityPost &&
          allSanityPost.nodes &&
          allSanityPost.nodes.map((post, i) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={1}
                  square
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  {post.image && post.image.asset && (
                    <Image
                      // pass asset, hotspot, and crop fields
                      // {...testimonialTiles[slideIndex].image}
                      crop={
                        (previewData && previewData?.image?.crop) ||
                        post.image.crop
                      }
                      hotspot={
                        (previewData && previewData?.image?.hotspot) ||
                        post.image.hotspot
                      }
                      asset={
                        getGatsbyImageData(
                          previewData && previewData?.image?.asset,
                          { maxWidth: 100 },
                          sanityConfig,
                        ) || post.image.asset
                      }
                      // tell Sanity how large to make the image (does not set any CSS)
                      // width={1300}
                      // style it how you want it
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        minHeight: "300px",
                        maxHeight: "300px",
                        flexGrow: 1,
                      }}
                    />
                  )}
                  <Box sx={{ px: 4, pt: 1, flexGrow: 1 }}>
                    <CategoryLabel label={post.category?.name} />
                    <Typography variant="h5" sx={{ pb: 2 }}>
                      {post.title}
                    </Typography>
                    <Divider
                      component="div"
                      role="presentation"
                      sx={{
                        borderColor: theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="body1" sx={{ pt: 2 }}>
                      {post.excerpt}
                    </Typography>
                  </Box>
                  <Box sx={{ px: 4, py: 6, flexGrow: 0, bottom: 0 }}>
                    <Button
                      sx={{
                        pl: 0,
                        textTransform: "uppercase",
                        letterSpacing: 0.3,
                      }}
                      size="small"
                      variant="text"
                      color="primary"
                      to={`${post.slug.current}`}
                      endIcon={<EastIcon color="primary" />}
                    >
                      Read More
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            )
          })}
      </Grid>
      <Container maxWidth="lg" sx={{
        pt: 12,
      }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 6,
      }}>
        {/* previousPageLink and nextPageLink were added by the plugin */}
        
          <Button
            variant="text"
            color="tertiary"
            startIcon={<ChevronLeftIcon color="primary" sx={{
              opacity: props.pageContext.humanPageNumber === 1 && 0.2
            }}/>}
            to={props.pageContext.previousPagePath}
            disabled={props.pageContext.humanPageNumber === 1 && true}
          >
            Recent Posts
          </Button>

          
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: 3,
            }}>
            {pages.map((node) => {
              return <Typography sx={{
                color: node === props.pageContext.humanPageNumber ? 'primary.main' : 'inherit'
              }}>{node}</Typography>
            })}
            </Box>
          
       
          <Button
            variant="text"
            color="tertiary"
            endIcon={<ChevronRightIcon color="primary" sx={{
              opacity: props.pageContext.humanPageNumber === props.pageContext.numberOfPages && 0.2
            }} />}
            to={props.pageContext.nextPagePath}
            disabled={props.pageContext.humanPageNumber === props.pageContext.numberOfPages && true}
          >
            Older Posts
          </Button>
        
      </Box>
      </Container>
    </Container>
  )
}

export const query = graphql`
  fragment BlogSectionFragment on SanityBlogSection {
    _key
    _type
    showArchive {
      setArchive
      archive {
        _id
        name
      }
    }
    topPadding
  }
`
