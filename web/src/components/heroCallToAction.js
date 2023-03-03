import React from 'react'
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Container, Typography, Box, useMediaQuery } from '@mui/material';
import ButtonLink from '../utils/buttonLink';
import {ArchIcon} from '../components/archIcon'
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme"

export const HeroCallToAction = ({ title, text, image, linkGroup }) => {

  const adornment = true

  const isMobile = useMediaQuery('(min-width:600px)');

  return (
    <Container className="section heroCallToAction" maxWidth="false" sx={{ px: {xs: 0}, pt: { xs: 10, md: 11 }, display: 'grid', gridTemplateColumns: '5% auto 5%', gridTemplateRows: {xs: '30px 1fr 1fr 1fr 30px', md: 'repeat(6, 80px)'} }}>
      <Container maxWidth="sm" sx={{ backgroundColor: 'primary.main', gridColumn: {xs: '2/2', md: '1/4'}, gridRow: {xs: '2/5', md: '2/8'}, position: 'relative', zIndex: 1, pt: {xs: 6, md: 6}, pb: {xs: 6, md: 6}, px: {xs: 0, md: 10} }}>

        <Typography align="center" sx={{textAlign: 'center', my: { xs: 5 } }} variant='h2'>{title}</Typography>
        <Typography align="center" sx={{textAlign: 'center', my: { xs: 5 }, maxWidth: 'max-content' }} variant='body1' color='white.main' dangerouslySetInnerHTML={{__html: text}}/>
        <Box display="flex" alignItems="center" justifyContent="center">
          <ButtonLink linkGroup={linkGroup } variant="contained" color="secondary"/>
        </Box>

        {adornment &&
        <Container maxWidth="sm" sx={{pt: {xs: 6, md: 8}, pb: {xs: 2, md: 8}}}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box display="span" sx={{ width: "85px", borderBottom: `1px solid ${clientTheme.palette.secondary.main}`, mx: {xs: 0, md: 7} }}></Box>
            <ArchIcon/>
            <Box display="span" sx={{ width: "85px", borderBottom: `1px solid ${clientTheme.palette.secondary.main}`, mx: {xs: 0, md: 7} }}></Box>
          </Box>
        </Container>
      }

      </Container>
      <Container maxWidth="xl" disableGutters={isMobile ? true : false} sx={{ px: {xs: 0}, gridColumn: '1/4', gridRow: '1/6' }}>
        {image && <GatsbyImage layout="constrained" aspectRatio={133/8} style={{ minHeight: '100%' }} image={getImage(image.asset)} alt={image.asset?.altText} />}
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
            slug {
              current
            }
          }
          ... on SanityPlace {
            id
            slug {
              current
            }
          }
          ... on SanityPage {
            id
            slug {
              current
            }
          }
        }
      }
    }
    image {
      asset {
        gatsbyImage(width: 1330, height: 480)
        altText
      }
    } 
  }
`