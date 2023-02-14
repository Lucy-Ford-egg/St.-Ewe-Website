import React from "react"
import { graphql } from "gatsby"
import {Container} from "@mui/material"
import Layout from "../components/layout"
import Modules from "../utils/modules"
import {TitleSubtitleText} from "../components/titleSubtitleText"

export default function BlogPost({ data, moduleSpacing  }) {
 
  return (
    <Layout>
      
      <Container maxWidth="xl" sx={{ pt: { xs: 9 } }}>
        <TitleSubtitleText title={data.sanityPost.title} subtitle={data.sanityPost.category?.name} text={data.sanityPost?.excerpt} titleSize="h1" subtitlePosition={true} titleWidth="100%" adornment={true}/>
      </Container>
      
      <Modules allPost={data.allSanityPost.nodes} modules={data.sanityPost?.pageBuilder}/>
    
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    sanityPost(slug: {current: {eq: $slug}}) {
      title
      categories{
        name
      }
      excerpt
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
        ... on SanityImageCarouselCaptionLink{
          _key
          _type 
          ... GalleryCarouselFragment
        }
        ... on SanityHeroCallToAction{
          _key
          _type
          ...HeroCallToActionFragment
        }
        ... on SanityHeroNewsletter{
          _key
          _type
          ...HeroNewsletterFragment
        }
        ... on SanityPostsGrid {
          _key
          _type
          ... PostsGridFragment
        }
        ... on SanityTwoColumnTitleTextCta {
          _key
          _type
          ... MultiColumnTitleTextLinkFragment
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
    allSanityPost {
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