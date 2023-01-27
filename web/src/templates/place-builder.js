import React from "react"
import { graphql } from "gatsby"
import {Container} from "@mui/material"
import Layout from "../components/layout"
import Modules from "../utils/modules"
import {TitleSubtitleText} from "../components/titleSubtitleText"

export default function PlaceBuilder({ data, moduleSpacing  }) {
 
  return (
    <Layout>
      
      <Container maxWidth="xl" sx={{ pt: { xs: 9 } }}>
        <TitleSubtitleText title={data.sanityPlace.title} subtitle={data.sanityPlace.location.name} text={data.sanityPlace.excerpt} titleSize="h1" subtitlePosition={true} titleWidth="100%" adornment={true}/>
      </Container>
      
      <Modules allPlace={data.allSanityPlace.nodes} modules={data.sanityPlace?.pageBuilder}/>
    
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    sanityPlace(slug: {current: {eq: $slug}}) {
      title
      excerpt
      categories{
        name
      }
      location{
        name
      }
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
        ... on SanityImageWithCaption {
          _key
          _type
          ... ImageCaptionFragment
        }
        ... on SanityTextBlock{
          _key
          _type
          ... TextFragment
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