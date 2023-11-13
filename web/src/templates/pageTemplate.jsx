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
debugger
  const filteredPosts = {
    nodes: data.allSanityPost.nodes.filter((node) => node.category._id === data.sanityPage.categoryArchive?._id
  )
}
  
  const blogModule = {
    _key: "",
    _type: "blogArchiveSection",
    posts:  hasCategory ? filteredPosts : data.allSanityPost,    
}

  if(isBlog || hasCategory){
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
    categoryArchive {
      name
      _id
    }
    blogArchive
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
