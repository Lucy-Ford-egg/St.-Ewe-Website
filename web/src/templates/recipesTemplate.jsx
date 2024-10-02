import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
import {
  Container,
  Grid,
  useTheme,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { RenderPortableText } from "../components/renderPortableText"
//Preview
import { useQuery } from "../../sanity/store"
import { RECIPES_QUERY } from "../queries/documentQueries"

const RecipeTemplate = props => {
  const { data, pageContext, initial, location } = props
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  // Preview
  const { data: previewData } = useQuery(
    `{"RecipeQuery:" ${RECIPES_QUERY}`,
    { slug: data.sanityRecipes.slug.current },
    { initial },
  )

  const definedImage =
    (previewData && previewData?.RecipeQuery?.coverImage) || data.sanityRecipes?.coverImage

  const definedCategory =
    (previewData && previewData?.RecipeQuery?.category?.name) ||
    data.sanityRecipes?.category?.name

  const definedRawBody = (previewData && previewData?.RecipeQuery?.instructions) || data?.sanityRecipes._rawInstructions
  const definedModules = (previewData && previewData?.RecipeQuery?.pageBuilder)  || data?.sanityRecipes?.pageBuilder

  return (
    <>
      <Modules
        pageContext={pageContext}
        modules={definedModules}
        getAllPosts={data.getAllPosts}
        allSanityRecipe={data.allSanityRecipe}
      />
            
    </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityRecipe} location={location} />
}

export const RecipeTemplateQuery = graphql`
  query RecipeTemplateQuery($slug: String!, $recipeIds:[String!]) {
    sanityRecipes(slug: { current: { eq: $slug } }) {
      ... SeoRecipesFragment
      slug {
        current
      }
      title
      date(formatString: "Do MMMM YYYY")
      category {
        title
      }
      featuredMedia {
        asset {
          _id

          gatsbyImageData
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
      _rawInstructions(resolveReferences: { maxDepth: 10 })
      #...SeoPageFragment
      pageBuilder {
        ...PageBuilderFragment
      }
    }
    allSanityRecipes(filter: {
      category: {
        _id: {
          in: $recipeIds
        }
      }
    }) {
    nodes {
      _key
      _id
      ...RecipeTileFragment 
    }
  }
    getAllPosts: allSanityPost(sort: {date: DESC}){
      nodes {
        tileImage {
          asset {
            _id
            gatsbyImageData
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
     
        slug {
          current
        }
        date
        categories {
          title
          _id
          slug{
            current
          }
        }
        author {
          name
        }
        title
        
      }
    }
  }
`
export default RecipeTemplate

// TODO:
// ... on SanityLocationSection {
//   ...LocationSectionFragment
// }
// ... on SanityBenifitsSection {
//   ... BenifitsSectionFragment
// }
// ... on SanityContactSection {
//   ... ContactSectionFragment
// }
