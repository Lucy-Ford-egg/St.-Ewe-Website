import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
// Preview
import { useQuery } from "../../sanity/store";
import {PAGE_QUERY, SITE_SETTINGS} from '../queries/documentQueries';

import {getSanityClient } from "../../sanityUtils/sanity"

const PageTemplate = props => {

  const { data, pageContext, initial } = props

  // Preview
  const definedSlug = (props.data.sanityPage && props.data.sanityPage.slug.current !== "home-page" ? props.data.sanityPage : {slug: {current: "home-page"}} ) || props.data.sanityPost || props.data.sanityTeamMember || props.data.sanityRecipes

  const { data: previewData } = useQuery(
    `{ "siteSettings": ${SITE_SETTINGS}, "page":${PAGE_QUERY}}`,
    {slug: definedSlug.slug.current},
    { initial }
  );

  const pageData = previewData?.page
  const siteSettings = (previewData && previewData?.siteSettings[0]) || data?.sanitySiteSettings
  const definedModules = (previewData && previewData?.page?.pageBuilder) || data?.sanityPage?.pageBuilder

  return (
      <Modules
        sanityConfig={getSanityClient}
        previewData={pageData?.pageBuilder}
        allSanityPost={data.allSanityPost}
        // getAllPosts={data.getAllPosts}
        allSanityRecipes={data.allSanityRecipes}
        pageContext={pageContext}
        modules={definedModules}
        sanitySiteSettings={siteSettings }
      />
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const pageTemplateQuery = graphql`

query pageTemplateQuery( $slug: String!, $recipeIds: [String] ) {

  allSanityRecipes(
    sort: {date: DESC}
    filter: {_id: {in: $recipeIds}}
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
      duration {
        hours
        minutes
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
    }
  }
  
  allSanityPost(sort: {date: DESC}, limit: 8){
    nodes {
      _rawExcerpt(resolveReferences: {maxDepth: 3})
      _rawContent(resolveReferences: {maxDepth: 10})
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
  
  sanityPage(slug: {current: {eq: $slug}}) {
    ... SeoPageFragment
    slug {
      current
    }
    title
    pageBuilder {
      ...PageBuilderFragment
    }
  }
  sanitySiteSettings {
   ... CompanyDetailsFragment
  }
}
`
export default PageTemplate
