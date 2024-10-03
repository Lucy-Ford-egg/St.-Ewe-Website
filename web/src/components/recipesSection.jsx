import React, { useState, useEffect, useRef } from "react"
import { graphql } from "gatsby"
import { Container, Grid, styled } from "@mui/material/"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material"
import { RecipeTile } from "./recipeTile"
import { motion, useInView } from "framer-motion"


//Preview
import { useQuery } from "../../sanity/store"
import {
  RECIPES_BY_ID,
  ALL_RECIPES,
} from "../queries/documentQueries"

const Wrapper = styled('div')(({ backgroundColour, paddingTop, paddingBottom }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(24, 1fr)',
  gridColumn: '1/25',
  backgroundColor: backgroundColour?.value,
  paddingTop: paddingTop,
  paddingBottom: paddingBottom,
  overflowX: 'hidden',
}
));

const GridContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridColumn: '3/23',
  gridTemplateRows: '1fr 1fr',
  gridColumnGap: 21,
  gridRowGap: 21,
  gridTemplateColumns: 'subgrid',
  "& .gridItem":{
    gridColumn: '1/25',
    [theme.breakpoints.up('lg')]: {
      "&:first-of-type": {
        gridArea: '1 / 11 / 2 / 16' ,
        height: '100%',
      },
      "&:nth-child(2)": {
        gridArea: '1 / 16 / 2 / 25',
        height: '100%', 
      },
      "&:nth-child(3)": {
        gridArea: '2 / 11 / 3 / 16',
        height: '100%', 
      },
      "&:nth-child(4)": {
        gridArea: '2 / 16 / 3 / 25' ,
        height: '100%',
      }
    },
    [theme.breakpoints.up('lg')]: {
      gridColumn: 'span 5',
    },
  },
  "& .featuredItem":{
    gridArea: '1 / 1 /  1 / 25',
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      gridArea: '1 / 1 / 3 / 11',
    }
  }
}
));

const FeaturedItem = styled('div')(({ backgroundColour, paddingTop, paddingBottom }) => ({
  display: 'grid',
}
));

const GridItem = styled('div')(({ backgroundColour, paddingTop, paddingBottom }) => ({
  display: 'grid',
}
));

export const RecipesSection = ({
  allSanityRecipes,
  topPadding,
  previewData,
  initial,
  _type,
  backgroundColour,
  paddingTop = 11,
  paddingBottom = 11,
  featuredTile,
}) => {
  const [filtersPosts, setFilterData] = useState(null)

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))
  const sm = useMediaQuery(theme.breakpoints.down("sm"))

  const { data: allRecipe } = useQuery(ALL_RECIPES, {}, { initial })

  const { data: recipeData } = useQuery(
    RECIPES_BY_ID,
    {
      categoryId:
        (previewData &&
          previewData?.showRecipesArchive?.archive &&
          previewData?.showRecipesArchive?.archive.map(node => node?._id)) ||
        [],
    },
    { initial },
  )

  const definedTopPadding =
    (previewData && _type === previewData?._type && previewData?.topPadding) ||
    topPadding

  const definedAllSanityRecipes =
    // (recipeData && recipeData?.length > 0 && recipeData) ||
    // (previewData?.showRecipesArchive?.setArchive === true &&
    //   allRecipe &&
    //   allRecipe) ||
    allSanityRecipes?.nodes


  useEffect(() => {
    setFilterData(definedAllSanityRecipes)
  }, [])


  const isInViewRef = useRef(null)
  const isInView = useInView(isInViewRef, { once: true });

  console.log(`Is In View - ${isInView}`)
  const variants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.07, delayChildren: 0.2
      }
    },
    hidden: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const item = {
    visible: { opacity: 1, y: 0, },
    hidden: { opacity: 0, y: 5, },
  }

  return (
    <Wrapper ref={isInViewRef} backgroundColour={backgroundColour} paddingTop={theme.spacing(paddingTop)} paddingBottom={theme.spacing(paddingBottom)}>

      {/* <Filter className="component-filter" type="posts" allData={allPost} filtersData={filtersPosts} setFilterData={setFilterData}/> */}

      {filtersPosts && (<GridContainer
      theme={theme}
        animate={isInView && "visible"}
        initial="hidden"
        variants={variants}>

        {filtersPosts &&
          filtersPosts?.map((tile, i) => {
            if (i === 0) {
              return (
              <FeaturedItem className="featuredItem" variants={item} key={`${tile.title}-${i}`}>
                <RecipeTile backgroundColour={backgroundColour} variant="h3" {...tile} i={i} showMeta={true} />
              </FeaturedItem>
              )
            }
            else {
              return (
                <GridItem className="gridItem" variants={item} key={`${tile.title}-${i}`}>
                  <RecipeTile backgroundColour={backgroundColour} variant="h4" {...tile} i={i}  showMeta={false} />
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
    }
    backgroundColour{
      label
      value
    }
  }
`