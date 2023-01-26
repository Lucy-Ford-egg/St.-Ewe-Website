import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Modules from "../utils/modules"

export default function PageBuilder({ data }) {
 
  return (
    <Layout>
      <Modules allPlace={data.allSanityPlace.nodes} modules={data.sanityPage.pageBuilder}/>
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
        ... on SanityPlacesGrid {
          _key
          _type
          ... PlacesGridFragment
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
        categories {
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