import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
// Preview
import { useQuery } from "../../sanity/store";
import {PAGE_QUERY, SITE_SETTINGS} from '../queries/documentQueries';
import {getSanityClient } from "../../sanityUtils/sanity"

const IndexPage = props => {
  const { data, pageContext, initial } = props

  // Preview
  const { data: previewData, sourceMap } = useQuery(
    `{ "siteSettings": ${SITE_SETTINGS}, "page":${PAGE_QUERY}}`,
    {slug: '404'},
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
    allCaseStudy={data.allSanityCaseStudy}
    pageContext={pageContext}
    modules={definedModules}
    sanitySiteSettings={siteSettings }
  />
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const homeQuery = graphql`
query homeTemplateQuery( $caseStudyIds:[String!], $postIds:[String!], $skip: Int, $limit: Int) {
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
      image {
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
    sanityPage(slug: {current: {eq: "home-page"}}) {
      slug {
        current
      }
      pageTitle
      navOverlay
      navColor{
        value
      }
      #...SeoPageFragment
      pageBuilder {
        ... on SanityHeaderSection {
          ...HeaderSectionFragment
        }
        ... on SanityTestimonialSection {
          ...TestimonialSectionFragment
        }
        ... on SanityTeamSection {
          ...TeamSectionFragment
        }
        ...on SanityCaseStudySection {
          ... CaseStudySectionFragment
        }
        ... on SanityVideoSection {
          ...VideoSectionFragment
        }
        ... on SanityFeaturesListSection {
          ...FeaturesListSectionFragment
        }
        ... on SanityCtaSection {
          ...CtaSectionFragment
        }
        ... on SanityNewsletterSection{
          ... NewsletterSectionFragment
        }      
        ... on SanityImageCarouselSection {
          ...ImageCarouselSectionFragment
        }
        ...on SanityBlogSection {
          ... BlogSectionFragment
        }
        ... on SanityStepsSection{
          ... StepsSectionFragment
        }
        ... on SanityTimelineSection{
          ... TimelineSectionFragment
        }
      }
    }
  }
`
export default IndexPage
