import React from "react"
import { Link } from "gatsby"
import { styled } from '@mui/material/styles'
import { Box } from "@mui/material"
import { animationHover } from "../utils/animationHover"

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  textTransform: 'unset',
  '&:hover': {
    color: theme.palette.primary.main
  },
  ...animationHover('black')
}));


const MainNavigation = (props) => {
  const { handleCloseNavMenu, menu } = props

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end' }}>

      {menu.sanityNavigation.items.map((menuItem) => {
        return (
          <Box
            key={menuItem.text}
            sx={{ my: 2, mx: { xs: 1, md: 1 }, px: { xs: 1, md: 1 }, color: "secondary.main", display: 'block', fontWeight: '500', textTransform: "unset" }}
          >
            <StyledLink to={`/${menuItem.navigationItemUrl.internalLink.slug.current}`}>{menuItem.text}</StyledLink>
          </Box>
        )
      })
      }

    </Box>
  )
}

export default MainNavigation