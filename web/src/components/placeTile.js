import React, { useState } from 'react'
import { graphql, Link } from "gatsby"
import { motion } from "framer-motion"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, CardActions, CardContent, Box, Button, Typography } from '@mui/material';
import clientTheme from '../gatsby-theme-material-ui-top-layout/theme'
import { renderTaxonomies } from '../utils/metaDataHelpers';

export const PlaceTile = ({ categories, title, image, excerpt, date, to }) => {

  const [hovered, setHovered] = useState(false)

  const variants = {
    hovered: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        type: "spring",
        bounce: 0
      }
    },
    unhovered: {
      opacity: 0,
      y: -10,
      height: 0,
    },
  }

  const textColour = {
    hovered: {
      color: clientTheme.palette.white.main
    },
    unhovered: {
      color: clientTheme.palette.text.main
    },
  }

  const cardBodyColour = {
    hovered: {
      backgroundColor: clientTheme.palette.primary.main,
    },
    unhovered: {
      backgroundColor: clientTheme.palette.white.main,
    },
  }

  const cardBody = {
    hovered: {
      display: 'flex',
      flexBasis: '75%',
      transition: {
        type: "spring",
        bounce: 0
      }
    },
    unhovered: {
      display: 'flex',
      flexBasis: '50%',
    },
  }

  const featuredImageWrapper = {
    hovered: {
      overflow: 'hidden',
      display: 'flex',
      flexBasis: '25%',
      transition: {
        type: "spring",
        bounce: 0
      }
    },
    unhovered: {
      overflow: 'hidden',
      display: 'flex',
      flexBasis: '50%',
    },
  }

  return (
    <Link to={`/places/${to}`} style={{ textDecoration: 'none' }}>
      <Card elevation={0} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', maxHeight: { xs: 'auto', md: 578 } }} square onMouseEnter={e => setHovered(true)} onMouseLeave={e => setHovered(false)}>
        <motion.div style={{}} animate={hovered ? "hovered" : "unhovered"}
          variants={featuredImageWrapper}>
          {image && <GatsbyImage style={{ transform: hovered ? 'scale(1) translateY(-10px)' : 'scale(1.2) translateY(0px)', transition: 'all 0.2s ease-in-out 0s', width: "100%", height: '100%' }} image={getImage(image)} alt={image?.altText} />}
        </motion.div>

        <motion.div style={{ position: "relative" }} animate={hovered ? "hovered" : "unhovered"}
          variants={cardBodyColour}>

          <motion.div style={{ }} animate={hovered ? "hovered" : "unhovered"}
            variants={cardBody}>
            <CardContent sx={{ px: { xs: 5, md: 5 }, pt: { xs: 6, md: 6 } }}>

              <motion.div animate={hovered ? "hovered" : "unhovered"} variants={textColour}>
                <Box display="flex" justifyContent="space-between" >
                  <Typography component="p" variant="subtitle1" sx={{ textDecoration: 'none', color: "inherit" }}>{categories && renderTaxonomies(categories)}</Typography>
                  <Typography component="p" variant="subtitle1" sx={{ textDecoration: 'none', color: "inherit" }}>{date}</Typography>
                </Box>
              </motion.div>


              <Typography variant="h3" component="h4" sx={{ minHeight: {xs: 'min-content', md: 'min-content' }, textDecoration: 'none', py: { xs: 3, md: 4 } }}>
                {title}
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'block', maxHeight: {xs: 100}, overflow: 'hidden' } }}>
                <motion.div animate={hovered ? "hovered" : "unhovered"}
                  variants={variants}>
                  <Typography variant="body1" color="text.main" sx={{ minHeight: {xs: 'min-content', md: 112}, textDecoration: 'none', py: { xs: 3, md: 4 } }}>
                    {excerpt}
                  </Typography>
                </motion.div>
              </Box>

              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Typography variant="body1" color="text.main" style={{ textDecoration: 'none' }}>
                  {excerpt}
                </Typography>
              </Box>
            </CardContent>
          </motion.div>

          <CardActions sx={{ px: { xs: 5, md: 5 }, pt: 0, pb: { xs: 8, md: 9 }, }}>
            <Button variant="contained" to={`/places/${to}`} component={Link} size="small" sx={{ color: hovered ? "primary.main" : "white", backgroundColor: hovered ? "white !important" : "primary.main", transition: 'all 0.2s ease-in 0s', textAlign: 'center' }}>Read More</Button>
          </CardActions>
          

        </motion.div>

      </Card>
    </Link>
  )

}

export const query = graphql`
  fragment PlaceFragment on SanityPlacesGrid {
    _key
    _type
    places {
      coverImage {
        asset {
          gatsbyImageData(width: 525, height: 323)
          altText
        }
      }
      title
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
`