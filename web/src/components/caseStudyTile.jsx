import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { motion } from "framer-motion"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import {
  Card,
  CardActions,
  CardContent,
  Box,
  Button,
  Typography,
  Grid,
  Divider,
  useTheme,
} from "@mui/material"
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme"
import { RenderPortableText } from "./renderPortableText"

export const CaseStudyTile = ({
  title,
  _rawPerson,
  image,
  excerpt,
  date,
  to,
  previewData,
  service,
  i,
  slug,
}) => {
  const [hovered, setHovered] = useState(false)
  const theme = useTheme()

  const variants = {
    hovered: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        type: "spring",
        bounce: 0,
      },
    },
    unhovered: {
      opacity: 0,
      y: -10,
      height: 0,
    },
  }

  const textColour = {
    hovered: {
      color: clientTheme.palette.white.main,
    },
    unhovered: {
      color: clientTheme.palette.text.main,
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
      display: "flex",
      flexBasis: "75%",
      transition: {
        type: "spring",
        bounce: 0,
      },
    },
    unhovered: {
      display: "flex",
      flexBasis: "50%",
    },
  }

debugger
  return (
    <Link to={`/case-studies/${slug.current}`} style={{ textDecoration: "none" }}>
      <Card
        elevation={0}
        sx={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          maxHeight: { xs: "auto", md: 578 },
        }}
        square
        onMouseEnter={e => setHovered(true)}
        onMouseLeave={e => setHovered(false)}
      >
        <Grid container sx={{display: 'flex', flexDirection: {xs: 'row', md: i % 2 ? 'row-reverse' : 'row'}}}>
          <Grid item xs={12} md={7}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", alignItems: 'flex-end', minHeight: '100%' }}>
              {image && (
                <Image
                  // pass asset, hotspot, and crop fields
                  crop={
                    (previewData && previewData?.image?.crop) || image?.crop
                  }
                  hotspot={
                    (previewData && previewData?.image?.hotspot) ||
                    image?.hotspot
                  }
                  asset={
                    (previewData &&
                      previewData.image &&
                      previewData.image?._ref &&
                      urlFor(previewData.image).width(200).url()) ||
                    image.asset
                  }
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
              <Box sx={{ flexGrow: 1, gridColumn: {xs: "1/25", md: "2/24"}, gridRow: {xs: "2/auto", md: "1/auto"}, pb: {xs:0, md: 12} }}>
                <Grid container>
                  <Grid item xs={6} md={3} sx={{display: 'flex'}}>
                    <Box
                      sx={{
                        backgroundColor: i % 2 ? "secondary.main" :"primary.main",
                        px: 6,
                        py: 6,
                        display: "flex",
                        flexBasis: '100%',
                        flexGrow: 1,
                        alignItems: "flex-end",
                      }}
                    ><Typography
                    variant="h1"
                    component="h3"
                    color="white.main"
                    sx={{ fontSize: {xs:theme.spacing(17), md: theme.spacing(6)} }}
                  >
                    {String(i+ 1).padStart(2, '0')}
                  </Typography>
                       
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Box sx={{ height: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          flexGrow: 1,
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: i % 2 ? "secondary.light" : "primary.light",
                            px: 6,
                            py: 6,
                            display: "flex",
                            flexGrow: 1,
                            alignItems: "flex-end",
                          }}
                        >
                         {_rawPerson && <Box sx={{color: 'white.main'}}><RenderPortableText setAsHeading='h5' value={_rawPerson} /></Box> }
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: i % 2 ? "secondary.mid" : "primary.mid",
                            px: 6,
                            py: 6,
                            display: "flex",
                            flexGrow: 1,
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            variant="overline"
                            component="h3"
                            color="white.main"
                          >
                            {service && service.name}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: "flex" }}>
            <Box
              sx={{
                px: {xs: 6, md: 13},
                py: {xs: 12, md: 13},
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexBasis: "100%",
                flexGrow: 1,
                backgroundColor: i % 2 ? "secondary.main" : "primary.main",
              }}
            >
              <Typography variant="h3" color="white.main">
                {title}
              </Typography>
              <Divider
                sx={{
                  display: "flex",
                  my: 10,
                  width: "19.1875rem",
                  borderColor: "white.main",
                }}
              />
              <Typography variant="body1" color="white.main">
                {excerpt}
              </Typography>
              <CardActions sx={{ py: 10, pb: 0 }}>
                <Button
                  variant="contained"
                  color={i % 2 ? "primary" : "secondary"}
                  to={`/case-studies/${slug.current}`}
                  component={Link}
                  size="small"
                  sx={{
                    transition: "all 0.2s ease-in 0s",
                    textAlign: "center",
                  }}
                >
                  Read More
                </Button>
              </CardActions>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Link>
  )
}

export const query = graphql`
  fragment CaseStudyTileFragment on SanityCaseStudy {
    image: coverImage {
      asset {
        _id
        gatsbyImageData
        _key
        _type
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
    _rawPerson(resolveReferences: {maxDepth: 10})
    service {
      name
    }
    slug {
      current
    }
    excerpt
    _rawBody(resolveReferences: { maxDepth: 10 })
  }
`
