import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
import { pageQuery } from "./queries/documentQueries"

const PageTemplate = props => {
  const { data, pageContext } = props
  return (
    <IncludePreview
      documentQueries={pageQuery}
      slug={data.sanityPage.slug} //
      data={data}
    >
      <Modules
        pageContext={pageContext}
        modules={data?.sanityPage?.pageBuilder}
      />
    </IncludePreview>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const pageTemplateQuery = graphql`
 query pageTemplateQuery($slug: String!) {
   sanityPage( slug: {current: {eq: $slug}}) {
      slug {
        current
      }
      pageTitle
      #...SeoPageFragment
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
      }
    }
    allSanityPlace {
      nodes {
        coverImage {
          asset {
            gatsbyImageData(width: 525, height: 323)
          }
        }
        title

        date(formatString: "M MMM YYYY")
        categories: placeCategories {
          name
        }
        slug {
          current
        }
        excerpt
      }
    }
  }
`
export default PageTemplate
