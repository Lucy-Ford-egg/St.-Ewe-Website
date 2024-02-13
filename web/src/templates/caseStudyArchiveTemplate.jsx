import React, {useEffect, useState} from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
import { pageQuery } from "./queries/documentQueries"

const CaseStudyArchiveTemplate = props => {
  const { data, pageContext } = props
  const [caseStudies, setCaseStudies] = useState(null)
  const [modules, setModules] = useState(null)
  const [blogInserted, setBlogInserted] = useState(null)
  
  let i = 0

  useEffect(() => {
  
    setCaseStudies(data.allSanityCaseStudy)
    setModules(data?.sanityPage?.pageBuilder)
   
    setBlogInserted(i)
    i ++
  }, [data])

  return (
    <IncludePreview
      documentQueries={pageQuery}
      slug={data.sanityPage.slug} //
      data={data}
    >
      {caseStudies && modules && 
      <Modules
        allSanityPost={data.allSanityPost}
        allSanityCaseStudy={data.allSanityCaseStudy}
        pageContext={pageContext}
        modules={modules}
      />
}
    </IncludePreview>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const caseStudyArchiveTemplateQuery = graphql`
query caseStudyArchiveTemplateQuery( $caseStudyIds:[String!], $slug: String!, $skip: Int, $limit: Int) {
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
      slug {
        current
      }
      title
      date(formatString: "Do MMMM YYYY")
      service {
        name
      }
      _rawPerson(resolveReferences: {maxDepth: 10})
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
      _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
  sanityPage(slug: {current: {eq: $slug}}) {
    slug {
      current
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
      ... on SanityNewsletterSection{
        ... NewsletterSectionFragment
      }
    }
  }
}
`
export default CaseStudyArchiveTemplate
