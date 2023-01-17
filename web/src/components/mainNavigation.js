import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { styled } from '@mui/material/styles'
import { Box, Button } from "@mui/material"

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'inherit', 
  textDecoration: 'none',  
  textTransform: 'unset',
  '&:hover': {
    color: theme.palette.primary.main
  }
}));
  

const MainNavigation = (props) => {
  const {handleCloseNavMenu } = props

  const data = useStaticQuery(graphql`
  query MainNavigationQuery {
    allSanityNavigation {
      nodes {
        items {
          navigationItemUrl {
            internalLink {
              ... on SanityPage {
                id
                slug {
                  current
                }
              }
              ... on SanityPost {
                id
                slug {
                  current
                }
              }
            }
            externalUrl
          }
          text
        }
      }
    }
  }
  `)

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end' }}>
      {data.allSanityNavigation.nodes.map((page) => {
        
        return(
          page.items.map((menuItem) =>{
            return(
              <Box
                key={menuItem.text}
                sx={{ my: 2, mx: { xs: 1, md: 1 }, px: { xs: 1, md: 1 },  color: "secondary.main", display: 'block', fontWeight: '500', textTransform: "unset" }}
              >
                <StyledLink to="/">{menuItem.text}</StyledLink>
              </Box>
              )
          }
        )
        )
       }
      )}
    </Box>
  )
}

export default MainNavigation