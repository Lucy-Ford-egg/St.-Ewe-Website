import React from "react"
import { graphql } from "gatsby"
import Modules from "../components/modules"
import {Seo} from "../components/seo"
import {IncludePreview} from "../context/includePreview"
import { postQuery } from "../queries/documentQueries"

const PostBuilder = ({ data, pageContext}) => {

  return (
    <>
      { data && 
      <IncludePreview documentQueries={postQuery} slug={data.sanityPost.slug}>
        <Modules allPlace={data.allSanityPlace.nodes} allPost={data.allSanityPost.nodes} modules={data.sanityPost.pageBuilder} pageContext={pageContext}/>
      </IncludePreview>
      }
    </>
  ) 
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPost} location={location} />
}

export const query = graphql`
query($slug: String!) {
  sanityPost( slug: {current: {eq: $slug}}) {
    slug {
      current
    }
    title
    #...SeoPostFragment
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

export default PostBuilder
