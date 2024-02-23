import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"

const IndexPage = props => {
  const { data, pageContext, location, previewData } = props

  return (
    <>
      <Modules
        //sanityConfig={getSanityClient}
        previewData={previewData?.pageBuilder}
        //allSanityPost={data.allSanityPost}
        //allCaseStudy={data.allSanityCaseStudy}
        pageContext={pageContext}
        modules={data?.sanityPage?.pageBuilder}
      />
    </>
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
