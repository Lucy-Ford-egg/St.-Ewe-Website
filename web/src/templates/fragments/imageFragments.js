import { graphql } from "gatsby"

export const pageBuilderQuery = graphql`
  fragment ImageFragment on SanityImage {
    asset {
      _id
      gatsbyImageData
    }
    hotspot {
      x
      y
      width
      height
    }
    crop {
      bottom
      left
      right
      top
    }
  }

  fragment SeasonalImageFragment on SanitySeasonalIllustrations {
    layers {
      asset {
        _id
        gatsbyImageData
      }
      hotspot {
        x
        y
        width
        height
      }
      crop {
        bottom
        left
        right
        top
      }
    }
  }
`
