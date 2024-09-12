import React, { useState, useEffect, useRef } from "react"
import { graphql } from "gatsby"
import {Container, Grid, styled} from "@mui/material/"
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

const Wrapper = styled('div')(({ backgroundColour, paddingTop, paddingBottom}) => (
  { backgroundColor: backgroundColour?.value,
    paddingTop: paddingTop,
    paddingBottom: paddingBottom,
    overflowX: 'hidden',
  }
));

export const RecipeSection = ({
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

  const definedallSanityRecipes =
    (recipeData && recipeData?.length > 0 && recipeData) ||
    (previewData?.showRecipesArchive?.setArchive === true &&
      allRecipe &&
      allRecipe) ||
    allSanityRecipes?.nodes

  useEffect(() => {
    setFilterData(definedallSanityRecipes)
  }, [])


  const isInViewRef = useRef(null)
  const isInView = useInView(isInViewRef, { once: true});

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

  const GridComponent = React.forwardRef((props, ref,) => (
    <Grid ref={ref} {...props} container spacing={6} >{props.children}</Grid>
  ))
  const MotionGridContainer = motion(GridComponent)

  const GridItem = React.forwardRef((props, ref,) => (
    <Grid ref={ref} {...props} item>{props.children}</Grid>
  ))
  const MotionGridItem = motion(GridItem)

  return (
    <Wrapper ref={isInViewRef} backgroundColour={backgroundColour} paddingTop={theme.spacing(paddingTop)} paddingBottom={theme.spacing(paddingBottom)}>
      <Container
        className="component-postsGrid"
        sx={{
          pb: {
            xs: theme.spacing(16),
            md: theme.spacing(16),
          },
          pt: definedTopPadding
            ? {
              xs: theme.spacing(16),
              md: theme.spacing(0),
            }
            : { xs: theme.spacing(16), md: theme.spacing(16) },
        }}
        maxWidth="xl"
      >
        {/* <Filter className="component-filter" type="posts" allData={allPost} filtersData={filtersPosts} setFilterData={setFilterData}/> */}

        {filtersPosts && ( <MotionGridContainer
            animate={isInView && "visible"}
            initial="hidden"
            variants={variants}>
            {definedallSanityRecipes &&
              definedallSanityRecipes.map((tile, i) => {
                return (

                  <MotionGridItem variants={item} key={`${tile.title}-${i}`} xs={12} sm={6} md={i === 0 ? 6 : 3}>

                    <RecipeTile {...tile} i={i} />

                  </MotionGridItem>

                )
              })}
          </MotionGridContainer>
          
        )}

        {/* <Pagination pageContext={pageContext}/> */}
      </Container>

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