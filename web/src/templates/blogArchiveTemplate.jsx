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
  const { data: previewData } = useQuery(
    PAGE_QUERY,
    { slug: data.sanityPage.slug.current },
    { initial },
  )

  const definedModules = (previewData && previewData?.pageBuilder) || data?.sanityPage?.pageBuilder

  return (
    <>
      <Modules
          previewData={previewData?.pageBuilder}
          sanityConfig={getSanityClient}
          allSanityPost={data.allSanityPost}
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

export const blogArchiveTemplateQuery = graphql`
  query blogArchiveTemplateQuery(
    $slug: String!
    $skip: Int
    $limit: Int
  ) {
    allSanityPost(
      skip: $skip
      limit: $limit
      sort: {date: DESC}
    ) {
      nodes {
        author {
          name
        }
        slug {
          current
        }
        title
        date
        category {
          name
          slug{
            current
          }
        }
        tileColor {
          value
          label
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
    sanityPage(slug: { current: { eq: $slug } }) {
      slug {
        current
      }
      navOverlay
      navColor {
        value
        label
      }
      title
      pageBuilder {
        ...PageBuilderFragment
      }
    }
  }
`
export default BlogArchiveTemplate
