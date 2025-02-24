import React, { useState, useEffect, useRef } from "react"
import { graphql } from "gatsby"
import { styled } from "@mui/material/"
import { Button, GatsbyLink } from "gatsby-theme-material-ui"
import { Filter } from "./filter"
import { useTheme } from "@mui/material"
import { RecipeTile } from "./recipeTile"
import { useInView } from "framer-motion"
import { ModuleContainer } from "./moduleContainer"
import { contrastBrandPalette } from "../utils/colours"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

const Wrapper = styled("div")(
  ({ backgroundColour, paddingTop, paddingBottom }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(24, 1fr)",
    gridColumn: "1/25",
    backgroundColor: backgroundColour?.value,
    overflowX: "hidden",
  }),
)

const GridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridColumn: "2/24",
  gridTemplateRows: "1fr",

  gridRowGap: 21,
  gridTemplateColumns: "repeat(24, 1fr)",
  "& .gridItem": {
    gridColumn: "1/25",
    [theme.breakpoints.up("sm")]: {
      gridColumn: "span 8",
      "&:first-of-type": {
        gridArea: "1/17/2/25",
        gridRow: "1 / 1",
        height: "100%",
      },
      "&:nth-of-type(2)": {
        gridArea: "1/17/2/25",
        gridRow: "1 / 1",
        height: "100%",
      },
      "&:nth-of-type(3)": {
        gridArea: "1/17/3/25",

        gridRow: "2 / 2",
        height: "100%",
      },
      "&:nth-of-type(4)": {
        gridArea: "1/1/1/9",

        gridRow: "3 / 3",
        height: "100%",
      },
    },
    [theme.breakpoints.up("md")]: {
      gridColumn: "span 6",
      "&:first-of-type": {
        gridArea: "1 / 11 / 2 / 16",

        gridRow: "1 / 1",
        height: "100%",
      },
      "&:nth-of-type(2)": {
        gridArea: "1/13/2/19",

        gridRow: "1 / 1",
        height: "100%",
      },
      "&:nth-of-type(3)": {
        gridArea: "2/13/3/19",

        gridRow: "2 / 2",
        height: "100%",
      },
      "&:nth-of-type(4)": {
        gridArea: "2/19/3/25",

        gridRow: "2 / 2",
        height: "100%",
      },
    },
  },
  "& .featuredItem": {
    gridArea: "1 / 1 /  1 / 25",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      gridArea: "1 / 1 / 3 / 17",
      height: "auto",
    },
    [theme.breakpoints.up("md")]: {
      gridArea: "1 / 1 / 3 / 13",
      height: "auto",
    },
  },
  [theme.breakpoints.up("sm")]: {
    gridColumnGap: 21,
    gridColumn: "2/24",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: "3/23",
  },
}))

const FeaturedItem = styled("div")({
  display: "grid",
})

const GridItem = styled("div")({
  display: "grid",
})
const RecipeFilter = styled("div")(({ theme, backgroundColour }) => ({
  display: "grid",
  gridColumn: "2/24",
  overflowX: "hidden",
  position: "relative",
  "&:after": {
    position: "absolute",
    content: "''",
    //backgroundColor: backgroundColour?.value,
    backgroundImage: `linear-gradient(to right, transparent, ${backgroundColour?.value} 65%)`,
    width: "var(--ms6)",
    height: "100%",
    right: "-26px",
    pointerEvents: "none",
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: "3/23",
    position: "relative",
    "&:after": {
      position: "absolute",
      content: "''",
      //backgroundColor: backgroundColour?.value,
      backgroundImage: `linear-gradient(to right, transparent, ${backgroundColour?.value} 65%)`,
      width: "var(--ms6)",
      height: "100%",
      right: "-26px",
      pointerEvents: "none",
    },
  },
}))
//Pagination

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
  display: "flex",
  justifyContent: "space-between",
  columnGap: "var(--ms0)",
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  [theme.breakpoints.up("lg")]: {},
}))

const Number = styled("div")(({ theme, backgroundColour }) => ({
  fontSize: "var(--ms0)",
  fontFamily: "var(--font-primary)",
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  [theme.breakpoints.up("lg")]: {},
}))

