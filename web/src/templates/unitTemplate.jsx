import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
import { pageQuery } from "./queries/documentQueries"

import {Container, Grid, useTheme, Box, Typography, Divider} from '@mui/material'
import Image from "gatsby-plugin-sanity-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { UnitCarousel } from "../components/unitCarousel"
import { RenderPortableText } from "../components/renderPortableText"
import { CategoryLabel } from "../components/categoryLabel"
import { Icons } from "../components/icons"
import { PropertyHeader } from "../components/propertyHeader"

const UnitTemplate = props => {
  const { data, pageContext, previewData, sanityConfig } = props
  const theme = useTheme()
  return (
    <IncludePreview
      documentQueries={pageQuery}
      slug={data.sanityUnit.slug} //
      data={data}
    >
      <UnitCarousel previewData={previewData} sanityConfig={sanityConfig} tiles={data.sanityUnit.unitImages}/>
      <PropertyHeader previewData={previewData} sanityConfig={sanityConfig} title={pageContext.title} summary={pageContext.summary} unitId={pageContext.unitId} extendedSummary={pageContext.extendedSummary} links={pageContext.links}/>
      <Modules
        pageContext={pageContext}
        modules={data?.sanityUnit?.pageBuilder}
      />
    </IncludePreview>
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
      }
    }
  }
`
export default UnitTemplate
