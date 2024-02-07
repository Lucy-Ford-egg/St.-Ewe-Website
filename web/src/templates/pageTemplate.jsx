import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"

//Preview
import { useQuery } from "../../sanity/store";
import {PAGE_QUERY} from '../queries/documentQueries'
import {getSanityClient } from "../../sanityUtils/sanity"

const PageTemplate = props => {
  const { data, pageContext, location, initial } = props

  // Preview
  const { data: previewData, sourceMap } = useQuery(
    PAGE_QUERY,
    {slug: data.sanityPage.slug.current},
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
      category {
        name
        _id
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
    }
    pageTitle
    pageBuilder {
      ... on SanityHeaderSection {
        ...HeaderSectionFragment
      }
      ... on SanityFeatureSection {
        ...FeatureSectionFragment
      }
      ... on SanityTeamSection {
        ...TeamSectionFragment
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
      ... on SanityServicesSection {
        ...ServicesSectionFragment
      }
      ... on SanityTestimonialSection {
        ...TestimonialSectionFragment
      }
      ... on SanityImageCarouselSection {
        ...ImageCarouselSectionFragment
      }
      ... on SanityLocationSection {
        ...LocationSectionFragment
      }
      ... on SanityBenifitsSection {
        ... BenifitsSectionFragment
      }
      ... on SanityContactSection {
        ... ContactSectionFragment
      }
      ...on SanityBlogSection {
        ... BlogSectionFragment
      }
      ...on SanityCaseStudySection {
        ... CaseStudySectionFragment
      }
    }
  }
}
`
export default PageTemplate
