import React from 'react'
import { graphql, Link } from "gatsby"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { contrastColour } from "../utils/contrastColour"

export const PostTile = ({ categories, title, tileImage, date, to }) => {

  return (
    <Link to={`/blog/${to}`} style={{ textDecoration: 'none', display: "flex !important" }}>
      <Card elevation={0} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', maxHeight: { xs: 'auto', md: 578 }, flexBasis: "100%", height: "100%" }} square>
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