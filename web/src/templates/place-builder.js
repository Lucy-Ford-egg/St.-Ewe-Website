import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Modules from "../components/modules"

export default function PlaceBuilder({ data }) {
 
  return (
    <Layout>
      
      <Modules allPlace={data.allSanityPlace.nodes} modules={data.sanityPlace?.pageBuilder} placeLocation={data.sanityPlace.location}/>
    
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    sanityPlace(slug: {current: {eq: $slug}}) {
      excerpt
      placeCategories{
        name
      }
      location{
        name
        country
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
        ... on SanityTitleSubtitleText {
          _key
          _type
          ...TitleSubtitleTextFragment
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
        ... on SanityInstagramModule {
          _key
          _type
          ... InstagramEmbedFragment
       
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
        displayTitle {
          _rawChildren(resolveReferences: {maxDepth: 10})
        }
        date(formatString: "M MMM YYYY")
        categories: placeCategories {
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