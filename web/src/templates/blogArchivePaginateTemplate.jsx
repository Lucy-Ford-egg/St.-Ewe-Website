import React, {useEffect, useState} from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
import { pageQuery } from "./queries/documentQueries"

const BlogArchiveTemplate = props => {
  const { data, pageContext } = props
  const [posts, setPosts] = useState(null)
  const [modules, setModules] = useState(null)

  

  useEffect(() => {
    setPosts(data.allSanityPost)
    setModules(data?.sanityPage?.pageBuilder)   
  }, [data, modules])

  const blogModule = {
    _key: "",
    _type: "blogSection",
    posts:  data.allSanityPost,    
   }   
   modules && modules.splice(1, 0, blogModule) 


  return (
    <IncludePreview
      documentQueries={pageQuery}
      slug={data.sanityPage.slug} //
      data={data}
    >
      {posts && modules && 
      <Modules
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

export const blogArchiveTemplateQuery = graphql`
query blogArchiveTemplateQuery($slug: String!, $postIds:[String!]) {
  allSanityPost(
    filter: {
      category: {
        _id: {
          in: $postIds
        }
      }
    }
    #skip: $skip 
    #limit: $limit 
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
    showArchive {
      setArchive
      archive {
        _id
        name
      }
    }
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
      ... on SanityBlogSection {
        ... BlogSectionFragment
      }
    }
  }
}
`
export default BlogArchiveTemplate
