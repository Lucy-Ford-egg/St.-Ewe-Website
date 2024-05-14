import React, { useState } from "react"
import { graphql, Link } from "gatsby"
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
import { RenderPortableText } from "./renderPortableText"

export const CaseStudyTile = (props) => {

  const {
    title,
    _rawPerson,
    person,
    excerpt,
    service,
    i,
    slug,
    coverImage,
    disableSummary
  } = props

  
    
  const [hovered, setHovered] = useState(false)
  const theme = useTheme()

  
  const definedPerson = (_rawPerson && _rawPerson) || person && person
  const definedService = (service && service.name) || service && service.name

  const backgroundColor = i % 2 ? "secondary" : "primary"

  return (
    <Link to={`/case-studies/${slug.current}`} style={{ display: "block", width: "inherit", textDecoration: "none" }} state={{ backgroundColor: backgroundColor }}>
      <Card
        elevation={0}
        sx={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          maxHeight: { xs: !disableSummary && "auto", md: !disableSummary && 578 },
        }}
        square
        onMouseEnter={e => setHovered(true)}
        onMouseLeave={e => setHovered(false)}
      >
        <Grid container sx={{display: 'flex', flexDirection: {xs: 'row', md: i % 2 ? 'row-reverse' : 'row'}}}>
          <Grid item xs={12} sm={disableSummary ? 12 : 7}>
            <Box sx={{ 
              display: {xs:"grid", sm: "flex", md: "grid"}, 
              flexDirection: {sm: "column", md: "unset"}, 
              gridTemplateColumns: "repeat(12, 1fr)", 
              alignItems: 'flex-end', 
              minHeight: {xs: disableSummary ? 'unset' : '100%', md: disableSummary ? 600 : '100%'},
              gridTemplateRows: {xs: "1.75fr 1fr", md: "1.75fr 1fr 0.2fr"},
              }}>
              {coverImage && (
                <Box sx={{
                  display: "flex",
                  gridColumn: "1/25",
                  gridRow:  {xs: "1/2", md: "1/4"},
                  height: "100%",
                }}>
                <Image
                  // pass asset, hotspot, and crop fields
                  crop={coverImage?.crop}
                  hotspot={coverImage?.hotspot}
                  asset={(coverImage?._ref &&
                      urlFor(coverImage).width(700).url()) ||
                    coverImage?.asset
                  }
                  width={disableSummary ? 1024 : 700}
                  height={disableSummary ? 583 : false}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: disableSummary ? "100%" : "100%",
                    flexGrow: 1,
                    minHeight: disableSummary ? "100%" : "100%",
                   
                  }}
                />
                </Box>
              )}
              <Box sx={{ display: "flex", flexBasis: "100%", width: "100%", flexGrow: 1, gridColumn: {xs: "1/25", md: "2/24"}, gridRow: {xs: "2/auto", md: "2/3"}, pb: {xs:0, md: disableSummary ? 12 : 0} }}>
                <Grid container sx={{display: "flex", flexBasis: "100%"}}>
                  <Grid item xs={6} md={3} sx={{display: 'flex'}}>
                    <Box
                      sx={{
                        backgroundColor: i % 2 ? "secondary.main" :"primary.main",
                        px: {xs: 2, md: 6},
                        py: {xs: 6, md: 6},
                        display: "flex",
                        flexBasis: '100%',
                        flexGrow: 1,
                        alignItems: "flex-end",
                        maxWidth: "100%",
                      }}
                    ><Typography
                    variant="h1"
                    component="h3"
                    color="white.main"
                    sx={{ fontSize: !disableSummary && {xs:theme.spacing(17), md: theme.spacing(6)} }}
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
                            px: {xs: 2, md: 6},
                            py: {xs: 6, md: 6},
                            display: "flex",
                            flexGrow: 1,
                            alignItems: "flex-end",
                            maxWidth: "100%",
                          }}
                        >
                         {definedPerson && <Box sx={{color: 'white.main'}}><RenderPortableText setAsHeading='h5' value={definedPerson} /></Box> }
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: i % 2 ? "secondary.mid" : "primary.mid",
                            px: {xs: 2, md: 6},
                            py: {xs: 6, md: 6},
                            display: "flex",
                            flexGrow: 1,
                            alignItems: "flex-end",
                            maxWidth: "100%",
                          }}
                        >
                          <Typography
                            variant="overline"
                            component="h3"
                            color="white.main"
                          >
                            {definedService && definedService}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {!disableSummary && <Grid item xs={12} sm={5} sx={{ display: "flex" }}>
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
                maxWidth: "100%",
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
                  state={{ backgroundColor: backgroundColor }}
                >
                  Read More
                </Button>
              </CardActions>
            </Box>
          </Grid>
          }
        </Grid>
      </Card>
    </Link>
  )
}

export const query = graphql`
  fragment CaseStudyTileFragment on SanityCaseStudy {
    coverImage {
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
