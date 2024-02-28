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
import { Button, GatsbyLink } from "gatsby-theme-material-ui"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { contrastColour } from "../utils/contrastColour"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import {formattedDate } from "../utils/formattedDate"

//Preview
import { useQuery } from "../../sanity/store"
import {  POSTS_BY_ID, ALL_POSTS } from "../queries/documentQueries"

export const BlogSection = props => {
  const {
    allSanityPost,
    previewData,
    sanityConfig,
    topPadding,
    pageContext,
    showArchive,
    initial,
  } = props

  const theme = useTheme()

  const pages = Array.from(
    { length: pageContext.numberOfPages },
    (_, index) => index + 1,
  )

  const { data: allPostData } = useQuery(
    ALL_POSTS,
    {},
    { initial },
  )

  const { data: postData } = useQuery(
    POSTS_BY_ID,
    { categoryId: previewData && previewData?.showArchive?.archive && previewData?.showArchive?.archive.map((node) => node?._id ) || []},
    { initial },
  )

  const definedTopPadding =
    (previewData && previewData?.topPadding) || topPadding
  const definedAllSanityPost = (postData && postData.length > 0 && postData) || (previewData?.showArchive?.setArchive === true && allPostData && allPostData) || allSanityPost.nodes

  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: { 
          xs: theme.spacing(10), 
          md: theme.spacing(10) 
        },
        pt: definedTopPadding
          ? {
              xs: theme.spacing(10),
              md: theme.spacing(0),
            }
          : { 
            xs: theme.spacing(10), 
            md: theme.spacing(10) 
          },
      }}
    >
      <Grid container columnSpacing={6} rowSpacing={12}>
        {definedAllSanityPost &&
          definedAllSanityPost &&
          definedAllSanityPost.map((post, i) => {

            const { 
              coverImage: image, 
              category, 
              author, 
              title, 
              tileColor, 
              date, 
              slug } = post
            
            return (
              <Grid item xs={12} sm={6} md={3} sx={{
                "&:hover":{
                 "& .wrapper":{
                  transition: 'all 0.2s ease-in-out 0s',
                  transform: 'scale(1.01)',
                  boxShadow: '0 0 10px 1px rgba(0,0,0,0.2)', 
                }}}}>
                <GatsbyLink style={{textDecoration: 'none', color: 'inherit' }} to={slug.current}>
                <Paper
                className="wrapper"
                  elevation={0}
                  square
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(24, 1fr)",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minHeight: "310px",
                      maxHeight: { xs: "", md: "310px" },
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

                        pt: { xs: 0, md: 0 },
                        alignSelf: { xs: "end", md: "end" },
                      }}
                    >
                      <Grid container sx={{ height: "100%" }}>
                        <Grid item xs={12} md={12}>
                          <Box
                            sx={{
                              pt: 13,
                              pb: { xs: 6, md: 6 },
                              px: { xs: 4, md: 4 },
                            }}
                          >
                            {category && (
                              <Typography
                                variant="overline"
                                component="h3"
                                color={contrastColour(tileColor).textColour}
                              >
                                {category.name}
                              </Typography>
                            )}

                            <Divider
                              sx={{
                                display: "flex",
                                my: 3,
                                width: "100%",
                                borderColor:
                                  contrastColour(tileColor).divider.hex,
                              }}
                            />
                            {title && (
                              <Typography
                                variant="h4"
                                color={contrastColour(tileColor).textColour}
                                sx={{
                                  wordBreak: "break-word",
                                }}
                              >
                                {title}
                              </Typography>
                            )}
                            <Divider
                              sx={{
                                display: "flex",
                                my: 3,
                                width: "100%",
                                borderColor:
                                  contrastColour(tileColor).divider.hex,
                              }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                              }}
                            >
                              {date && (
                                <Typography
                                  variant="h6"
                                  component="p"
                                  color={contrastColour(tileColor).textColour}
                                  sx={{
                                    fontStyle: "italic",
                                    fontWeight: "400",
                                    fontSize: theme.spacing(2)
                                  }}
                                >
                                  {formattedDate(date)}
                                </Typography>
                              )}
                              <Box
                                sx={{
                                  display: "inline-flex",
                                  color: contrastColour(tileColor).textColour,
                                  ml: "5px",
                                  lineHeight: 1,
                                }}
                              >{` | `}</Box>
                              {author && (
                                <Typography
                                  variant="h6"
                                  component="p"
                                  color={contrastColour(tileColor).textColour}
                                  sx={{
                                    fontStyle: "italic",
                                    fontWeight: "400",
                                    fontSize: theme.spacing(2)
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "inline-flex",
                                      color:
                                        contrastColour(tileColor).textColour,
                                      ml: "5px",
                                    }}
                                  >{` By `}</Box>{" "}
                                  {author.name}
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
                        position: "relative",
                        zIndex: 0,
                        overflow: "hidden",
                      }}
                    >
                      {image && (
                        <Image
                          // pass asset, hotspot, and crop fields
                          crop={image?.crop}
                          hotspot={image?.hotspot}
                          asset={(image &&
                              image?._ref &&
                              urlFor(image).width(600).url()) ||
                            image.asset
                          }
                          width={310}
                          height={310}
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
                       {image && <Box
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
                  </Box>
                </Paper>
                </GatsbyLink>
              </Grid>
            )
          })}
      </Grid>

      {props.pageContext.humanPageNumber && 
      <Box
        sx={{
          pt: 12,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 6,
          }}
        >
          {/* previousPageLink and nextPageLink were added by the plugin */}

          <Button
            variant="text"
            color="tertiary"
            startIcon={
              <ChevronLeftIcon
                color="primary"
                sx={{
                  opacity: props.pageContext.humanPageNumber === 1 && 0.2,
                }}
              />
            }
            to={props.pageContext.previousPagePath}
            disabled={props.pageContext.humanPageNumber === 1 && true}
          >
            Recent Posts
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 3,
            }}
          >
            {pages.map(node => {
              return (
                <Typography
                  sx={{
                    color:
                      node === props.pageContext.humanPageNumber
                        ? "primary.main"
                        : "inherit",
                  }}
                >
                  {node}
                </Typography>
              )
            })}
          </Box>

          <Button
            variant="text"
            color="tertiary"
            endIcon={
              <ChevronRightIcon
                color="primary"
                sx={{
                  opacity:
                    props.pageContext.humanPageNumber ===
                      props.pageContext.numberOfPages && 0.2,
                }}
              />
            }
            to={props.pageContext.nextPagePath}
            disabled={
              props.pageContext.humanPageNumber ===
                props.pageContext.numberOfPages && true
            }
          >
            Older Posts
          </Button>
        </Box>
      </Box>
}
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
