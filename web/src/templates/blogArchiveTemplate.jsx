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
  const [blogInserted, setBlogInserted] = useState(null)
  
  let i = 0

  useEffect(() => {
    setPosts(data.allSanityPost)
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
      {posts && modules && 
      <Modules
        allSanityPost={data.allSanityPost}
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
query blogArchiveTemplateQuery( $postIds:[String!], $slug: String!, $skip: Int, $limit: Int) {
  allSanityPost(
    filter: {
      category: {
        _id: {
          in: $postIds
        }
      }
    }
    skip: $skip 
    limit: $limit 
  ) {
    nodes {
      navOverlay
      navColor {
        value
      }
      author {
        name
      }
      slug {
        current
      }
      title
      date(formatString: "MMM Do, YYYY")
      category {
        name
      }
      tileColor {
        value
        label
      }
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
    }
  }
  sanityPage(slug: {current: {eq: $slug}}) {
    slug {
      current
    }
    navOverlay
    navColor {
      value
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
     
    }
  }
}
`
export default BlogArchiveTemplate
