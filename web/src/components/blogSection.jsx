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
import {Button} from 'gatsby-theme-material-ui'
import Image from "gatsby-plugin-sanity-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { CategoryLabel } from "./categoryLabel"
import EastIcon from "@mui/icons-material/East"
import { Link } from "gatsby-theme-material-ui"

export const BlogSection = props => {

  const { allSanityPost, previewData, sanityConfig, topPadding, pageContext, showArchive } = props

  const theme = useTheme()
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
        {allSanityPost && allSanityPost.nodes &&
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
                    <Typography variant="body1" sx={{ pt: 2}}>{post.excerpt}</Typography>
                  </Box>
                  <Box sx={{ px: 4, py: 6, flexGrow: 0 , bottom: 0 }}>
                    <Button
                      sx={{
                        pl: 0,
                        textTransform: 'uppercase',
                        letterSpacing: 0.3,
                      }}
                      size='small'
                      variant='text'
                      color='primary'
                      to={`${post.slug.current}`}
                      endIcon={<EastIcon color='primary' />}
                    >
                      Read More
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            )
          })}
      </Grid>
      
      <Box>
        {/* previousPageLink and nextPageLink were added by the plugin */ }
        <Link to={props.pageContext.previousPagePath}>Previous</Link>
        <Link to={props.pageContext.nextPagePath}>Next</Link>
      </Box>
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


