import React, {useEffect, useState} from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"

//Preview
import { useQuery } from "../../sanity/store"
import { PAGE_QUERY } from "../queries/documentQueries"
import { getSanityClient } from "../../sanityUtils/sanity"

const CaseStudyArchiveTemplate = props => {
  const { data, pageContext, initial } = props
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

   // Preview
   const { data: previewData, sourceMap } = useQuery(
    PAGE_QUERY,
    { slug: data.sanityPage.slug.current },
    { initial },
  )

  return (

      <Modules
        previewData={previewData?.pageBuilder}
        allSanityCaseStudy={data.allSanityCaseStudy}
        pageContext={pageContext}
        modules={modules}
      />
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
      coverImage {
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
      ...PageBuilderFragment
    }
  }
}
`
export default CaseStudyArchiveTemplate
