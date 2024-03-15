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
    {slug: 'home-page'},
    { initial }
  );

  const pageData = previewData?.page
  const siteSettings = (previewData && previewData?.siteSettings[0]) || data?.sanitySiteSettings

  return (
      <Modules
        sanityConfig={getSanityClient}
        previewData={pageData?.pageBuilder}
        allSanityPost={data.allSanityPost}
        allCaseStudy={data.allSanityCaseStudy}
        pageContext={pageContext}
        modules={data?.sanityPage?.pageBuilder}
        sanitySiteSettings={siteSettings }
      />
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
