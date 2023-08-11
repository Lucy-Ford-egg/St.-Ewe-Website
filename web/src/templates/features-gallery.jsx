import React from "react"
import { graphql } from "gatsby"

import Modules from "../components/modules"
import { Seo } from "../components/seo"

export default function FeaturesGallery({ data, moduleSpacing, pageContext  }) {

  return (
    <>
     
      <Modules 
        allFeature={data.allSanityFeature.nodes} 
        posts={pageContext?.posts} 
        allPost={pageContext?.posts} 
        modules={data.sanityPage?.pageBuilder} 
        pageContext={pageContext}/>
     
    </>
  )
}

export const Head = () => (
  <Seo title={`Features Gallery Page`} description={`Description of the features gallery page`}/>
)

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allSanityFeature(sort: { date: DESC }
      limit: $limit
      skip: $skip) {
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
    sanityPage(slug: {current: {eq: "features-gallery"}}) {
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
        ... on SanityFeatureGrid {
          _key
          _type
          ... FeaturesGridFragment
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
      }
    }
  }
`