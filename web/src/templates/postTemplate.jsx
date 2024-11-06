import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
import { useTheme } from "@mui/material"
//Preview
import { useQuery } from "../../sanity/store"
import { POST_QUERY } from "../queries/documentQueries"

const PostTemplate = props => {
  const { data, pageContext, initial, location } = props
  const theme = useTheme()

  // Preview
  const { data: previewData } = useQuery(
    POST_QUERY,
    { slug: data.sanityPost?.slug?.current },
    { initial },
  )
  const definedModules =
    (previewData && previewData?.pageBuilder) || data?.sanityPost?.pageBuilder

  return (
    <>
      <Modules
        pageContext={pageContext}
        modules={definedModules}
        allSanityPost={data.allSanityPost}
        getAllPosts={data.getAllPosts}
        location={location}
      />
    </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPost} location={location} />
}

export const pageTemplateQuery = graphql`
  query postTemplateQuery($slug: String!, $postIds: [String]) {
    sanityPost(slug: { current: { eq: $slug } }) {
      ...SeoPostFragment
      author {
        name
      }
      slug {
        current
      }
      title
      date
      categories {
        name
        slug {
          current
        }
      }
      #...SeoPageFragment
      pageBuilder {
        ...PageBuilderFragment
      }
    }
    allSanityPost(
      filter: {
        categories: { elemMatch: { slug: { current: { in: $postIds } } } }
      }
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
  }
`
export default PostTemplate
