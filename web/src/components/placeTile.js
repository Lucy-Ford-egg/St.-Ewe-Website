import React, { useState } from 'react'
import { graphql, Link } from "gatsby"
import { motion } from "framer-motion"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, CardActions, CardContent, Box, Button, Typography } from '@mui/material';
import clientTheme from '../gatsby-theme-material-ui-top-layout/theme'

export const PlaceTile = ({ category, title, image, excerpt, date, to }) => {

  const [hovered, setHovered] = useState(false)
  // const [textHeight, setTextHeight] = useState(null)

  // useEffect(() => {
  //   setTextHeight()
  // }, [])
  

  const variants = {
    hovered: { opacity: 1, y: 0, height: 'auto' },
    unhovered: { opacity: 0, y: -10, height: 0 },
  }

  const cardBody = {
    hovered: { height: 'auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', bottom: 0, backgroundColor: clientTheme.palette.primary.main },
    unhovered: { height: 'auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', bottom: 0, backgroundColor: clientTheme.palette.white.main },
  }

  const featuredImage = {
    hovered: { transform: 'scale(1.5)', overflow: 'hidden' },
    unhovered: { transform: 'scale(1)', overflow: 'hidden' },
  }

  return (
    <Card sx={{ cursor: 'pointer', maxWidth: 525 }} square onMouseEnter={e => setHovered(true)} onMouseLeave={e => setHovered(false)}>
      <motion.div animate={hovered ? "hovered" : "unhovered"}
        variants={featuredImage}>
          <GatsbyImage  image={getImage(image)} alt="alt tag" />
      </motion.div>
      <motion.div animate={hovered ? "hovered" : "unhovered"}
        variants={cardBody}>
        <CardContent sx={{ px: { xs: 5, md: 5 }, pt: { xs: 6, md: 6 }, height: "100%"}}>
          <Box display="flex" justifyContent="space-between" >
            <Typography variant="subtitle1" sx={{ color: hovered ? "#ffffff" : "text.main", transition: 'all 0.2s ease-in 0s' }}>{category}</Typography>
            <Typography variant="subtitle1" sx={{ color: hovered ? "#ffffff" : "text.main", transition: 'all 0.2s ease-in 0s' }}>{date}</Typography>
          </Box>

          <Typography variant="h2" component="h4" sx={{ py: { xs: 3, md: 6 } }}>
            {title}
          </Typography>
          <motion.div animate={hovered ? "hovered" : "unhovered"}
            variants={variants}>
            <Typography variant="body2" color="text.main">
              {excerpt}
            </Typography>
          </motion.div>
        </CardContent>
        <CardActions sx={{ px: { xs: 5, md: 5 }, pb: { xs: 8, md: 9 } }}>
          <Button variant="contained" to={to} component={Link} size="small" sx={{ color: hovered ? "primary.main" : "white", backgroundColor: hovered ? "white !important" : "primary.main", transition: 'all 0.2s ease-in 0s' }}>Read More</Button>
        </CardActions>
      </motion.div>
    </Card>
  )

}

export const query = graphql`
  fragment PlaceFragment on SanityPlacesGrid {
    _key
    _type
    reference {
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