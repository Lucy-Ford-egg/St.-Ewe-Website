import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
// Preview
import { useQuery } from "../../sanity/store"
import { PAGE_QUERY, SITE_SETTINGS } from "../queries/documentQueries"
import { getSanityClient } from "../../sanityUtils/sanity"

const IndexPage = props => {
  const { data, pageContext, initial } = props

  // Preview
  const { data: previewData } = useQuery(
    `{ "siteSettings": ${SITE_SETTINGS}, "page":${PAGE_QUERY}}`,
    { slug: "404" },
    { initial },
  )

  const pageData = previewData?.page
  const siteSettings =
    (previewData && previewData?.siteSettings[0]) || data?.sanitySiteSettings
  const definedModules =
    (previewData && previewData?.page?.pageBuilder) ||
    data?.sanityPage?.pageBuilder

  return (
    <Modules
      sanityConfig={getSanityClient}
      previewData={pageData?.pageBuilder}
      allSanityPost={data.allSanityPost}
      allRecipes={data.allSanityRecipes}
      pageContext={pageContext}
      modules={definedModules}
      sanitySiteSettings={siteSettings}
      getAllPosts={data.getAllPosts}
    />
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const homeQuery = graphql`
  query homeTemplateQuery(
    $recipeIds: [String!]
    $postIds: [String!]
    $skip: Int
    $limit: Int
  ) {
    allSanityPost(
      filter: { categories: { elemMatch: { _id: { in: $postIds } } } }
      sort: { date: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
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

        slug {
          current
        }
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
    getAllPosts: allSanityPost {
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
    allSanityRecipes(
      filter: { categories: { elemMatch: { _id: { in: $recipeIds } } } }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        _key
        _id
        ...RecipeTileFragment
      }
    }
    sanityPage(slug: { current: { eq: "home-page" } }) {
      slug {
        current
      }
      title
      #...SeoPageFragment
      pageBuilder {
        ... on SanityHeaderSection {
          ...HeaderSectionFragment
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
      }
    }
  }
`
export default IndexPage
