import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { motion } from "framer-motion"
import Typography from "@mui/material/Typography"
import { styled, useTheme } from '@mui/material/styles';
import { brandPalette } from "../gatsby-theme-material-ui-top-layout/brandPalette"
import { LuClock5 } from "react-icons/lu";


const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: brandPalette["Original Primary"].value,
  borderRadius: theme.spacing(7),
  cursor: "pointer",
  overflow: 'hidden',
  width: '100%',
  height: 'max-content',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    height: '100%',
  }
}));

const ImageWrapper = styled('div')(({ i, theme }) => ({
  overflow: 'hidden',
  width: '100%',
  display: "flex",
  flexDirection: "column",
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    flexBasis: '100%',
    alignItems: "flex-start",
  }
}
))
const Details = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(7),
  flexDirection: 'column',
  zIndex: 1,
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    flex: '1 0 0',
    alignSelf: 'stretch',
    alignItems: 'flex-start',

  }
}))

const Meta = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  [theme.breakpoints.up('md')]: {
    "& svg": {
      width: 24,
      marginRight:  'var(--modular-scale-ms-1)',
    }

  }
}))

export const RecipeTile = (props) => {
  const [active, setActive] = useState(false)
  const {
    title,
    category,
    duration,
    i,
    slug,
    featuredMedia,
    disableSummary,
    variant,
    _rawInstructions,
    showMeta,
  } = props

  const theme = useTheme()

  const definedcategory = (category && category.name) || (category) && category.name

  const backgroundColor = i % 2 ? "secondary" : "primary"
  const number = i + 1

  return (
    <Link onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} to={`/Recipe/${slug.current}`} style={{ display: "flex", width: "inherit", textDecoration: "none", height: theme.breakpoints.down('sm') ? "100%" : i === 0 ? "721px" : "100%" }} state={{ backgroundColor: backgroundColor, number: number }}>
      <Wrapper
        theme={theme}
      >
        {featuredMedia && (
          <ImageWrapper>
            <motion.div
              initial={{
                transform: `scale(1)`,
              }}
              animate={{
                transform: active ? `scale(1.05)` : `scale(1)`,
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flexBasis: '100%',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                zIndex: 0,
                position: 'relative',
              }}
            >
              <Image
                // pass asset, hotspot, and crop fields
                crop={featuredMedia?.crop}
                hotspot={featuredMedia?.hotspot}
                asset={(featuredMedia?._ref &&
                  urlFor(featuredMedia).width(600).height(600).url()) ||
                  featuredMedia?.asset
                }
                width={disableSummary ? 330 : 330}
                height={disableSummary ? 229 : 229}
                i={i}
                theme={theme}
                style={{

                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </motion.div>
          </ImageWrapper>
        )}
        <Details>

          <Typography variant={variant} component="h3" color="white.main">
            {title}
          </Typography>
          {showMeta && (
            <Meta><LuClock5 /><Typography variant="body1" component="span" color="white.main">
              {`${duration && (duration?.hours + ' hours')} ${duration && duration?.minutes + ' mins'}`}
            </Typography></Meta>
          )}
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
    duration {
      hours
      minutes
    }
    slug {
      current
    }
    _rawInstructions(resolveReferences: { maxDepth: 10 })
  }
`
