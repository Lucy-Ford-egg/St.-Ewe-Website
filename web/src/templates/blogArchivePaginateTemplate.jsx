import React, {useEffect, useState} from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"

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
    <>
      {posts && modules && 
      <Modules
        pageContext={pageContext}
        modules={modules}
      />
}
    </>
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
      ...PageBuilderFragment
    }
  }
}
`
export default BlogArchiveTemplate
