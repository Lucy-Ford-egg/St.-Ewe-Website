import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
// import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
// import { pageQuery } from "../templates/queries/documentQueries"

//Preview

import { STUDIO_ORIGIN, useQuery } from "../../sanity/store";
import {PAGE_QUERY} from '../queries/documentQueries'
// import { useEncodeDataAttribute } from "@sanity/react-loader";

const IndexPage = props => {
  const { data, pageContext, initial } = props


  // Preview
  const { data: previewData, sourceMap } = useQuery(
    PAGE_QUERY,
    {slug: 'home-page'},
    { initial }
  );

  return (
    // <IncludePreview
    //   documentQueries={pageQuery}
    //   slug={{
    //     "current": "home-page"
    //     }} //data.sanityPage.slug
    //   data={data}
    // >
    <>
      <Modules
        previewData={previewData}
        pageContext={pageContext}
        modules={data?.sanityPage?.pageBuilder}
      />
      </>
    // </IncludePreview>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const homeQuery = graphql`
query homeQuery{
    sanityPage(slug: {current: {eq: "home-page"}}) {
      slug {
        current
      }
      pageTitle
      navColor{
        value
      }
      #...SeoPageFragment
      pageBuilder {
        ... on SanityHeaderSection {
          ...HeaderSectionFragment
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
        ... on SanityBenifitsSection {
          ... BenifitsSectionFragment
        }
        ... on SanityContactSection {
          ... ContactSectionFragment
        }
        ... on SanityBlogSection {
          ... BlogSectionFragment
        }
      }
    }
  }
`
export default IndexPage
