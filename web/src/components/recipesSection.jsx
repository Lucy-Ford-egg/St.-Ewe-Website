import React, { useState, useEffect, useRef } from "react"
import { graphql } from "gatsby"
import { styled } from "@mui/material/"
import { Filter } from "./filter"
import { useTheme } from "@mui/material"
import { RecipeTile } from "./recipeTile"
import { useInView } from "framer-motion"

const Wrapper = styled("div")(
  ({ backgroundColour, paddingTop, paddingBottom }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(24, 1fr)",
    gridColumn: "1/25",
    backgroundColor: backgroundColour?.value,
    paddingTop: paddingTop,
    paddingBottom: paddingBottom,
    overflowX: "hidden",
  }),
)

const GridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridColumn: "3/23",
  gridTemplateRows: "1fr",

  gridRowGap: 21,
  gridTemplateColumns: "repeat(24, 1fr)",
  "& .gridItem": {
    gridColumn: "1/25",
    [theme.breakpoints.up("md")]: {
      "&:first-of-type": {
        gridArea: "1 / 11 / 2 / 16",
        height: "100%",
      },
      "&:nth-child(2)": {
        gridArea: "1 / 16 / 2 / 25",
        height: "100%",
      },
      "&:nth-child(3)": {
        gridArea: "2 / 11 / 3 / 16",
        height: "100%",
      },
      "&:nth-child(4)": {
        gridArea: "2 / 16 / 3 / 25",
        height: "100%",
      },
    },
    [theme.breakpoints.between("sm", "md")]: {
      gridTemplateRows: "unset",
      gridColumn: "span 10",
      gridColumnGap: 21,
    },
    [theme.breakpoints.up("md")]: {
      //gridTemplateRows: "1fr 1fr",
      gridColumn: "span 6",
    },
  },
  "& .featuredItem": {
    gridArea: "1 / 1 /  1 / 25",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      gridArea: "1 / 1 / 3 / 13",
      height: "auto",
    },
  },
  [theme.breakpoints.up("md")]: {
    gridColumnGap: 21,
  },
}))

const FeaturedItem = styled("div")({
  display: "grid",
})

const GridItem = styled("div")({
  display: "grid",
})
const RecipeFilter = styled("div")({
  display: "grid",
  gridColumn: "3/23",
})

export const RecipesSection = ({
  allSanityRecipes,
  backgroundColour,
  paddingTop = 11,
  paddingBottom = 11,
  pageContext,
}) => {
  const [filtersPosts, setFilterData] = useState(null)

  const theme = useTheme()

  const definedAllSanityRecipes = allSanityRecipes?.nodes

  useEffect(() => {
    setFilterData(definedAllSanityRecipes)
  }, [definedAllSanityRecipes, setFilterData])

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
    <Wrapper
      ref={isInViewRef}
      backgroundColour={backgroundColour}
      paddingTop={theme.spacing(paddingTop)}
      paddingBottom={theme.spacing(paddingBottom)}
    >
      <RecipeFilter>
        <Filter
          backgroundColour={backgroundColour}
          className="component-filter"
          type="recipes"
          // allData={getAllPosts.nodes}
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

      {/* <Pagination pageContext={pageContext}/> */}
    </Wrapper>
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
