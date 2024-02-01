import React from "react"
import { Container, useTheme, Button, Divider } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import { NavigationItem } from "./navigationItem"


const MainNavigation = (props) => {
  const theme = useTheme()
  const {navColor} = props
   
  const { handleCloseNavMenu, menu } = props

  return (
    <Container sx={{ pt: { xs: 1, sm: 1, md: 0 }, pb: { xs: 11, sm: 11, md: 0 }, marginTop: { xs: 0, sm: 0, md: 0 }, width: { sm: '100%', sm: 'auto', md: 'auto', lg: 'auto' }, flexBasis: { sm: '100%', sm: 'auto', md: 'auto', lg: 'auto' }, flexGrow: 100, order: { xs: 0, sm: 0, md: 0, lg: 0 }, display: { sm: 'flex' }, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'flex-start', sm: 'flex-end', md: 'flex-end', lg: 'flex-end' } }}>
      <Divider sx={{ mb: theme.spacing(8) }} />
      {menu?.sanityNavigation?.items && menu.sanityNavigation.items.map((menuItem, i) => {

        return (
          <NavigationItem
            handleCloseNavMenu={handleCloseNavMenu}
            key={`main-menu-item-${i}`}
            link={menuItem?.link?.link}
            childNode={menuItem?.childItems}
            text={menuItem?.link?.text}
            to={menuItem?.link}
            navColor={navColor}
          />
        )
      })
      }
      <Button
        to="www.gendall.co.uk"
        variant="text"
        color="tertiary"
        size="large"
        endIcon={<LoginIcon />}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          textAlign: { xs: 'left', md: 'center' },
          justifyContent: { xs: 'left', sm: 'center' },
          fontWeight: 400,
          px: theme.spacing(1),
         }}>ManageBooking

      </Button>


    </Container>
  )
}

export default MainNavigation