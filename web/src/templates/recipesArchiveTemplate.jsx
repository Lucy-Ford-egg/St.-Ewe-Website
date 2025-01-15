import React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"

//Preview
import { useQuery } from "../../sanity/store"
import { PAGE_QUERY } from "../queries/documentQueries"
import { getSanityClient } from "../../sanityUtils/sanity"

const RecipeArchiveTemplate = props => {
  const { data, pageContext, initial, location } = props

  // Preview
  const { data: previewData } = useQuery(
    PAGE_QUERY,
    { slug: data?.sanityPage?.slug?.current },
    { initial },
  )

  const definedModules =
    (previewData && previewData?.pageBuilder) || data?.sanityPage?.pageBuilder

  return (
    <>
      <Modules
        previewData={previewData?.pageBuilder}
        sanityConfig={getSanityClient}
        allSanityRecipes={data?.allSanityRecipes}
        pageContext={pageContext}
        modules={definedModules}
        getAllPosts={data?.getAllPosts}
        location={location}
      />
    </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data?.sanityPage} location={location} />
}

export const RecipeArchiveTemplateQuery = graphql`
  query RecipeArchiveTemplateQuery($slug: String!, $skip: Int, $limit: Int) {
    allSanityRecipes(sort: { date: DESC }, skip: $skip, limit: $limit) {
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
        excerpt: _rawExcerpt(resolveReferences: { maxDepth: 3 })
        date
        categories {
          name
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
    sanityPage(slug: { current: { eq: $slug } }) {
      metaDescription
      metaTitle
      ogTitle
      ogImage {
        asset {
          url
        }
      }
      ogDescription
      slug {
        current
      }
      title
      pageBuilder {
        ...PageBuilderFragment
      }
    }
  }
`
export default RecipeArchiveTemplate
