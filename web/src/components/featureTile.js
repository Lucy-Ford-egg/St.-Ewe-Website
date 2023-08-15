import React, { useState } from 'react'
import { graphql, Link } from "gatsby"
import { motion } from "framer-motion"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, CardActions, CardContent, Box, Button, Typography } from '@mui/material';
import clientTheme from '../gatsby-theme-material-ui-top-layout/theme'

export const FeatureTile = ({ categories, title, image, excerpt, date, to, context }) => {
  console.log("context",context)
  const [hovered, setHovered] = useState(false)

  const renderTaxonomies = (categories) => {

    const taxonomies = categories?.map((tax, i) => {
      return (
        tax.name
      )
    })
    return (
      taxonomies && taxonomies.join(', ')
    )
  }

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

  return (
    // <Link to={`/features-gallery/${to}`} style={{ textDecoration: 'none' }}>
    //   <Card elevation={0} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', maxHeight: { xs: 'auto', md: 578 } }} square onMouseEnter={e => setHovered(true)} onMouseLeave={e => setHovered(false)}>
    //     {/* <motion.div style={{}} animate={hovered ? "hovered" : "unhovered"}
    //       variants={featuredImageWrapper}> */}
    //       <GatsbyImage style={{ width: "100%", height: '100%' }} image={getImage(image)} alt={image?.altText} />
    //     {/* </motion.div> */}

    //     <motion.div style={{ position: "relative" }} animate={hovered ? "hovered" : "unhovered"}
    //       variants={cardBodyColour}>

    //       <motion.div style={{ }} animate={hovered ? "hovered" : "unhovered"}
    //         variants={cardBody}>
    //         <CardContent sx={{ px: { xs: 0, md: 5 }, pt: { xs: 6, md: 6 } }}>

    //           <motion.div animate={hovered ? "hovered" : "unhovered"} variants={textColour}>
    //             <Box display="flex" justifyContent="space-between" >
    //               <Typography variant="subtitle1" sx={{ textDecoration: 'none', color: "inherit" }}>{categories && renderTaxonomies(categories)}</Typography>
    //               <Typography variant="subtitle1" sx={{ textDecoration: 'none', color: "inherit" }}>{date}</Typography>
    //             </Box>
    //           </motion.div>


    //           <Typography variant="h3" component="h4" sx={{minHeight: {xs: 'min-content', md: 112}, textDecoration: 'none', py: { xs: 3, md: 4 } }}>
    //             {title}
    //           </Typography>
    //           <Box sx={{ display: { xs: 'none', md: 'block', maxHeight: {xs: 100}, overflow: 'hidden' } }}>
    //             <motion.div animate={hovered ? "hovered" : "unhovered"}
    //               variants={variants}>
    //               <Typography variant="body1" color="text.main" sx={{ textDecoration: 'none', py: { xs: 3, md: 4 } }}>
    //                 {excerpt}
    //               </Typography>
    //             </motion.div>
    //           </Box>

    //           <Box sx={{ display: { xs: 'block', md: 'none' } }}>
    //             <Typography variant="body1" color="text.main" style={{ textDecoration: 'none' }}>
    //               {excerpt}
    //             </Typography>
    //           </Box>
    //         </CardContent>
    //       </motion.div>

    //       <CardActions sx={{ px: { xs: 0, md: 5 }, pt: 0, pb: 9 }}>
    //         <Button variant="contained" to={`/features-gallery/${to}`} component={Link} size="small" sx={{ color: hovered ? "primary.main" : "white", backgroundColor: hovered ? "white !important" : "primary.main", transition: 'all 0.2s ease-in 0s', textAlign: 'center' }}>Read More</Button>
    //       </CardActions>
          

    //     </motion.div>

    //   </Card>
    // </Link>

<Card elevation={0} sx={{ display: 'flex', flexDirection: 'column', maxHeight: { xs: 'auto', md: 578 } }} square onMouseEnter={e => setHovered(true)} onMouseLeave={e => setHovered(false)}>
{image && <GatsbyImage style={{ width: "100%", height: '100%' }} image={getImage(image)} alt={image?.altText} />}
<motion.div style={{ position: "relative" }} animate={hovered ? "hovered" : "unhovered"}
variants={cardBodyColour}>

<motion.div style={{}} animate={hovered ? "hovered" : "unhovered"}
  variants={cardBody}>
    <Link to={`/features-gallery/${to}`} style={{ textDecoration: 'none' }}>
  <CardContent sx={{ px: { xs: 5, md: 5 }, pt: { xs: 6, md: 6 } }}>

    <motion.div animate={hovered ? "hovered" : "unhovered"} variants={textColour}>
      <Box display="flex" justifyContent="space-between" >
        <Typography component="p" variant="subtitle1" sx={{ textDecoration: 'none', color: "inherit" }}>{categories && renderTaxonomies(categories)}</Typography>
        <Typography component="p" variant="subtitle1" sx={{ textDecoration: 'none', color: "inherit" }}>{date}</Typography>
      </Box>
    </motion.div>


    <Typography variant="h3" component="h4" sx={{ minHeight: { xs: 'min-content', md: 'min-content' }, textDecoration: 'none', py: { xs: 3, md: 4 } }}>
      {title}
    </Typography>
    <Box sx={{ display: { xs: 'none', md: 'block', maxHeight: { xs: 100 }, overflow: 'hidden' } }}>
      <motion.div animate={hovered ? "hovered" : "unhovered"}
        variants={variants}>
        <Typography variant="body1" color="text.main" sx={{ minHeight: { xs: 'min-content', md: 112 }, textDecoration: 'none', py: { xs: 3, md: 4 } }}>
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
  </Link>
</motion.div>

<CardActions sx={{ px: { xs: 5, md: 5 }, pt: 0, pb: 9 }}>
  <Button variant="contained" to={`/features-gallery/${to}`} component={Link} size="small" sx={{ color: hovered ? "primary.main" : "white", backgroundColor: hovered ? "white !important" : "primary.main", transition: 'all 0.2s ease-in 0s', textAlign: 'center' }}>Read More</Button>
</CardActions>


</motion.div>

</Card>


  )

}

export const query = graphql`

  fragment FeatureFragment on SanityFeatureGrid {
    _key
    _type
    features {
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