import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { styled, useTheme } from '@mui/material/styles';
import { brandPalette } from "../gatsby-theme-material-ui-top-layout/brandPalette"

const Wrapper = styled(Card)(({ theme }) => ({
  backgroundColor: brandPalette["Original Primary"].value,
  borderRadius: theme.spacing(7),
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  
}));

const ImageWrapper = styled(Image)(({i, theme}) => ({
  flexShrink: 0,
  alignSelf: 'stretch',
  height: "229px",
  minHeight: "229px",
  objectFit: "cover",
  width: "100%",
  [theme.breakpoints.up('md')]:{
    height: (i === 0) ? "582px" : "229px",
    minHeight: (i === 0) ? "582px" : "229px",
  }
}
))
const Details = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(7),
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 26,

  flex: '1 0 0',
  alignSelf: 'stretch',
}))

export const RecipeTile = (props) => {

  const {
    title,
    category,
    i,
    slug,
    coverImage,
    disableSummary,
    _rawInstructions
  } = props

  const theme = useTheme()

  const definedcategory = (category && category.name) || (category) && category.name

  const backgroundColor = i % 2 ? "secondary" : "primary"
  const number = i + 1
  return (
    <Link to={`/Recipe/${slug.current}`} style={{ display: "block", width: "inherit", textDecoration: "none", height: theme.breakpoints.down('sm') ? "auto" : i === 0 ? "721px" : "100%"}} state={{ backgroundColor: backgroundColor, number: number }}>
      <Wrapper
      theme={theme}
        elevation={0}
        square
      >
        {coverImage && (

          <ImageWrapper
            // pass asset, hotspot, and crop fields
            crop={coverImage?.crop}
            hotspot={coverImage?.hotspot}
            asset={(coverImage?._ref &&
              urlFor(coverImage).width(300).height(300).url()) ||
              coverImage?.asset
            }
            width={disableSummary ?  300 : 300}
            height={disableSummary ? 300 : 300}
            i={i}
            theme={theme}
          />

        )}
        <Details>

        <Typography variant="h6" component="h3" color="white.main">
          {title}
        </Typography>
</Details>
      </Wrapper>
    </Link>
  )
}

export const query = graphql`
  fragment RecipeTileFragment on SanityRecipes {
    featuredMedia {
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
    title
    category {
      name
    }
    slug {
      current
    }
    _rawInstructions(resolveReferences: { maxDepth: 10 })
  }
`
