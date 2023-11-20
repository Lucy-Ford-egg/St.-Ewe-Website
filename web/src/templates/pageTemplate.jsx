import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
import { pageQuery } from "./queries/documentQueries"

const PageTemplate = props => {
  const { data, pageContext } = props
debugger
  //const isBlog = data.sanityPage.blogArchive || null
  const hasCategoryArchive = data.sanityPage.archive?._id || null

  const filteredPosts = {
    nodes: data.allSanityPost.nodes.filter((node) => node.category._id === data.sanityPage.archive?._id
  )
}
  
  const blogModule = {
    _key: "",
    _type: "blogArchiveSection",
    posts:  hasCategoryArchive ? filteredPosts : data.allSanityPost,    
}

  if(hasCategoryArchive){
      data?.sanityPage?.pageBuilder.splice(1, 0, blogModule)
  }
  
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
query pageTemplateQuery($slug: String!, $postIds:[String!]) {
  allSanityPost(
    filter: {category: {_id: {in: $postIds}}}
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
    archive {
      name
      _id
    }
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
    }
  }
}
`
export default PageTemplate
