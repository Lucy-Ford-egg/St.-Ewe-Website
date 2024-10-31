import React, { useState, useEffect, useCallback } from "react"
import { graphql } from "gatsby"
import { BlogTile } from "./blogTile"
import { useTheme } from "@mui/material"
import { Button, GatsbyLink } from "gatsby-theme-material-ui"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Filter } from "./filter"
import { ModuleContainer } from "./moduleContainer"
import { contrastBrandPalette } from "../utils/colours"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(({ props, theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridTemplateColumns: "subgrid",
  overflow: "hidden",
  [theme.breakpoints.up("lg")]: {},
}))

const BlogFilter = styled("div")(({ props }) => ({
  display: "grid",
  gridColumn: "2/25",
}))

const BlogAllPostLink = styled("div")(({ props }) => ({
  display: "grid",
  gridColumn: "2/24",
  justifyContent: "center",
  paddingTop: "var(--ms6)",
}))

const BlogGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridColumn: "2/24",
  gridGap: 21,
  gridTemplateColumns: "subgrid",
  [theme.breakpoints.up("sm")]: {
    gridGap: 21,
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: "1/25",
    paddingLeft: "var(--ms4)",
    paddingRight: "var(--ms4)",
  },
}))

const PageNavigation = styled("div")(({ theme, backgroundColour }) => ({
  display: "flex",
  gridColumn: "2/24",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "var(--ms2)",
  paddingTop: "var(--ms4)",
  paddingBottom: "var(--ms4)",
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  [theme.breakpoints.up("lg")]: {
    gridColumn: "1/25",
    paddingLeft: "var(--ms4)",
    paddingRight: "var(--ms4)",
  },
}))

const PaginationArrows = styled(Button)(({ theme, backgroundColour }) => ({
  "&.MuiButtonBase-root": {
    fontSize: "var(--ms0) !important",
    fontFamily: "var(--font-primary) !important",
    padding: "0 !important",
    color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  },
  [theme.breakpoints.up("lg")]: {},
}))

const Numbers = styled("div")(({ theme, backgroundColour }) => ({
  fontSize: "var(--ms0)",
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  [theme.breakpoints.up("lg")]: {},
}))

const Number = styled("div")(({ theme, backgroundColour }) => ({
  fontSize: "var(--ms0)",
  fontFamily: "var(--font-primary)",
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  [theme.breakpoints.up("lg")]: {},
}))

export const BlogSection = props => {
  const { allSanityPost, previewData, backgroundColour, pageContext } = props

  const theme = useTheme()

  const [filtersPosts, setFilterData] = useState(null)
  const [pagination, setPagination] = useState(null)
  const [chunkIndex, setChunkIndex] = useState(0)

  function findArrayIndexContainingPage(nestedArray, pageNumber) {
    for (let i = 0; i < nestedArray.length; i++) {
      if (nestedArray[i].includes(pageNumber)) {
        return i // Return the index of the sub-array
      }
    }
    return -1 // Return -1 if the page number is not found in any sub-array
  }

  function removeFirstAndLast(array) {
    if (array.length >= 2) {
      array.shift()
      array.pop()
    }
    return array
  }

  const pages = Array.from(
    { length: pageContext.numberOfPages },
    (_, index) => index + 1,
  )

  const chunkArray = useCallback((array, chunkSize) => {
    let chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      let chunk = array.slice(i, i + chunkSize)
      chunks.push(chunk)
    }
    return chunks
  }, [])

  useEffect(() => {
    if (pages.length > 0) {
      setPagination(chunkArray(removeFirstAndLast(pages), 5))
    }
  }, [chunkArray, pages])

  let humanPageNumber =
    props.pageContext.humanPageNumber === 1
      ? 2
      : props.pageContext.humanPageNumber === pageContext.numberOfPages
        ? pageContext.numberOfPages - 1
        : props.pageContext.humanPageNumber

  useEffect(() => {
    if (pagination) {
      setChunkIndex(findArrayIndexContainingPage(pagination, humanPageNumber))
    }
  }, [pagination, humanPageNumber])

  // const { data: postData } = useQuery(
  //   POSTS_BY_ID,
  //   {
  //     categoryId:
  //       (previewData &&
  //         previewData?.showArchive?.archive &&
  //         previewData?.showArchive?.archive.map(node => node?._id)) ||
  //       [],
  //   },
  //   { initial },
  // )

  useEffect(() => {
    setFilterData(allSanityPost?.nodes)
  }, [allSanityPost?.nodes, setFilterData])

  return (
    <ModuleContainer {...props}>
      <Wrapper theme={theme} backgroundColour={backgroundColour}>
        <BlogFilter>
          <Filter
            backgroundColour={backgroundColour}
            className="component-filter"
            type="posts"
            // allData={getAllPosts.nodes}
            filtersData={filtersPosts}
            setFilterData={setFilterData}
            pageContext={pageContext}
          />
        </BlogFilter>

        <BlogGrid theme={theme}>
          {filtersPosts &&
            filtersPosts.slice(0, 8).map((post, i) => {
              return <BlogTile post={post} previewData={previewData} />
            })}
        </BlogGrid>

        {!props.pageContext.humanPageNumber && (
          <BlogAllPostLink>
            <Button variant="contained" color="primary" to="/news">
              See All Posts
            </Button>
          </BlogAllPostLink>
        )}

        {props.pageContext.humanPageNumber && (
          <PageNavigation theme={theme} backgroundColour={backgroundColour}>
            <PaginationArrows
              backgroundColour={backgroundColour}
              variant="text"
              startIcon={
                <ChevronLeftIcon
                  color={
                    contrastBrandPalette[backgroundColour?.label]?.contrastText
                  }
                  sx={{
                    opacity: props.pageContext.humanPageNumber === 1 && 0.2,
                  }}
                />
              }
              to={props.pageContext.previousPagePath}
              disabled={props.pageContext.humanPageNumber === 1 && true}
            >
              Previous
            </PaginationArrows>

            <Numbers backgroundColour={backgroundColour}>
              <Number
                backgroundColour={backgroundColour}
                style={{
                  color:
                    1 === props.pageContext.humanPageNumber
                      ? "primary.main"
                      : "inherit",
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <GatsbyLink
                  sx={{
                    color: "inherit",
                  }}
                  to={`/news/`}
                >
                  {1}
                </GatsbyLink>
              </Number>
              {chunkIndex > 0 && "..."}
              {pagination &&
                pagination[chunkIndex] &&
                pagination[chunkIndex].map(node => {
                  return (
                    <Number
                      backgroundColour={backgroundColour}
                      style={{
                        color:
                          props.pageContext.numberOfPages ===
                          props.pageContext.humanPageNumber
                            ? "primary.main"
                            : "inherit",
                        "&:hover": {
                          cursor: "pointer",
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      <GatsbyLink
                        sx={{
                          color: "inherit",
                        }}
                        to={`/news/${node === 1 ? "" : node}`}
                      >
                        {node}
                      </GatsbyLink>
                    </Number>
                  )
                })}
            </Numbers>

            <PaginationArrows
              backgroundColour={backgroundColour}
              variant="text"
              endIcon={
                <ChevronRightIcon
                  color={
                    contrastBrandPalette[backgroundColour?.label]?.contrastText
                  }
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
            </PaginationArrows>
          </PageNavigation>
        )}
      </Wrapper>
    </ModuleContainer>
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
