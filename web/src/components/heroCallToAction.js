import React from 'react'
import { graphql } from "gatsby"
// import { motion } from "framer-motion"
import { Container, Typography } from '@mui/material';

export const HeroCallToAction = ({ _rawContent }) => {


  // const imageWrapper = {
  //   hovered: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       type: "spring",
  //       bounce: 0
  //     }
  //   },
  //   unhovered: {
  //     opacity: 0,
  //     y: -10,
  //   },
  // }

  return (
    <Container maxWidth="false" sx={{py: {xs: 6, md: 6} }}>
      <Container maxWidth="sm" sx={{backgroundColor: 'primary'}}>

      <Typography sx={{my: {xs: 7}, maxWidth: 'max-content'}} variant='h2' color='text.main'>Be on the list</Typography>
      <Typography sx={{my: {xs: 7}, maxWidth: 'max-content'}} variant='body1' color='white.main'>Do you think your business should be 
considered for the All #1 List?
Contact us to find out how to apply.</Typography>


    
      </Container>
    </Container>
  )

}

export const query = graphql`
  fragment HeroCallToActionFragment on SanityHeroCallToAction {
    _key
    _type
    text
    title
    linkGroup {
      internalLinkGroup {
        label
        reference {
          ... on SanityNews {
            id
          }
        }
      }
    }
    image {
      asset {
        gatsbyImage
      }
    } 
  }
`