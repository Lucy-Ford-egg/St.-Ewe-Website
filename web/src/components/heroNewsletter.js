import React from 'react'
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import { motion } from "framer-motion"
import { Container, Typography, Box, useMediaQuery } from '@mui/material';
import { MailchimpList } from './mailchimpList';

export const HeroNewsletter = ({ title, text, image, linkGroup }) => {

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
  const isMobile = useMediaQuery('(min-width:600px)');

  return (
    <Container maxWidth="false" sx={{ px: {xs: 0}, py: { xs: 2, md: 6 }, display: 'grid', gridTemplateColumns: '5% auto 5%', gridTemplateRows: {xs: '30px 1fr 1fr 1fr 30px', md: 'repeat(6, 1fr)'} }}>
      <Container maxWidth="sm" sx={{ backgroundColor: 'primary.main', gridColumn: {xs: '2/2', md: '1/4'}, gridRow: {xs: '2/5', md: '2/6'}, position: 'relative', zIndex: 1, pt: {xs: 6, md: 6}, pb: {xs: 6, md: 3}, px: {xs: 0, md: 10}, mb: {xs: 0, md: -8} }}>

        <Typography align="center" sx={{textAlign: 'center', my: { xs: 5 } }} variant='h2'>{title}</Typography>
        <Box sx={{maxWidth: 346}}>
          <Typography align="center" sx={{textAlign: 'center', my: { xs: 5 } }} variant='body1' color='white.main' dangerouslySetInnerHTML={{__html: text}}/>
        </Box>
        <MailchimpList/>

      </Container>
      <Container maxWidth="xl" disableGutters={isMobile ? true : false} sx={{ px: {xs: 0}, gridColumn: '1/4', gridRow: '1/6' }}>
        <GatsbyImage layout="contained" aspectRatio="133/8" style={{ minHeight: '100%' }} image={getImage(image.asset)} alt="alt tag" />
      </Container>
    </Container>
  )

}

export const query = graphql`
  fragment HeroNewsletterFragment on SanityHeroNewsletter {
    _key
    _type
    activate
    text
    title
    image {
      asset {
        gatsbyImage(width: 1330, height: 480)
        altText
      }
    } 
  }
`