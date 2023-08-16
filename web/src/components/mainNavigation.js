import React from "react"
import { Link } from "gatsby-theme-material-ui"
import { Box, useTheme } from "@mui/material"
import { animationHover } from "../utils/animationHover"


const MainNavigation = (props) => {
  const { handleCloseNavMenu, menu } = props
  const theme = useTheme()  
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end' }}>

      {menu.sanityNavigation.items.map((menuItem, i) => {
        return (
          <Box
            key={menuItem.text}
            sx={{ my: 2, mx: { xs: 1, md: 1 }, px: { xs: 1, md: 1 }, color: "secondary.main", display: 'block', fontWeight: '500', textTransform: "unset" }}
          >
            <Link sx={{
               color: 'inherit',
               textDecoration: 'none',
               textTransform: 'unset',
               '&:hover': {
                 color: theme.palette.primary.main,
                 cursor: "pointer",
               },
               ...animationHover('black')
            }} activeStyle={{ color: theme.palette.primary.main }} to={`/${menuItem.navigationItemUrl.internalLink.slug.current}`}>{menuItem.text}</Link>
          </Box>
        )
      })
      }

    </Box>
  )
}

export default MainNavigation