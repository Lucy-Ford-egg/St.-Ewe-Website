import React, { useState, useEffect, useCallback } from "react"
import { graphql } from "gatsby"
import {BlogTile} from "./blogTile"
import { useTheme, Box, Typography } from "@mui/material"
import { Button, GatsbyLink } from "gatsby-theme-material-ui"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Filter } from "./filter"
import { ModuleContainer } from "./moduleContainer"
//Preview
import { useQuery } from "../../sanity/store"
import { POSTS_BY_ID } from "../queries/documentQueries"

import { styled } from '@mui/material/styles'


const Wrapper = styled('div')(({ props, theme }) => ({
  gridColumn: '1/25',
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  overflow: 'hidden',
  [theme.breakpoints.up('lg')]: {

  },
}));


const BlogFilter = styled('div')(({ props }) => ({
  display: 'grid',
  gridColumn: '2/24',
}));

const BlogAllPostLink = styled('div')(({ props }) => ({
  display: 'grid',
  gridColumn: '2/24',
}));



const BlogGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridColumn: '2/24',
  gridGap: 21,
  gridTemplateColumns: 'subgrid',
  [theme.breakpoints.up('sm')]: {
    gridGap: 21,
  },
  [theme.breakpoints.up('lg')]: {
    gridColumn: '1/25',
    paddingLeft: 'var(--modular-scale-ms4)',
    paddingRight: 'var(--modular-scale-ms4)',
  }
}));

export const BlogSection = props => {
  const {
    allSanityPost,
    previewData,
    backgroundColour,
    pageContext,
    initial,
    _type,
  } = props

  const theme = useTheme()

  const [filtersPosts, setFilterData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [chunkIndex, setChunkIndex] = useState(0);

  function findArrayIndexContainingPage(nestedArray, pageNumber) {
    for (let i = 0; i < nestedArray.length; i++) {
      if (nestedArray[i].includes(pageNumber)) {
        return i; // Return the index of the sub-array
      }
    }
    return -1; // Return -1 if the page number is not found in any sub-array
  }

  function removeFirstAndLast(array) {
    if (array.length >= 2) {
      array.shift();
      array.pop();
    }
    return array;
  }

  const pages = Array.from(
    { length: pageContext.numberOfPages },
    (_, index) => index + 1
  );

  const chunkArray = useCallback((array, chunkSize) => {
    let chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      let chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }, []);

  useEffect(() => {
    if (pages.length > 0) {
      setPagination(chunkArray(removeFirstAndLast(pages), 5));
    }
  }, [chunkArray, pages]);

  let humanPageNumber = props.pageContext.humanPageNumber === 1
    ? 2
    : props.pageContext.humanPageNumber === pageContext.numberOfPages
      ? pageContext.numberOfPages - 1
      : props.pageContext.humanPageNumber;

  useEffect(() => {
    if (pagination) {
      setChunkIndex(findArrayIndexContainingPage(pagination, humanPageNumber));
    }
  }, [pagination, humanPageNumber]);




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

  const definedBackgroundColour =
    (previewData &&
      _type === previewData?._type &&
      previewData?.backgroundColour) ||
    backgroundColour

  // const definedAllSanityPost =
  //   (postData && postData?.length > 0 && postData) ||
  //   (previewData?.showArchive?.setArchive === true &&
  //     getAllPosts?.nodes
  //   ) || allSanityPost?.nodes 

    const definedAllSanityPost =
    //(postData && postData?.length > 0 && postData) || 
    allSanityPost?.nodes 
    

  useEffect(() => {
    setFilterData(definedAllSanityPost)
  }, [definedAllSanityPost, setFilterData])

  return (
    <ModuleContainer {...props}>

      <Wrapper theme={theme} backgroundColour={definedBackgroundColour}>


        <BlogFilter>
          <Filter
            className="component-filter"
            type="posts"
            // allData={getAllPosts.nodes}
            filtersData={filtersPosts}
            setFilterData={setFilterData}
            pageContext={pageContext}
          />
        </BlogFilter>

        <BlogGrid theme={theme}>
          {!props.pageContext.humanPageNumber && filtersPosts &&
            filtersPosts.slice(0, 8).map((post, i) => {
              return (
                <BlogTile post={post}  previewData={previewData}/>
              )
            })}
        </BlogGrid>


        {!props.pageContext.humanPageNumber && (
          <BlogAllPostLink>
            <Button variant="contained" color="primary" to="/blog">See All Posts</Button>
          </BlogAllPostLink>
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
                sx={{
                  fontSize: "1rem !important",
                }}
              >
                Previous
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
                {pagination && pagination[chunkIndex] && pagination[chunkIndex].map(node => {

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
                sx={{
                  fontSize: "1rem !important",
                }}
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
                Next
              </Button>
            </Box>
          </Box>
        )}
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment BlogSectionFragment on SanityBlogSection {
    _key
    _type
    _rawTitle(resolveReferences: { maxDepth: 10 })
    _rawRightText(resolveReferences: { maxDepth: 10 })
    subtitle
    showArchive {
      setArchive
      archive {
        _id
        name
      }
    }
    backgroundColour {
      label
      value
    }
    verticalSpace {
      bottomPadding
      topPadding
    }
  }
`
