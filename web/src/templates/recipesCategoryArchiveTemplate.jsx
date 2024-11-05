import React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
//Preview
import { useQuery } from "../../sanity/store"
import { PAGE_QUERY } from "../queries/documentQueries"
import { getSanityClient } from "../../sanityUtils/sanity"

const RecipesCategoryArchiveTemplate = props => {
  const { data, pageContext, initial } = props

  // Preview
  const { data: previewData } = useQuery(
    PAGE_QUERY,
    { slug: data?.sanityRecipesCategory?.slug?.current },
    { initial },
  )

  const definedModules =
    (previewData && previewData?.pageBuilder) ||
    data?.sanityRecipesCategory?.pageBuilder

  return (
    <>
      <Modules
        previewData={previewData?.pageBuilder}
        sanityConfig={getSanityClient}
        allSanityPost={data.allSanityPost}
        allSanityRecipes={data?.allSanityRecipes}
        pageContext={pageContext}
        modules={definedModules}
        getAllPosts={data.allSanityPost}
      />
    </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const recipieCategoryArchiveTemplateQuery = graphql`
  query recipeCategoryArchiveTemplateQuery(
    $slug: String!
    $skip: Int
    $limit: Int
  ) {
    allSanityRecipes(
      skip: $skip
      limit: $limit
      sort: { date: DESC }
      filter: {
        categories: { elemMatch: { slug: { current: { eq: $slug } } } }
      }
    ) {
      nodes {
        _key
        _id
        ...RecipeTileFragment
      }
    }
    sanityRecipesCategory(slug: { current: { eq: $slug } }) {
      _id
      slug {
        current
      }
      pageBuilder {
        ...PageBuilderFragment
      }
    }
  }
`
export default RecipesCategoryArchiveTemplate
