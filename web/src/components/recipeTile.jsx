import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { motion } from "framer-motion"
import Typography from "@mui/material/Typography"
import { styled, useTheme } from '@mui/material/styles';
import { contrastBrandPalette } from "../utils/colours"
import { LuClock5 } from "react-icons/lu";


const Wrapper = styled('div')(({ theme, backgroundColour }) => ({
  backgroundColor: contrastBrandPalette[backgroundColour?.label]?.contrastBase,
  borderRadius: theme.spacing(7),
  cursor: "pointer",
  overflow: 'hidden',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',

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
const Details = styled('div')(({ theme, backgroundColour }) => ({
  display: 'flex',
  padding: theme.spacing(7),
  flexDirection: 'column',
  zIndex: 1,
  position: 'relative',
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  flex: '1 0 0',
  alignSelf: 'stretch',
    alignItems: 'flex-start',
  [theme.breakpoints.up('md')]: {
    flex: '1 0 0',
    alignSelf: 'stretch',
    alignItems: 'flex-start',

  }
}))

const Meta = styled('div')(({ theme, backgroundColour }) => ({
  display: 'flex',
  alignItems: 'center',
  color: contrastBrandPalette[backgroundColour?.label]?.contrastText,
  [theme.breakpoints.up('md')]: {
    "& svg": {
      width: 24,
      marginRight:  'var(--ms-1)',
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
    backgroundColour,
  } = props

  const theme = useTheme()

  return (
    <Link onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} to={`/recipe/${slug.current}`} style={{ display: "flex", width: "inherit", textDecoration: "none", height: theme.breakpoints.down('sm') ? "100%" : i === 0 ? "721px" : "100%" }}>
      <Wrapper
        backgroundColour={backgroundColour}
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
        <Details backgroundColour={backgroundColour}>

          <Typography variant={variant} component="h3" color="white.main">
            {title}
          </Typography>
          {showMeta && (
            <Meta backgroundColour={backgroundColour}><LuClock5 /><Typography variant="body1" component="span" color="white.main">
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
