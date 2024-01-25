import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"

//Preview

import { STUDIO_ORIGIN, useQuery } from "../../sanity/store";
import {PAGE_QUERY} from '../queries/documentQueries'
import { useEncodeDataAttribute } from "@sanity/react-loader";

const PageTemplate = props => {
  const { data, pageContext, location, initial } = props

  // Preview
  const { data: previewData, sourceMap } = useQuery(
    PAGE_QUERY,
    {slug: 'home-page'},
    { initial }
  );

  // const encodeDataAttribute = useEncodeDataAttribute(
  //   data,
  //   sourceMap,
  //   STUDIO_ORIGIN
  // );
debugger
  return (
    // <IncludePreview
    //   documentQueries={pageQuery}
    //   slug={data.sanityPage.slug} //
    //   data={data}
    // >
      <Modules
        previewData={previewData}
        allSanityPost={data.allSanityPost}
        pageContext={pageContext}
        modules={data?.sanityPage?.pageBuilder}
      />
    // </IncludePreview>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const pageTemplateQuery = graphql`

query pageTemplateQuery( $postIds:[String!], $slug: String!, $skip: Int, $limit: Int) {
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
      excerpt
      slug {
        current
      }
      category {
        name
        _id
      }
    }
  }
  sanityPage(slug: {current: {eq: $slug}}) {
    slug {
      current
    }
    pageTitle
    pageBuilder {
      ... on SanityHeaderSectionAccommodationSearch {
        _key
        _type
        ...HeaderSectionAccommodationSearchFragment
      }
      ... on SanityUnitsListsSection {
        ...UnitsListsSectionFragment
      }
      ... on SanityFeatureSection {
        ...FeatureSectionFragment
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
      ... on SanityFaqsSection {
        ...FaqsSectionFragment
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
    }
  }
}
`
export default PageTemplate
