import React, { useState } from 'react'
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Grid, Box, Typography } from '@mui/material'
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme"
import { motion } from "framer-motion"

export const CategoryFeatureTile = ({ node, i }) => {

  const [showOverlay, setShowOverlay] = useState(false)

  const overlay = {
    hidden: {
      y: 240,
      
    },
    visible:{
      y: 0,
     
    }
  }

  return (
    <Grid onMouseOver={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)} key={`column-${i}`} item xs={12} md={4} sx={{
      overflow: 'hidden', height: 374, position: 'relative', display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr', '&:hover': {
        cursor: 'pointer'
      }
    }}>
      <Box sx={{ position: 'relative', zIndex: 0, gridColumn: '1/2', gridRow: '1/2' }}>
        <GatsbyImage image={getImage(node.picture?.asset.gatsbyImageData)} />
      </Box>
      <motion.div initial="hidden" animate={showOverlay ? "visible" : "hidden"} variants={overlay} style={{zIndex: 1, position: 'relative', gridColumn: '1/2', gridRow: '1/2',}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: clientTheme.palette.primary.main, p: { xs: 6 } }}>
          <Typography sx={{ mb: { xs: 4 } }} align="center" variant="h3">{node.name}</Typography>
          <Typography align="center" color="white.main">{node.excerpt}</Typography>
        </Box>
      </motion.div>
    </Grid>
  )

}

//onClick={() => toggleRotation(rotation + 180)}

export const query = graphql`
  fragment CategoryFeatureTileFragment on SanityCategoryFeature {
    categories {
      name
      picture {
        asset {
          gatsbyImageData(
            width: 410,
            height: 374
          )
        }
      }
      excerpt
    }
  }
`

