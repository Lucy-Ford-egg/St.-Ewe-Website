import React, { useState, forwardRef } from 'react'
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Grid, Box, Typography } from '@mui/material'
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme"
import { motion } from "framer-motion"

export const CategoryFeatureTile = ({ node, i }) => {

  const [showOverlay, setShowOverlay] = useState(false)

  const overlay = {
    hidden: {
      y: '74%',
      transition: {
        type: "spring",
        bounce: 0,
        damping: 20,
      }

    },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0,
        damping: 20,
      }
    }
  }

  const Inner = forwardRef((props, ref) => (
    <Box ref={ref} {...props}>
      <Typography sx={{ mb: { xs: 4 } }} align="center" variant="h3">{node.name}</Typography>
      <motion.div variants={innerText}>
        <Typography sx={{ fontSize: { xs: 12, sm: 16, md: 12, lg: 16 } }} align="center" color="white.main">{node.excerpt}</Typography>
      </motion.div>
    </Box>
  ))
  const MotionInner = motion(Inner, { forwardMotionProps: true })

  const inner = {
    hidden: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      transition: {
        type: "spring",
        bounce: 0,
        delayChildren: 0.2
      }
    },
    visible: {
      justifyContent: 'center',
      alignItems: 'center',
      transition: {
        type: "spring",
        bounce: 0,
        delayChildren: 0.2
      }
    }
  }

  const innerText = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    }
  }

  return (

    <Grid onMouseOver={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)} key={`column-${i}`} item xs={12} sm={12} md={4} lg={4} sx={{
      overflow: 'hidden', minHeight: 527, maxHeight: 527, height: 'min-content', position: 'relative', display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr', '&:hover': {
        cursor: 'pointer'
      }
    }}>

      <Box sx={{ position: 'relative', zIndex: 0, gridColumn: '1/2', gridRow: '1/2' }}>
        <Link to={`/${node.name.toLowerCase()}`}>
          <GatsbyImage style={{ height: '100%', minHeight: 527, maxHeight: 527 }} image={getImage(node.picture?.asset.gatsbyImageData)} alt={node.picture?.asset?.altText} />
        </Link>
      </Box>

      <motion.div initial="hidden" animate={showOverlay ? "visible" : "hidden"} variants={overlay} style={{ zIndex: 1, position: 'relative', gridColumn: '1/2', gridRow: '1/2', }}>
        <Link to={`/${node.name.toLowerCase()}`}>
          <MotionInner initial="hidden" animate={showOverlay ? "visible" : "hidden"} variants={inner} sx={{
            display: 'flex',
            flexDirection: 'column', minHeight: 527, maxHeight: 527, height: '100%', backgroundColor: clientTheme.palette.primary.main, p: { xs: 6 }
          }} />
        </Link>
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
            height: 527
          )
          altText
        }
      }
      excerpt
    }
  }
`

