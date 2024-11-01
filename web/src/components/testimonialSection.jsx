import React, { useState } from "react"
import { graphql } from "gatsby"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material"

export const TestimonialSection = props => {
  const theme = useTheme()
  const { testimonialTile, backgroundColor, _type } = props

  return <Box></Box>
}

export const query = graphql`
  fragment TestimonialSectionFragment on SanityTestimonialSection {
    _key
    _type
    backgroundColour {
      label
      value
    }
    verticalSpace {
      bottomPadding
      topPadding
    }
    leftAsset {
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
    rightAsset {
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
    testimonialTile {
      _rawQuoteText(resolveReferences: { maxDepth: 10 })
      cite {
        citeName
        citeLocation
        image {
          asset {
            _id
            gatsbyImageData
            _key
            _type
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
    }
  }
`
