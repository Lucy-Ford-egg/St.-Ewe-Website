import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Grid, Box, Typography, IconButton } from '@mui/material'
import { NavigationLink } from '../utils/navigationLink'
import { FaInstagram, FaPinterestP } from "react-icons/fa";


export const Footer = () => {

  const data = useStaticQuery(graphql`
  query FooterMenu {
    footerMenu: sanityNavigation(navId: {current: {eq: "footer-menu"}}) {
      items {
        text
        navigationItemUrl {
          externalUrl
        }
      }
    }
    socialMenu: sanityNavigation(navId: {current: {eq: "social-menu"}}) {
      items {
        text
        navigationItemUrl {
          externalUrl
        }
      }
    }
  }
  `)
  const renderSocialIcon = (node) => {
   
    if(node.text.toLowerCase() === 'instagram' ) {
      return <IconButton href={node.navigationItemUrl.externalUrl} color="white" aria-label="instagram link"><FaInstagram /></IconButton>
    }
    if(node.text.toLowerCase() === 'pinterest'){
      return <IconButton href={node.navigationItemUrl.externalUrl} color="white" aria-label="pinterest link"><FaPinterestP /></IconButton>
    }
    return false
  
  }
  return (
    <Container maxWidth="fluid" disableGutters={true} sx={{ backgroundColor: 'secondary.main', mt: {xs: 10, md: 11}, py: { xs: 9, md: 9 } }}>

      <Container maxWidth="xl">
        <Grid container rowSpacing={6}>
          
          <Grid item xs={6} md={3} sx={{order: {xs: 2, md: 1}}}>
            <Box sx={{ ml: { xs: -5, md: 0 }, display: 'flex', alignItems: 'center', justifyContent: {xs: 'flex-end', md: 'flex-start'} }} >
            {data.socialMenu.items.map((node, i) => {
              return (
                <Box key={`footer-menu-item-${i}`} >
                  {renderSocialIcon(node)}
                  {/* <NavigationLink text={node.text} linkGroup={node} buttonType="text" color="white" /> */}
                  </Box>
              )
            })}
            </Box>
          </Grid>

          <Grid item xs={6} md={9} sx={{order: {xs: 1, md: 2}}}>
            <Box display="flex" sx={{ order: { xs: 0, md: 1 }, flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              {data.footerMenu.items.map((node, i) => {
                return (
                  <Box key={`footer-menu-item-${i}`} sx={{ ml: { xs: -5, md: 0 } }} >
                    <NavigationLink text={node.text} linkGroup={node} buttonType="text" color="white" />
                  </Box>
                )
              })}
            </Box>
          </Grid>

          <Grid item xs={12} md={5} sx={{order: {xs: 4, md: 3}}}>
            <Box sx={{ display: 'flex' }}>
              <Typography color="primary.main" variant="caption">{`Copyright © ${new Date().getFullYear()}  Heligan Campsite  |  Designed & Developed by `} <a className="link-animation" href="https://www.gendall.co.uk">Gendall</a></Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={7} sx={{order: {xs: 3, md: 4}}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: {xs: 'flex-start', md: 'flex-end'} }} >
              <Typography sx={{fontFamily: 'Montserrat', color: 'rgba(255,255,255, 0.6)'}} variant="h6">Accreditation &amp; Affiliations</Typography>
            </Box>
          </Grid>

        </Grid>
      </Container>

    </Container>
  )
}