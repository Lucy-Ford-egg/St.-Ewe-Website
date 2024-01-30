import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
import {useTheme} from '@mui/material'
import { UnitCarousel } from "../components/unitCarousel"
import { PropertyHeader } from "../components/propertyHeader"

//Preview
import { useQuery } from "../../sanity/store";
import {UNIT_QUERY} from '../queries/documentQueries'
import {getSanityClient } from "../../sanityUtils/sanity"


const UnitTemplate = props => {
  const { data, pageContext, sanityConfig, location, initial } = props
  const theme = useTheme()

  // Preview
  const { data: previewData, sourceMap } = useQuery(
    UNIT_QUERY,
    {slug: data.sanityUnit.slug.current},
    { initial }
  );

  return (
   <>
      <UnitCarousel sanityConfig={getSanityClient} previewData={previewData} tiles={data.sanityUnit.unitImages}/>
      <PropertyHeader sanityConfig={getSanityClient} previewData={previewData} title={pageContext.title} summary={pageContext.summary} unitId={pageContext.unitId} extendedSummary={pageContext.extendedSummary} links={pageContext.links}/>
      <Modules
        sanityConfig={getSanityClient}
        previewData={previewData?.pageBuilder}
        pageContext={pageContext}
        modules={data?.sanityUnit?.pageBuilder}
      />
      </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityUnit} location={location} />
}

export const pageTemplateQuery = graphql`
 query unitTemplateQuery($slug: String!) {
   sanityUnit( slug: {current: {eq: $slug}}) {
      slug {
        current
      }
      title: name
      date(formatString: "Do MMMM YYYY")
      #category {
      #  name
      #}
      unitImages {
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
      #_rawBody(resolveReferences: {maxDepth: 10})
      #...SeoPageFragment
      pageBuilder {
        ... on SanityHeaderSectionAccommodationSearch {
          _key
          _type
          ...HeaderSectionAccommodationSearchFragment
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
      }
    }
  }
`
export default UnitTemplate
