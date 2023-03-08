import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Modules from "../utils/modules"

export default function PageBuilder({ data }) {
 
  return (
    <Layout>
      <Modules allPlace={data.allSanityPlace.nodes} allPost={data.allSanityPost.nodes} modules={data.sanityPage.pageBuilder}/>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    sanityPage(slug: {current: {eq: $slug}}) {
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
        ... on SanityInstagramEmbed {
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
        displayTitle {
          _rawChildren(resolveReferences: {maxDepth: 10})
        }
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