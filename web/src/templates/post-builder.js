import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Modules from "../components/modules"

export default function BlogPost({ data, moduleSpacing, pageContext  }) {

  return (
    <Layout>
    
      <Modules modules={data.sanityPost.pageBuilder} pageContext={pageContext}/>
      
    </Layout>
  )
}

export const query = graphql`
  query( $slug: String!) {
    sanityPost(slug: {current: {eq: $slug}}) {
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
        ... on SanityMap{
          _key
          _type
          ... MapFragment
        }
        ... on SanityCategoryFeature{
          _key
          _type
          ... CategoryFeatureFragment
        }
        ... on SanityHeroInfoCallToAction {
          _key
          _type
          ... HeroInfoCallToActionFragment
        }
        ... on SanityImageTextCallToActionImage {
          _key
          _type
          ... ImageTextCallToActionImage
        }
        ... on SanityImageWithLink {
          _key
          _type
          ... ImageLinkFragment

        }
      }
    }
  }
`