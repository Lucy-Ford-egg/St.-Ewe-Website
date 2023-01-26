import React, { useState } from 'react'
import { graphql, Link } from "gatsby"
import { motion } from "framer-motion"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, CardActions, CardContent, Box, Button, Typography } from '@mui/material';
import clientTheme from '../gatsby-theme-material-ui-top-layout/theme'

export const PlaceTile = ({ categories, title, image, excerpt, date, to }) => {

  const [hovered, setHovered] = useState(false)

  const renderTaxonomies = (categories) => {
   
    const taxonomies = categories?.map((tax, i ) => {
      return( 
        tax.name
      )
    })
    return(
      taxonomies && taxonomies.join(', ')
    )
  }

  const variants = {
    hovered: { opacity: 1, y: 0, height: 'auto' },
    unhovered: { opacity: 0, y: -10, height: 0 },
  }

  const textColour = {
    hovered: { color: clientTheme.palette.white.main },
    unhovered: { color: clientTheme.palette.text.main },
  }

  const cardBody = {
    hovered: {   backgroundColor: clientTheme.palette.primary.main, flexGrow: 4 },
    unhovered: {  backgroundColor: clientTheme.palette.white.main},
  }

  const featuredImageWrapper = {
    hovered: { 
      overflow: 'hidden', 
      display: 'flex',
    },
    unhovered: {
      overflow: 'hidden', 
      display: 'flex', 
    },
  }

  return (
    <Link to={to} style={{textDecoration: 'none'}}>
    <Card elevation={0} sx={{ cursor: 'pointer', maxWidth: 525, display: 'flex', flexDirection: 'column', height: {xs: 'auto', md: 614} }} square onMouseEnter={e => setHovered(true)} onMouseLeave={e => setHovered(false)}>
      <motion.div style={{flexGrow: 1 }} animate={hovered ? "hovered" : "unhovered"}
        variants={featuredImageWrapper}>
          <GatsbyImage style={{transform: hovered ? 'scale(1.1) translateY(-10px)' : 'scale(1) translateY(0px)', transition: 'all 0.2s ease-in-out 0s'}} image={getImage(image)} alt={image.alt} />
      </motion.div>
      <motion.div style={{flexGrow: 1 }} animate={hovered ? "hovered" : "unhovered"}
        variants={cardBody}>
        <CardContent sx={{ px: { xs: 0, md: 5 }, pt: { xs: 6, md: 6 }}}>
         
          <motion.div animate={hovered ? "hovered" : "unhovered"} variants={textColour}>
            <Box display="flex" justifyContent="space-between" >
              <Typography variant="subtitle1" sx={{ textDecoration: 'none', color: "inherit" }}>{renderTaxonomies(categories)}</Typography>
              <Typography variant="subtitle1" sx={{ textDecoration: 'none', color: "inherit" }}>{date}</Typography>
            </Box>
          </motion.div>
          

          <Typography variant="h3" component="h4" sx={{ textDecoration: 'none', py: { xs: 3, md: 4 } }}>
            {title}
          </Typography>
          <Box sx={{display: {xs: 'none', md: 'block'}}}>
            <motion.div animate={hovered ? "hovered" : "unhovered"}
              variants={variants}>
              <Typography variant="body1" color="text.main" sx={{ textDecoration: 'none', py: { xs: 3, md: 4 } }}>
                {excerpt}
              </Typography>
            </motion.div>
          </Box>

          <Box sx={{display: {xs: 'block', md: 'none'}}}>
              <Typography variant="body1" color="text.main" style={{textDecoration: 'none'}}>
                {excerpt}
              </Typography>
          </Box>

        </CardContent>
        <CardActions sx={{ px: { xs: 0, md: 5 }, pt: 0, pb: { xs: 8, md: 9 } }}>
          <Button variant="contained" to={to} component={Link} size="small" sx={{ color: hovered ? "primary.main" : "white", backgroundColor: hovered ? "white !important" : "primary.main", transition: 'all 0.2s ease-in 0s' }}>Read More</Button>
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