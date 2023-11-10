import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
import { pageQuery } from "./queries/documentQueries"

const PageTemplate = props => {
  const { data, pageContext } = props

  const isBlog = data.sanityPage.blogArchive || null
  const hasCategory = data.sanityPage.categoryArchive?.name || null

  const blogModule = {
    _key: "",
    _type: "blogArchiveSection",
    posts: pageContext.blogPosts,    
}

  data?.sanityPage?.pageBuilder.splice(1, 0, blogModule)

  debugger
  return (
    <IncludePreview
      documentQueries={pageQuery}
      slug={data.sanityPage.slug} //
      data={data}
    >
      <Modules
        // isBlog={isBlog}
        // hasCategory={hasCategory}
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
      categoryArchive {
        name
      }
      blogArchive
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
        ... on SanityImageCarouselSection {
          ...ImageCarouselSectionFragment 
        }
        ... on SanityLocationSection {
          ...LocationSectionFragment
        } 
        ... on SanityFaqsSection {
          ...FaqsSectionFragment
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
