import React, { useState } from "react"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import { animationHover } from "../utils/animationHover"
import { Link, Box, Typography, Menu, MenuItem, useTheme, Button, useMediaQuery, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const NavigationItem = (props) => {

  const { childNode, text, key, to } = props

  //Desktop Menu
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

  // tablet Menu
  const [expanded, setExpanded] = useState('panel1');

  const handleChange =
    (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };


  const theme = useTheme()
  const mobile = useMediaQuery("(max-width:640px)")
  const tablet = useMediaQuery("(max-width:900px)")


  return (
    <Box
      sx={{ my: 0, mx: { xs: 0, md: 0 }, px: { xs: 0, md: 0 }, color: "secondary.main", display: 'flex', textTransform: "unset" }}
    >
      {childNode.length >= 1 && !mobile &&
        <Box>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="text"
            disableElevation
            onClick={handleClick}
            // onMouseEnter={handleHover} // Disabled for the moment to get it all styled
            //onMouseLeave={handleHoverOut}
            sx={{
              color: theme.palette.text.primary,
              textAlign: { xs: 'left', md: 'center' },
              justifyContent: { xs: 'left', md: 'center' },
              fontWeight: open === 'true' ? 500 : 400,
            }}
            endIcon={childNode.length >= 1 && <ExpandMoreIcon />}
            size="large"
          >{text}</Button>


          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            slotProps={{
              paper: {
                elevation: 0
              }
            }}
            sx={{ mt: theme.spacing(2) }}
          >
            {childNode.map((node, i) => {

              return (
                <MenuItem key={`submenu-${i}-${node.text}`} onClick={handleClose} disableRipple sx={{
                  px: theme.spacing(2)
                }}>
                  {node.link.internal ? (
                    <GatsbyButton variant="text" to={node.link.internal?.slug?.current} sx={{
                      px: 0,
                      justifyContent: 'left',
                      fontWeight: 400,
                    }}
                      size="large"
                    >{node.text}</GatsbyButton>
                  ) : node.link.external ? (
                    <Link size="large" href={node.link.external} sx={{
                      px: 0,
                      justifyContent: 'left',
                      fontWeight: 400,
                    }}>{node.text}</Link>
                  ) : null}
                </MenuItem>
              )
            })}
          </Menu>
        </Box>}

      {childNode.length === 0 && !mobile &&
        <Box>
          <GatsbyButton
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="text"
            disableElevation
            //onClick={handleClick}
            // onMouseEnter={handleHover} // Disabled for the moment to get it all styled
            //onMouseLeave={handleHoverOut}
            sx={{
              color: theme.palette.text.primary,
              borderBottom: `1px solid ${open ? theme.palette.text.primary : `transparent`}`,
              textAlign: { xs: 'left', md: 'center' },
              justifyContent: { xs: 'left', md: 'center' },
              fontWeight: 400,
            }}
            endIcon={childNode.length >= 1 && <ExpandMoreIcon />}
            size="large"
            to={to.link?.internal ? to.link.internal.slug.current : to.link.external}
          >{text}</GatsbyButton>


          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              backgroundColor: theme.palette.background.main,
            }}
          >
            {childNode.map((node, i) => {

              return (
                <MenuItem key={`submenu-${i}-${node.text}`} onClick={handleClose} disableRipple>
                  {node.link.internal ? (
                    <GatsbyButton size="large" color="tertiary" variant="text" to={node.link.internal?.slug?.current} sx={{
                      // color: `${theme.palette.text.primary} !important`,  
                    }}>{node.text}</GatsbyButton>
                  ) : node.link.external ? (
                    <Link size="large" href={node.link.external}>{node.text}</Link>
                  ) : null}
                </MenuItem>
              )
            })}
          </Menu>
        </Box>}


      {// Mobile Menus
      }
      {
        childNode.length === 0 && mobile &&

        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="text"
          disableElevation
          onClick={handleClick}
          // onMouseEnter={handleHover} // Disabled for the moment to get it all styled
          //onMouseLeave={handleHoverOut}
          sx={{
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${open ? theme.palette.text.primary : `transparent`}`,
            textAlign: { xs: 'left', md: 'center' },
            justifyContent: { xs: 'left', md: 'center' },
            px: theme.spacing(1),
            fontWeight: 400,
          }}
          endIcon={childNode.length >= 1 && <ExpandMoreIcon />} size="large"
        >{text}</Button>
      }



      {childNode.length >= 1 && mobile &&

        <Accordion disableGutters elevation={0} expanded={expanded === `${key}`} onChange={handleChange(`${key}`)} sx={{
          backgroundColor: theme.palette.background.default,
          '& .MuiAccordionSummary-content': {
            my: theme.spacing(1),
          }
        }}>
          <AccordionSummary aria-controls={`${key}d-content`} id={`${key}d-content`} sx={{
            px: theme.spacing(0),
          }}>

            <Button
              id="demo-customized-button"
              variant="text"
              disableElevation
              sx={{
                color: theme.palette.text.primary,
                borderBottom: `1px solid ${expanded === `${key}` ? theme.palette.text.primary : `transparent`}`,
                textAlign: { xs: 'left', md: 'center' },
                justifyContent: { xs: 'left', md: 'center' },
                fontWeight: expanded === `${key}` ? '500' : '400',
                px: theme.spacing(1),
              }}
              endIcon={childNode.length >= 1 && expanded === `${key}` ? <ExpandMoreIcon /> : <ExpandMoreIcon sx={{ transform: 'rotate(-90deg)' }} />}
              size="large" >{text}</Button>

          </AccordionSummary>
          {childNode.map((node, i) => {

            return (

              <AccordionDetails sx={{
                py: theme.spacing(0),
                px: theme.spacing(0),
              }}>

                {node.link.internal ? (
                  <GatsbyButton size="large" variant="text" to={node.link.internal?.slug?.current}
                    sx={{
                      justifyContent: "flex-start",
                      color: theme.palette.text.primary,
                      py: theme.spacing(1),
                      fontWeight: 400,
                    }}>{node.text}</GatsbyButton>
                ) : node.link.external ? (
                  <Link xs={{
                    fontWeight: 400,
                  }} href={node.link.external}>{node.text}</Link>
                ) : null}

              </AccordionDetails>

            )
          })}
        </Accordion>
      }



    </Box>
  )
}