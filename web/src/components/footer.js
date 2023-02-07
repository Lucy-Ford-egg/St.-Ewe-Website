import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {Container, Grid, Box, Typography} from '@mui/material'
import {NavigationLink} from '../utils/navigationLink'


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

  return(
    <Container maxWidth="fluid" sx={{backgroundColor: 'secondary.main'}}>

      <Container maxWidth="xl">
        <Grid container>
          <Grid item></Grid>
          <Grid item>
            {data.footerMenu.items.map((node, i) => {
              return(
              <Box key={`footer-menu-item-${i}`}>
                <NavigationLink text={node.text} linkGroup={node} buttonType="text" color="primary" />
              </Box>
              )
            })}
          </Grid>

          <Grid item>
            <Typography variant="subtitle1">{`Copyright © ${new Date().getFullYear()}  Architectural Holidays  |  Designed & Developed by Gendall`}</Typography>
          </Grid>
          <Grid item></Grid>

        </Grid>
      </Container>

    </Container>
  )  
}