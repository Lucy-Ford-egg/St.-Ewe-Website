import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Modules from "../utils/modules"

export default function PageBuilder({ data }) {
 
  return (
    <Layout>
      <Modules modules={data.sanityPage.pageBuilder}/>
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
          ... CarouselFragment
          }
        }
      }
    }
  }
`