//
export const RecipesSection = props => {
  const {
    allSanityRecipes,
    backgroundColour,
    paddingTop = 11,
    paddingBottom = 11,
    pageContext,
    amountToShow,
  } = props
  const [filtersPosts, setFilterData] = useState(null)

  const theme = useTheme()

  const definedAllSanityRecipes = amountToShow
    ? allSanityRecipes?.nodes?.slice(1, 6) || []
    : allSanityRecipes?.nodes || []

  useEffect(() => {
    setFilterData(definedAllSanityRecipes)
  }, [])

  const isInViewRef = useRef(null)
  const isInView = useInView(isInViewRef, { once: true })

  console.log(`Is In View - ${isInView}`)
  const variants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
    hidden: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 5 },
  }

  return (
    <ModuleContainer {...props}>
      <Wrapper
        ref={isInViewRef}
        backgroundColour={backgroundColour}
        paddingTop={theme.spacing(paddingTop)}
        paddingBottom={theme.spacing(paddingBottom)}
      >
        <RecipeFilter backgroundColour={backgroundColour}>
          <Filter
            backgroundColour={backgroundColour}
            className="component-filter"
            type="recipes"
            filtersData={filtersPosts}
            setFilterData={setFilterData}
            pageContext={pageContext}
          />
        </RecipeFilter>
        {filtersPosts && (
          <GridContainer
            theme={theme}
            animate={isInView && "visible"}
            initial="hidden"
            variants={variants}
          >
            {filtersPosts &&
              filtersPosts?.map((tile, i) => {
                if (i === 0) {
                  return (
                    <FeaturedItem
                      className="featuredItem"
                      variants={item}
                      key={`${tile.title}-${i}`}
                    >
                      <RecipeTile
                        backgroundColour={backgroundColour}
                        variant="h3"
                        {...tile}
                        i={i}
                        showMeta={true}
                      />
                    </FeaturedItem>
                  )
                } else {
                  return (
                    <GridItem
                      className="gridItem"
                      variants={item}
                      key={`${tile.title}-${i}`}
                    >
                      <RecipeTile
                        backgroundColour={backgroundColour}
                        variant="h4"
                        {...tile}
                        i={i}
                        showMeta={false}
                      />
                    </GridItem>
                  )
                }
              })}
          </GridContainer>
        )}
        //!
        {props.pageContext.humanPageNumber && (
          <PageNavigation theme={theme} backgroundColour={backgroundColour}>
            <PaginationArrows
              backgroundColour={backgroundColour}
              variant="text"
              style={{
                color:
                  props.pageContext.humanPageNumber === 1 && true
                    ? "var(--grand-primary)"
                    : contrastBrandPalette[backgroundColour?.label]
                        ?.contrastText,
              }}
              startIcon={
                <ChevronLeftIcon
                  color={
                    props.pageContext.humanPageNumber === 1 && true
                      ? "var(--grand-primary)"
                      : contrastBrandPalette[backgroundColour?.label]
                          ?.contrastText
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
              {/* {props.pageContext.numberOfPages > 5 && */}
              {Array.from({ length: props.pageContext.numberOfPages }).map(
                (_, index) => (
                  <Number
                    key={`pagination-${index}`}
                    backgroundColour={backgroundColour}
                    style={{
                      borderRadius: "9999px",
                      padding: "0 var(--ms-1)",
                      borderWidth:
                        index + 1 === props.pageContext.humanPageNumber
                          ? "1px"
                          : "0px",
                      borderStyle: "solid",
                      borderColor:
                        index + 1 === props.pageContext.humanPageNumber
                          ? "primary.main"
                          : "inherit",
                      color:
                        index + 1 === props.pageContext.humanPageNumber
                          ? "primary.main"
                          : "inherit",
                      "&:hover": {
                        cursor: "pointer",
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <GatsbyLink to={`/recipes/${index === 0 ? "" : index + 1}`}>
                      {index + 1}
                    </GatsbyLink>
                  </Number>
                ),
              )}
            </Numbers>

            <PaginationArrows
              backgroundColour={backgroundColour}
              variant="text"
              style={{
                color:
                  props.pageContext.humanPageNumber ===
                    props.pageContext.numberOfPages && true
                    ? "var(--grand-primary)"
                    : contrastBrandPalette[backgroundColour?.label]
                        ?.contrastText,
              }}
              endIcon={
                <ChevronRightIcon
                  color={
                    props.pageContext.humanPageNumber ===
                      props.pageContext.numberOfPages && true
                      ? "var(--grand-primary)"
                      : contrastBrandPalette[backgroundColour?.label]
                          ?.contrastText
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
        //!
      </Wrapper>
    </ModuleContainer>
  )
}

export const query = graphql`
  fragment RecipesSectionFragment on SanityRecipesSection {
    _key
    _type
    verticalSpace {
      topPadding
      bottomPadding
    }
    amountToShow
    showRecipesArchive {
      setArchive
      archive {
        title
        duration {
          hours
          minutes
        }
        featuredMedia {
          asset {
            _id
          }
          hotspot {
            x
          }
        }
        slug {
          current
        }
      }
    }
    backgroundColour {
      label
      value
    }
  }
`
