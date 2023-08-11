import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"

import Modules from "../components/modules"

const IndexPage = ({ data }) => (
  
    <Modules
      allPlace={data.allSanityPlace.nodes}
      modules={data.sanityPage.pageBuilder}
    />

)

export const Head = ({ data, location }) => {
  return <Seo pageContext={data.sanityPage} location={location} />
}

export const query = graphql`
  query {
    sanityPage(slug: { current: { eq: "homepage" } }) {
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
            ...CarouselFragment
          }
        }
        ... on SanityPlacesGrid {
          _key
          _type
          ...PlacesGridFragment
        }
        ... on SanityImageWithCaption {
          _key
          _type
          ...ImageCaptionFragment
        }
        ... on SanityTextBlock {
          _key
          _type
          ...TextFragment
        }
        ... on SanityImageCarouselCaptionLink {
          _key
          _type
          ...GalleryCarouselFragment
        }
        ... on SanityHeroCallToAction {
          _key
          _type
          ...HeroCallToActionFragment
        }
        ... on SanityHeroNewsletter {
          _key
          _type
          ...HeroNewsletterFragment
        }
        ... on SanityPostsGrid {
          _key
          _type
          ...PostsGridFragment
        }
        ... on SanityTwoColumnTitleTextCta {
          _key
          _type
          ...MultiColumnTitleTextLinkFragment
        }
        ... on SanityMap {
          _key
          _type
          ...MapFragment
        }
        ... on SanityCategoryFeature {
          _key
          _type
          ...CategoryFeatureFragment
        }
        ... on SanityHeroInfoCallToAction {
          _key
          _type
          ...HeroInfoCallToActionFragment
        }
        ... on SanityImageTextCallToActionImage {
          _key
          _type
          ...ImageTextCallToActionImage
        }
        ... on SanityImageWithLink {
          _key
          _type
          ...ImageLinkFragment
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
export default IndexPage