import React, { useState } from "react"
import { Link, Button as GatsbyButton } from "gatsby-theme-material-ui"
import { animationHover } from "../utils/animationHover"
import { Box, Typography, Menu, MenuItem, useTheme, Button } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const NavigationItem = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { childNode, text } = props
  const theme = useTheme()

  return (
    <Box
      sx={{ my: 0, mx: { xs: 0, md: 0 }, px: { xs: 0, md: 0 }, color: "secondary.main", display: 'block', fontWeight: '500', textTransform: "unset" }}
    >
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        onMouseEnter={handleHover}
        //onMouseLeave={handleHoverOut}
        sx={{
          color: theme.palette.text.primary,
        }}
        endIcon={childNode.length >=1 && <ExpandMoreIcon/>}
      >


        {/* <Link sx={{
        color: 'inherit',
        textDecoration: 'none',
        textTransform: 'unset',
        '&:hover': {
          color: theme.palette.primary.main,
          cursor: "pointer",
        },
        ...animationHover('black')
      }} activeStyle={{ color: theme.palette.primary.main }} to={`/${menuItem?.link?.link?.internal?.slug.current}`}> */}
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {text}
        </Typography>
        {/* </Link> */}
      </Button>
      {childNode.length >=1 && 
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {childNode.map((node, i) => {

          return (
            <MenuItem key={`submenu-${i}-${node.text}`} onClick={handleClose} disableRipple>
              {node.link.internal ? (
                <GatsbyButton variant="text" to={node.link.internal?.slug?.current}>{node.text}</GatsbyButton>
              ) : node.link.external ? (
                <a href={node.link.external}>{node.text}</a>
              ) : null}

              {/* {node.link.internal &&
              <Link sx={{
                color: 'inherit',
                textDecoration: 'none',
                textTransform: 'unset',
                '&:hover': {
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                },
                ...animationHover('black')
              }} activeStyle={{ color: theme.palette.primary.main }} to={`/${node.link.internal?.slug.current}`}>
                {node.text}
              </Link>} */}
            </MenuItem>
          )
        })}


      </Menu>}

    </Box>
  )
}