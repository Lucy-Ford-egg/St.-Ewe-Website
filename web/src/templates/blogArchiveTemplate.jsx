import React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
//Preview
import { useQuery } from "../../sanity/store"
import { PAGE_QUERY } from "../queries/documentQueries"
import { getSanityClient } from "../../sanityUtils/sanity"

const BlogArchiveTemplate = props => {
  const { data, pageContext, initial } = props

  // Preview
  const { data: previewData, sourceMap } = useQuery(
    PAGE_QUERY,
    { slug: data.sanityPage.slug.current },
    { initial },
  )

  return (
    <>
      <Modules
          previewData={previewData?.pageBuilder}
          sanityConfig={getSanityClient}
          allSanityPost={data.allSanityPost}
          pageContext={pageContext}
          modules={data?.sanityPage?.pageBuilder}
        />
    </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const blogArchiveTemplateQuery = graphql`
  query blogArchiveTemplateQuery(
    $postIds: [String!]
    $slug: String!
    $skip: Int
    $limit: Int
  ) {
    allSanityPost(
      filter: { category: { _id: { in: $postIds } } }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        author {
          name
        }
        slug {
          current
        }
        title
        date(formatString: "MMM Do, YYYY")
        category {
          name
        }
        tileColor {
          value
          label
        }
        coverImage {
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
    sanityPage(slug: { current: { eq: $slug } }) {
      slug {
        current
      }
      navOverlay
      navColor {
        value
        label
      }
      pageTitle
      pageBuilder {
        ...PageBuilderFragment
      }
    }
  }
`
export default BlogArchiveTemplate
