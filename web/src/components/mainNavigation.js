import React from "react"

import { Box } from "@mui/material"

import { NavigationItem } from "./navigationItem"


const MainNavigation = (props) => {

  const { handleCloseNavMenu, menu } = props

  return (
    <Box sx={{ flexGrow: 1, display: { lg: 'flex' }, flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>

      {menu?.sanityNavigation?.items && menu.sanityNavigation.items.map((menuItem, i) => {

        return (
          <NavigationItem
            handleCloseNavMenu={handleCloseNavMenu}
            key={`main-menu-item-${i}`}
            link={menuItem?.link?.link}
            childNode={menuItem?.childItems}
            text={menuItem?.link?.text} />
        )
      })
      }

    </Box>
  )
}

export default MainNavigation