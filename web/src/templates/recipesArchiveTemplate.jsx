import React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"

//Preview
import { useQuery } from "../../sanity/store"
import { PAGE_QUERY } from "../queries/documentQueries"
import { getSanityClient } from "../../sanityUtils/sanity"

const RecipeArchiveTemplate = props => {

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
          allSanityRecipes={data.allSanityRecipes}
          pageContext={pageContext}
          modules={definedModules }
          getAllPosts={data.getAllPosts}
        />
    </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const RecipeArchiveTemplateQuery = graphql`
query RecipeArchiveTemplateQuery( $recipeIds:[String!], $slug: String!, $skip: Int, $limit: Int) {
  allSanityRecipes(
    filter: {
      category: {
        _id: {
          in: $recipeIds
        }
      }
    }
    skip: $skip 
    limit: $limit 
  ) {
    nodes {
      slug {
        current
      }
      title
      date(formatString: "Do MMMM YYYY")
      category {
        name
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
      _rawInstructions(resolveReferences: { maxDepth: 10 })
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
      category {
        name
        _id
        slug{
          current
        }
      }
      author {
        name
      }
      title
      tileColor{
        value
        label
      }
    }
  }
  sanityPage(slug: {current: {eq: $slug}}) {
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
