import React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
//Preview
import { useQuery } from "../../sanity/store"
import { CATEGORY_PAGE_QUERY } from "../queries/documentQueries"
import { getSanityClient } from "../../sanityUtils/sanity"

const CategoryArchiveTemplate = props => {
  const { data, pageContext, initial, location } = props

  // Preview
  const { data: previewData } = useQuery(
    CATEGORY_PAGE_QUERY,
    { slug: data?.sanityCategories?.slug?.current },
    { initial },
  )

  const definedModules =
    (previewData && previewData?.pageBuilder) ||
    data?.sanityCategories?.pageBuilder

  return (
    <>
      <Modules
        previewData={previewData?.pageBuilder}
        sanityConfig={getSanityClient}
        allSanityPost={data.allSanityPost}
        pageContext={pageContext}
        modules={definedModules}
        getAllPosts={data.allSanityPost}
        location={location}
      />
    </>
  )
}

export const Head = ({ data, location }) => {
  return (
    <Seo seoContext={data?.sanityCategories?.sanityPage} location={location} />
  )
}

export const blogArchiveTemplateQuery = graphql`
  query blogArchiveTemplateQuery(
    $slug: String!
    $skip: Int
    $limit: Int
    $postIds: [String]
  ) {
    allSanityPost(
      skip: $skip
      limit: $limit
      sort: { date: DESC }
      filter: { categories: { elemMatch: { _id: { in: $postIds } } } }
    ) {
      nodes {
        excerpt: _rawExcerpt(resolveReferences: { maxDepth: 3 })
        author {
          name
        }
        slug {
          current
        }
        title
        date
        categories {
          _id
          name
          slug {
            current
          }
        }
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
      }
    }
    sanityCategories(slug: { current: { eq: $slug } }) {
      metaDescription
      metaTitle
      ogTitle
      ogImage {
        asset {
          url
        }
      }
      ogDescription
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
export default CategoryArchiveTemplate
