import React, { useState } from 'react'
import { graphql, Link } from "gatsby"
import { motion } from "framer-motion"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { Card, Container, CardActions, CardContent, Box, Button, Typography } from '@mui/material';
import clientTheme from '../gatsby-theme-material-ui-top-layout/theme'
import { contrastColour } from "../utils/contrastColour"

export const PostTile = ({ categories, title, image, date, to }) => {

  const [hovered, setHovered] = useState(false)

  const renderTaxonomies = (categories) => {

    const taxonomies = categories?.map((tax, i) => {
      return (
        tax.name
      )
    })
    return (
      taxonomies && taxonomies.join(', ')
    )
  }

  const variants = {
    hovered: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        type: "spring",
        bounce: 0
      }
    },
    unhovered: {
      opacity: 0,
      y: -10,
      height: 0,
    },
  }

  const textColour = {
    hovered: {
      color: clientTheme.palette.white.main
    },
    unhovered: {
      color: clientTheme.palette.text.main
    },
  }

  const cardBodyColour = {
    hovered: {
      backgroundColor: clientTheme.palette.primary.main,
    },
    unhovered: {
      backgroundColor: clientTheme.palette.white.main,
    },
  }

  const cardBody = {
    hovered: {
      display: 'flex',
      flexBasis: '75%',
      transition: {
        type: "spring",
        bounce: 0
      }
    },
    unhovered: {
      display: 'flex',
      flexBasis: '50%',
    },
  }

  return (
    <Link to={`/blog/${to}`} style={{ textDecoration: 'none' }}>
      <Card elevation={0} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', maxHeight: { xs: 'auto', md: 578 } }} square onMouseEnter={e => setHovered(true)} onMouseLeave={e => setHovered(false)}>
      <Box  
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
                {categories && (
                  <Typography
                    variant="overline"
                    component="h3"
                    color={contrastColour(tileColor).textColour}
                  >
                    {categories}
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
                {title && (
                  <Typography
                    variant="h1"
                    color={contrastColour(tileColor).textColour}
                    sx={{
                      wordBreak: 'break-word'
                    }}
                  >
                    {title}
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
                {date && (
                  <Typography
                    variant="h6"
                    component="p"
                    color={contrastColour(tileColor).textColour}
                    sx={{
                      fontStyle: 'italic',
                      fontWeight: '400'
                    }}
                  >
                    {date}
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
      </Box>

      </Card>
    </Link>

  )

}

export const query = graphql`
  fragment PostFragment on SanityPostsGrid {
    _key
    _type
    posts {
      coverImage {
        asset {
          gatsbyImageData(width: 525, height: 323)
          altText
        }
      }
      title
      date(formatString: "M MMM YYYY")
      categories {
        name
      }
      slug {
        current
      }
  
    }
  }
`