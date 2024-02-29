import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
// Preview
import { useQuery } from "../../sanity/store";
import {PAGE_QUERY} from '../queries/documentQueries';

import {getSanityClient } from "../../sanityUtils/sanity"

const PageTemplate = props => {

  const { data, pageContext, initial } = props

  // Preview
  const definedSlug = (props.data.sanityPage && props.data.sanityPage.slug.current !== "home-page" ? props.data.sanityPage : {slug: {current: "home-page"}} ) || props.data.sanityPost || props.data.sanityTeamMember || props.data.sanityCaseStudy

  const { data: previewData, sourceMap } = useQuery(
    PAGE_QUERY,
    {slug: definedSlug.slug.current},
    { initial }
  );

  return (
      <Modules
        sanityConfig={getSanityClient}
        previewData={previewData?.pageBuilder}
        allSanityPost={data.allSanityPost}
        allCaseStudy={data.allSanityCaseStudy}
        pageContext={pageContext}
        modules={data?.sanityPage?.pageBuilder}
        sanitySiteSettings={data?.sanitySiteSettings}
      />
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const pageTemplateQuery = graphql`

query pageTemplateQuery( $caseStudyIds:[String!], $postIds:[String!], $slug: String!, $skip: Int, $limit: Int) {
  allSanityPost(
    filter: {
      category: {
        _id: {
          in: $postIds
        }
      }
    }
    skip: $skip 
    limit: $limit 
  ) {
    nodes {
      image: coverImage {
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
      date(formatString: "MMM Do, YYYY")
      category {
        name
        _id
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
  allSanityCaseStudy(
    filter: {
      service: {
        _id: {
          in: $caseStudyIds
        }
      }
    }
    skip: $skip 
    limit: $limit 
  ) {
    nodes {
      _key
      _id
      ...CaseStudyTileFragment
     
    }
  }
  sanityPage(slug: {current: {eq: $slug}}) {
    slug {
      current
    }
    navOverlay
    navColor{
      value
      label
    }
    pageTitle
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
