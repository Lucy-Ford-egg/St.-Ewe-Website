import React, { useState, useEffect } from "react"
import { graphql} from "gatsby"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Divider from "@mui/material/Divider"
import { useTheme } from "@mui/material"
import { Button, GatsbyLink } from "gatsby-theme-material-ui"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { contrastColour } from "../utils/contrastColour"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { formattedDate } from "../utils/formattedDate"
import { Filter } from "./filter"
import { RenderPortableText } from "./renderPortableText"

//Preview
import { useQuery } from "../../sanity/store"
import { POSTS_BY_ID } from "../queries/documentQueries"

export const BlogSection = props => {
  const {
    allSanityPost,
    previewData,
    topPadding,
    pageContext,
    getAllPosts,
    initial,
    _type,
    subtitle,
    title,
    _rawTitle,
    _rawLeftText,
    _rawRightText,
    leftText,
    rightText,
  } = props

  const theme = useTheme()

  const [filtersPosts, setFilterData] = useState(null)

  const [pagination, setPagination ] = useState(null)

  const [chunkIndex, setChunkIndex] = useState(0)

  function findArrayIndexContainingPage(nestedArray, pageNumber) {
    for (let i = 0; i < nestedArray.length; i++) {
      if (nestedArray[i].includes(pageNumber)) {
        return i; // Return the index of the sub-array
      }
    }
    return -1; // Return -1 if the page number is not found in any sub-array
  }

  function removeFirstAndLast(array) {
    // Check if the array has at least two elements
    if (array.length >= 2) {
      // Remove the first element
      array.shift();
      // Remove the last element
      array.pop();
    }
    // Return the modified array
    return array;
  }

  const pages = Array.from(
    { length: pageContext.numberOfPages },
    (_, index) => {
      return (
        index + 1
      )
        
    },
  )

  function chunkArray(array, chunkSize) {
    // Create an empty array to hold the chunks
    let chunks = [];
    

    // Loop through the array, incrementing by chunkSize each time
    for (let i = 0; i < array.length; i += chunkSize) {
      // Slice the array from the current index i to i + chunkSize
      let chunk = array.slice(i, i + chunkSize);
      // Add the sliced chunk to the chunks array
      chunks.push(chunk);
    }
    
    // Return the array of chunks
    return chunks;
  }

  useEffect(() => {
    
    pages && setPagination(chunkArray(removeFirstAndLast(pages), 5))
  }, [setPagination, chunkArray, pages, removeFirstAndLast])

  let humanPageNumber = props.pageContext.humanPageNumber === 1 ? 2 : props.pageContext.humanPageNumber === pageContext.numberOfPages ? pageContext.numberOfPages - 1 : props.pageContext.humanPageNumber
  
  useEffect(() => {  

     // === 0 ? 2 : props.pageContext.humanPageNumber

    pagination && setChunkIndex(findArrayIndexContainingPage(pagination, humanPageNumber))
  }, [ setChunkIndex, pagination, findArrayIndexContainingPage, humanPageNumber])

  

  const { data: postData } = useQuery(
    POSTS_BY_ID,
    {
      categoryId:
        (previewData &&
          previewData?.showArchive?.archive &&
          previewData?.showArchive?.archive.map(node => node?._id)) ||
        [],
    },
    { initial },
  )

  const definedTopPadding =
    (previewData && _type === previewData?._type && previewData?.topPadding) ||
    topPadding

  const definedSubtitle =
    (previewData && _type === previewData?._type && previewData?.subtitle) ||
    subtitle
  const definedTitle =
    (previewData && _type === previewData?._type && previewData?.title) ||
    title ||
    _rawTitle

  const definedLeftText =
    (previewData && _type === previewData?._type && previewData?.leftText) ||
    leftText ||
    _rawLeftText
  const definedRightText =
    (previewData && _type === previewData?._type && previewData?.rightText) ||
    rightText ||
    _rawRightText

  const definedAllSanityPost =
    (postData && postData?.length > 0 && postData) ||
    (previewData?.showArchive?.setArchive === true &&
      getAllPosts?.nodes
    ) ||
    allSanityPost?.nodes

  useEffect(() => {
    setFilterData(definedAllSanityPost)
  }, [definedAllSanityPost, setFilterData])

  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: {
          xs: theme.spacing(10),
          md: theme.spacing(10),
        },
        pt: definedTopPadding
          ? {
              xs: theme.spacing(10),
              md: theme.spacing(0),
            }
          : {
              xs: theme.spacing(10),
              md: theme.spacing(10),
            },
      }}
    >
      {definedTitle && (
        <Grid container sx={{ pb: 15 }} rowSpacing={6} columnSpacing={16}>
          <Grid item xs={12} md={7}>
            {definedSubtitle && (
              <Typography color="primary" variant="overline">
                {definedSubtitle}
              </Typography>
            )}

            {definedTitle && (
              <RenderPortableText
                previewData={definedTitle}
                setAsHeading={false}
                value={definedTitle}
              />
            )}
            {definedLeftText && (
              <Divider
                sx={{
                  borderColor: "primary.main",
                  mb: 5,
                  maxWidth: 307,
                }}
              />
            )}
            {definedLeftText && (
              <RenderPortableText
                previewData={definedLeftText}
                variant={false}
                value={definedLeftText}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5} sx={{ alignSelf: "flex-end" }}>
            {definedRightText && (
              <RenderPortableText
                previewData={definedRightText}
                variant={false}
                value={definedRightText}
              />
            )}
          </Grid>
        </Grid>
      )}
      
        <Filter
          className="component-filter"
          type="posts"
          allData={getAllPosts.nodes}
          filtersData={filtersPosts}
          setFilterData={setFilterData}
          pageContext={ pageContext}
        />


      <Grid container columnSpacing={6} rowSpacing={12}>
        {!props.pageContext.humanPageNumber && filtersPosts &&
          filtersPosts.slice(0, 8).map((post, i) => {
            const {
              tileImage,
              category,
              author,
              title,
              tileColor,
              date,
              slug,
            } = post

            return (
              <Grid
              key={title}
                item
                xs={12}
                sm={6}
                md={3}
                sx={{
                  "&:hover": {
                    "& .wrapper": {
                      transition: "all 0.2s ease-in-out 0s",
                      transform: "scale(1.01)",
                      boxShadow: "0 0 10px 1px rgba(0,0,0,0.2)",
                    },
                  },
                }}
              >
                <GatsbyLink
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    height: "100%",
                    flexBasis: "100%",
                  }}
                  to={`/blog/${post?.category?.slug?.current}/${slug.current}`}
                >
                  <Paper
                    className="wrapper"
                    elevation={0}
                    square
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      flexBasis: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(24, 1fr)",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        minHeight: {
                          xs: `calc(100vw - ${theme.spacing(8)})`,
                          sm: `310px`,
                          md: "310px",
                        },
                        maxHeight: {
                          xs: `calc(100vw - ${theme.spacing(8)})`,
                          md: "310px",
                        },
                        overflow: "hidden",
                        px: "0 !important",
                        backgroundColor: tileColor?.value,
                        flexBasis: "100%",
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
                                px: { xs: 0, lg: 4 },
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
                                      fontSize: theme.spacing(2),
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
                                      fontSize: theme.spacing(2),
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
                        {tileImage && (
                          <Image
                            // pass asset, hotspot, and crop fields
                            crop={tileImage?.crop}
                            hotspot={tileImage?.hotspot}
                            asset={
                              (tileImage &&
                                tileImage?._ref &&
                                urlFor(tileImage).width(600).url()) ||
                              tileImage.asset
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
                        {tileImage && (
                          <Box
                            sx={{
                              position: "relative",
                              zIndex: 1,
                              gridColumn: "1/25",
                              gridRow: "1/auto",
                              width: "100%",
                              height: "100%",
                              backgroundColor: "rgba(0,0,0,0.5)",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Paper>
                </GatsbyLink>
              </Grid>
            )
          })}

{props.pageContext.humanPageNumber && filtersPosts &&
          filtersPosts.map((post, i) => {
            const {
              tileImage,
              category,
              author,
              title,
              tileColor,
              date,
              slug,
            } = post

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{
                  "&:hover": {
                    "& .wrapper": {
                      transition: "all 0.2s ease-in-out 0s",
                      transform: "scale(1.01)",
                      boxShadow: "0 0 10px 1px rgba(0,0,0,0.2)",
                    },
                  },
                }}
              >
                <GatsbyLink
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    height: "100%",
                    flexBasis: "100%",
                  }}
                  to={`/blog/${category?.slug?.current}/${slug.current}`}
                >
                  <Paper
                    className="wrapper"
                    elevation={0}
                    square
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      flexBasis: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(24, 1fr)",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        minHeight: {
                          xs: `calc(100vw - ${theme.spacing(8)})`,
                          sm: `310px`,
                          md: "310px",
                        },
                        maxHeight: {
                          xs: `calc(100vw - ${theme.spacing(8)})`,
                          md: "310px",
                        },
                        overflow: "hidden",
                        px: "0 !important",
                        backgroundColor: tileColor?.value,
                        flexBasis: "100%",
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
                                px: { xs: 0, lg: 4 },
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
                                      fontSize: theme.spacing(2),
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
                                      fontSize: theme.spacing(2),
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
                        {tileImage && (
                          <Image
                            // pass asset, hotspot, and crop fields
                            crop={tileImage?.crop}
                            hotspot={tileImage?.hotspot}
                            asset={
                              (tileImage &&
                                tileImage?._ref &&
                                urlFor(tileImage).width(600).url()) ||
                              tileImage.asset
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
                        {tileImage && (
                          <Box
                            sx={{
                              position: "relative",
                              zIndex: 1,
                              gridColumn: "1/25",
                              gridRow: "1/auto",
                              width: "100%",
                              height: "100%",
                              backgroundColor: "rgba(0,0,0,0.5)",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Paper>
                </GatsbyLink>
              </Grid>
            )
          })}
      </Grid>

      {!props.pageContext.humanPageNumber && (
        <Container maxWidth="lg" sx={{py: {xs: 12, md: 16}}}>
          <Divider
            sx={{
              display: "flex",
              my: 3,
              width: "100%",
             
              "&:before":{
                borderTopColor: "text.mid",
                borderTopStyle: "dashed",
              },
              "&:after":{
                borderTopColor: "text.mid",
                borderTopStyle: "dashed",
              }
            }}
          >
            <Button variant="contained" color="primary" to="/blog">See All Posts</Button>
          </Divider>
        </Container>
      )}

      {props.pageContext.humanPageNumber && (
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
              <Typography
                    sx={{
                      color:
                        1 === props.pageContext.humanPageNumber
                          ? "primary.main"
                          : "inherit",
                        "&:hover": {
                            cursor: "pointer",
                            color: theme.palette.primary.main
                        }
                    }}
                  >
                    <GatsbyLink sx={{
                      color: "inherit"
                    }} to={`/blog/`}>{1}</GatsbyLink>
                  </Typography>
              {chunkIndex > 0 && '...'}
              { pagination && pagination[chunkIndex] && pagination[chunkIndex].map(node => {
                
                return (
                  <Typography
                    sx={{
                      color:
                        node === props.pageContext.humanPageNumber
                          ? "primary.main"
                          : "inherit",
                        "&:hover": {
                            cursor: "pointer",
                            color: theme.palette.primary.main
                        }
                    }}
                  >
                    <GatsbyLink sx={{
                      color: "inherit"
                    }} to={`/blog/${node === 1 ? "" : node}`}>{node}</GatsbyLink>
                  </Typography>
                )
              })}
              {pagination && pagination.length > 0 && '...'}
              <Typography
                    sx={{
                      color:
                        props.pageContext.numberOfPages === props.pageContext.humanPageNumber
                          ? "primary.main"
                          : "inherit",
                        "&:hover": {
                            cursor: "pointer",
                            color: theme.palette.primary.main
                        }
                    }}
                  >
                    <GatsbyLink sx={{
                      color: "inherit"
                    }} to={`/blog/${props.pageContext?.numberOfPages}`}>{props.pageContext?.numberOfPages}</GatsbyLink>
                  </Typography>
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
      )}
    </Container>
  )
}

export const query = graphql`
  fragment BlogSectionFragment on SanityBlogSection {
    _key
    _type
    _rawTitle(resolveReferences: { maxDepth: 10 })
    _rawLeftText(resolveReferences: { maxDepth: 10 })
    _rawRightText(resolveReferences: { maxDepth: 10 })
    subtitle
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
