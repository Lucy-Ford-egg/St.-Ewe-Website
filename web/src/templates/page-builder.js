import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Modules from "../utils/modules"

export default function PageBuilder({ data }) {


  // const modules = data.sanityPage.pageBuilder(() => {
    
  // })
 
  return (
    <Layout>
      <div>
        <Modules modules={data.sanityPage.pageBuilder}/>
       
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    sanityPage(slug: {current: {eq: $slug}}) {
      title
      slug {
        current
      }
      pageBuilder {
        ... on SanityImageCarouselSubtitleTitleTextLink {
          _key
          _type
          carousel {
            title
            text
            subtitle
            image {
              asset {
                gatsbyImageData(width: 1440, height: 765)
              }
            }
          }
        }
      }
    }
  }
`