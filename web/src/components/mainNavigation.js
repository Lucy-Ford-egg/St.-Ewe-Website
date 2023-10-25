import React from "react"

import {Container, useTheme } from "@mui/material"

import { NavigationItem } from "./navigationItem"


const MainNavigation = (props) => {
  const theme = useTheme()
  const { handleCloseNavMenu, menu } = props

  return (
    <Container sx={{ marginTop :{xs: 0, sm: `${theme.spacing(3)} !important`, md: 0}, width: { sm: '100%', md: 'auto' }, flexBasis: { sm: '100%', md: 'auto' }, flexGrow: 1, order: { sm: 1, md: 0 }, display: { sm: 'flex' }, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'flex-start', sm: 'space-between', md: 'flex-end' } }}>

      {menu?.sanityNavigation?.items && menu.sanityNavigation.items.map((menuItem, i) => {

        return (
          <NavigationItem
            handleCloseNavMenu={handleCloseNavMenu}
            key={`main-menu-item-${i}`}
            link={menuItem?.link?.link}
            childNode={menuItem?.childItems}
            text={menuItem?.link?.text}
            to={menuItem?.link}
          />
        )
      })
      }

    </Container>
  )
}

export default MainNavigation