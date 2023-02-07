import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Grid, Box, Typography, ButtonBase } from '@mui/material'
import { NavigationLink } from '../utils/navigationLink'
import clientTheme from '../gatsby-theme-material-ui-top-layout/theme'


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
  }
  `)

  return (
    <Container maxWidth="fluid" disableGutters={true} sx={{ backgroundColor: 'secondary.main', py: { xs: 9, md: 9 } }}>

      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} md={3}>
            {data.footerMenu.items.map((node, i) => {
                return (
                  <Box key={`footer-menu-item-${i}`} sx={{ml:{xs: -5, md: 0}}} >
                    <NavigationLink text={node.text} linkGroup={node} buttonType="text" color="white" />
                  </Box>
                )
              })}
          </Grid>

          <Grid item xs={12} md={9} direction="row-reverse">
            <Box display="flex" sx={{ order: {xs: 0, md: 1}, flexDirection: {xs: 'column', md: 'row'}, justifyContent: {xs: 'flex-start', md: 'flex-end'} }}>
              {data.footerMenu.items.map((node, i) => {
                return (
                  <Box key={`footer-menu-item-${i}`} sx={{ml:{xs: -5, md: 0}}} >
                    <NavigationLink text={node.text} linkGroup={node} buttonType="text" color="white" />
                  </Box>
                )
              })}
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex' }}>
              <Typography color="primary.main" variant="caption">{`Copyright © ${new Date().getFullYear()}  Architectural Holidays  |  Designed & Developed by `} <a className="link-animation" href="https://www.gendall.co.uk">Gendall</a></Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}></Grid>

        </Grid>
      </Container>

    </Container>
  )
}