import React from "react"
import { graphql } from "gatsby"

import Modules from "../components/modules"
import {Seo} from "../components/seo"

const FeaturesPageBuilder = ({ data, pageContext }) => {
debugger
  return (
    <>
      { data && <Modules pageContext={pageContext} allFeature={data.allSanityFeature.nodes} allPlace={data.allSanityPlace.nodes} allPost={data.allSanityPost.nodes} modules={data.sanityPage.pageBuilder}/>}
    </>
  ) 
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPage} location={location} />
}

export const query = graphql`

query ($skip: Int!, $limit: Int!, $slug: String!) {
  sanityPage( slug: {current: {eq: $slug}}) {
    slug {
      current
    }
    title
    ...SeoPageFragment
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
  allSanityFeature(
    sort: {_createdAt: DESC}
    skip: $skip 
    limit: $limit 
  ) {
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
      ...SeoPostFragment
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
    }
    }
  }
  allSanityPlace {
    nodes {
      title
      slug {
        current
      }
      coverImage {
        asset {
          gatsbyImageData(width: 525, height: 323)
          altText
        }
      }
      displayTitle {
        _rawChildren(resolveReferences: {maxDepth: 10})
      }
      date(formatString: "M MMM YYYY")
      categories: placeCategories {
        name
      }
      excerpt
    }
  }
  allSanityFeature {
    nodes {
      title
      slug {
        current
      }
      coverImage {
        asset {
          gatsbyImageData(width: 525, height: 323)
          altText
        }
      }
      date(formatString: "M MMM YYYY")
      categories {
        name
      }
      excerpt
    }
  }
}
`

export default FeaturesPageBuilder
