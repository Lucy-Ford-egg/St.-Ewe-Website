import * as React from "react"
import { graphql } from "gatsby"
import {Seo} from "../components/seo"
import Layout from "../components/layout"
import Modules from "../utils/modules"

const IndexPage = ({ data }) => (
  <Layout>
    <Modules modules={data.sanityPage.pageBuilder}/>
  </Layout>
)

export default IndexPage

export const Head = () => (
    <Seo />
)

export const query = graphql`
  query {
    sanityPage(slug: {current: {eq: "homepage"}}) {
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
        ... on SanityPlacesGrid {
          _key
          _type
          ... PlacesGridFragment
        }
      }
    }
  }
`