import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
//Preview
import { useQuery } from "../../sanity/store"
import { RECIPES_QUERY } from "../queries/documentQueries"

const RecipeTemplate = props => {
  const { data, pageContext, initial } = props

  // Preview
  const { data: previewData } = useQuery(
    RECIPES_QUERY,
    { slug: data.sanityRecipes.slug.current },
    { initial },
  )

  const definedModules =
    (previewData && previewData?.pageBuilder) ||
    data?.sanityRecipes?.pageBuilder

  return (
    <>
      <Modules
        pageContext={pageContext}
        modules={definedModules}
        getAllPosts={data.getAllPosts}
        allSanityRecipes={data.allSanityRecipes}
        data={data}
      />
    </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityRecipes} location={location} />
}

export const RecipeTemplateQuery = graphql`
  query RecipeTemplateQuery($slug: String!, $recipeIds: [String]) {
    sanityRecipes(slug: { current: { eq: $slug } }) {
      ...SeoRecipesFragment
      slug {
        current
      }
      title
      date(formatString: "Do MMMM YYYY")

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
      ingredientsList {
        wholeNumber
        unit
        preparation
        optional
        ingredient {
          ... on SanityIngredient {
            id
            _key
            title
          }
          ... on SanityRecipes {
            id
          }
        }
        fraction
        _type
        _key
      }
      serves {
        note
        serves
      }
      _rawInstructions(resolveReferences: { maxDepth: 10 })
      pageBuilder {
        ... on SanityHeaderSection {
          ...HeaderSectionFragment
        }
        ... on SanityHeroHeaderSection {
          ...HeroHeaderSectionFragment
        }
        ... on SanityBorderSection {
          ...BorderSectionFragment
        }
        ... on SanityFeatureSection {
          ...FeatureSectionFragment
        }
        ... on SanityTitleSection {
          ...TitleSectionFragment
        }
        ... on SanityTextSection {
          ...TextSectionFragment
        }
        ... on SanityRecipesSection {
          ...RecipesSectionFragment
        }
        ... on SanityImageSection {
          ...ImageSectionFragment
        }
        ... on SanityBlogSection {
          ...BlogSectionFragment
        }
        ... on SanityRecipeBodySection {
          ...RecipeBodySectionFragment
        }
      }
    }
    allSanityRecipes(
      sort: { date: DESC }
      filter: { _id: { in: $recipeIds }, slug: { current: { ne: $slug } } }
    ) {
      nodes {
        _key
        _id
        ...RecipeTileFragment
      }
    }
    getAllPosts: allSanityPost(sort: { date: DESC }) {
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
          slug {
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
