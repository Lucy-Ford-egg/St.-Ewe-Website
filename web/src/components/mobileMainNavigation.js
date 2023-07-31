import React from "react"
import { Link } from "gatsby-theme-material-ui"
import { Menu, MenuItem, Box, Fade} from "@mui/material"
import { motion } from "framer-motion"

const MobileMainNavigation = props => {
  const { menu, anchorElNav, handleCloseNavMenu } = props

  const list = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delay: 0.25,
        staggerChildren: 0.4,
      },
    },
  }

  const listItem = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
    hidden: { opacity: 0 },
  }


  const Component = React.forwardRef((props, ref) => {
    return (
      <MenuItem {...props} ref={ref}>
        {props.children}
      </MenuItem>
    )
  })

  const MotionMenuItem = motion(Component)

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "flex", lg: "none" },
        justifyContent: "flex-end",
      }}
    >
      <Menu
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", lg: "none" },
          top: "4.9rem",
          width: "100%",
          backgroundColor: "primary.main",
        }}
        TransitionComponent={Fade}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "transparent",
              top: "50% !important",
              transform: "translateY(-50%)",
            },
            square: true,
            elevation: 0,
          },
        }}
      >
        <motion.div variants={list} initial="hidden" animate="visible">
          {menu.sanityNavigation.items.map((menuItem, i) => {
            return (
              <MotionMenuItem
                custom={i}
                variants={listItem}
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={handleCloseNavMenu}
              >
                <Link
                  sx={{
                    textDecoration: "none",
                    textTransform: "unset",
                    textAlign: "center",
                    color: "white.main",
                    position: "relative",
                    fontWeight: 500,
                    "&:before": {
                      content: "''",
                      position: "absolute",
                      left: -20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      mr: 5,
                      width: 10,
                      height: 10,
                      borderRadius: 1000,
                      backgroundColor: "primary.main",
                      transition: "all 0.2 ease-in-out 0",
                    },
                    "&:hover": {
                      color: "secondary.main",
                      backgroundColor: "transparent",
                      "&:before": {
                        backgroundColor: "secondary.main",
                      },
                    },
                  }}
                  to="/"
                >
                  {menuItem.text}
                </Link>
              </MotionMenuItem>
            )
          })}
        </motion.div>
      </Menu>
    </Box>
  )
}

export default MobileMainNavigation
