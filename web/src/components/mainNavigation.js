import React from "react"
import { Link } from "gatsby"
import { styled } from '@mui/material/styles'
import { Box } from "@mui/material"

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  textTransform: 'unset',
  '&:hover': {
    color: theme.palette.primary.main
  }
}));


const MainNavigation = (props) => {
  const { handleCloseNavMenu, menu } = props

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end' }}>
      {menu.allSanityNavigation.nodes.map((page) => {

        return (
          page.items.map((menuItem) => {
            return (
              <Box
                key={menuItem.text}
                sx={{ my: 2, mx: { xs: 1, md: 1 }, px: { xs: 1, md: 1 }, color: "secondary.main", display: 'block', fontWeight: '500', textTransform: "unset" }}
              >
                <StyledLink to={menuItem.navigationItemUrl.internalLink.slug.current}>{menuItem.text}</StyledLink>
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