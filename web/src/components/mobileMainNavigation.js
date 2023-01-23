import React from "react"
import { Link } from "gatsby"
import { styled } from '@mui/material/styles'
import { Menu, MenuItem, Box, Fade } from "@mui/material"

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  textTransform: 'unset',
  '&:hover': {
    color: theme.palette.primary.main
  }
}));

const MobileMainNavigation = (props) => {
  const { menu, anchorElNav, handleCloseNavMenu } = props
  return (

    <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' }, justifyContent: "flex-end" }}>
      <Menu
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', lg: 'none' }, width: '100%', backgroundColor: 'primary.main'
        }}
        TransitionComponent={Fade}
      >
        {menu.allSanityNavigation.nodes.map((page) => {

          return (
            page.items.map((menuItem) => {
              return (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <StyledLink to="/">{menuItem.text}</StyledLink>
                </MenuItem>
              )
            }
            )
          )
        }
        )}
      </Menu>
    </Box>


    // <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' }, justifyContent: "flex-end" }}>
    //         <Menu
    //           anchorEl={anchorElNav}
    //           anchorOrigin={{
    //             vertical: 'bottom',
    //             horizontal: 'left',
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'left',
    //           }}
    //           open={Boolean(anchorElNav)}
    //           onClose={handleCloseNavMenu}
    //           sx={{
    //             display: { xs: 'block', lg: 'none' },
    //           }}
    //         >
    //           {menu.map((page) => (
    //             <MenuItem key={page.title} onClick={handleCloseNavMenu}>
    //               <Typography textAlign="center">{page.title}</Typography>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //       </Box>
  )
}

export default MobileMainNavigation