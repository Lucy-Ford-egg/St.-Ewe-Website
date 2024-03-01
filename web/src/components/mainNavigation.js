import React from "react"
import {
  Container, useTheme, Button, Box, List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import { CiLocationOn, CiPhone, CiMail } from "react-icons/ci";
import { motion } from "framer-motion"

const ContainerComponent = React.forwardRef((props, ref) => (
  <Container
    ref={ref}
    {...props}
  >{props.children}</Container>
))

const MotionContainer = motion(ContainerComponent)


const MainNavigation = (props) => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))
  const { menu, definedSiteSettings, handleCloseNavMenu } = props

  const childRef = React.useRef();

  const list = {
    visible: {
      opacity: 1,
      height: mobile ? "100vh" : "auto",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      height: "auto",
      transition: {
        when: "afterChildren",
      },
    },
  }

  const item = {
    visible: { opacity: 1, y: 0, listStyle: "none", display: "flex", alignItems: "center" },
    hidden: { opacity: 0, y: 0, listStyle: "none", display: "flex", alignItems: "center" },
  }

  return (
    <Box>
      <MotionContainer
        ref={childRef}
        initial="hidden"
        animate="visible"
        variants={list}
        sx={{
          backgroundColor: { xs: "background.default", md: "transparent" },
          pt: { xs: 6, sm: 12, md: 0 },
          pb: { xs: 11, sm: 11, md: 0 },
          marginTop: { xs: 0, sm: 0, md: 0 },
          width: { xs: '100%', sm: '100%', md: 'auto', lg: 'auto' },
          flexBasis: { xs: '100%', sm: '100%', md: 'auto', lg: 'auto' },
          flexGrow: 100,
          order: { xs: 0, sm: 0, md: 0, lg: 0 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'flex-start', sm: 'flex-start', md: 'flex-end', lg: 'flex-end' }
        }}
      >
        {menu?.sanityNavigation?.items && menu.sanityNavigation.items.map((menuItem, i) => {

          return (
            <motion.li variants={item} key={`main-menu-item-${i}`}>
              <Box
                sx={{ my: 0, mx: { xs: 0, md: 0 }, px: { xs: 0, md: 0 }, display: 'flex', textTransform: "unset" }}
              >
                <Box>
                  {menuItem?.link?.link?.internal ? <GatsbyButton
                    variant="text"
                    disableElevation
                    sx={{
                      color: "inherit",
                      textAlign: { xs: 'left', md: 'center' },
                      justifyContent: { xs: 'left', md: 'center' },
                      fontWeight: 700,
                      '&:hover': {
                        color: theme.palette.primary.main
                      }
                    }}
                    onClick={e => handleCloseNavMenu()}
                    size="large"
                    to={`/${menuItem?.link?.link.internal.slug.current}`}
                  >{menuItem?.link.text}</GatsbyButton> :

                    <Button
                      variant="text"
                      disableElevation
                      onClick={e => handleCloseNavMenu()}
                      sx={{
                        color: "inherit",
                        textAlign: { xs: 'left', md: 'center' },
                        justifyContent: { xs: 'left', md: 'center' },
                        fontWeight: 700,
                        '&:hover': {
                          color: theme.palette.primary.main
                        }
                      }}
                      size="large"
                      href={menuItem?.link?.link?.link.external} >{menuItem?.link.text}</Button>}

                </Box>
              </Box>
            </motion.li>
          )
        })}
        <motion.li variants={item}>
          <Box sx={{
            px: 0,
          }}>
            <GatsbyButton
              to="/client-login"
              variant="contained"
              color="primary"
              size="small"
              onClick={e => handleCloseNavMenu()}
              sx={{
                display: { xs: 'flex', sm: 'flex' },
                textAlign: { xs: 'left', md: 'center' },
                justifyContent: { xs: 'left', sm: 'center' },
                fontWeight: 400,
                mt: { xs: 6, md: 0 },
                // px: theme.spacing(1),
              }}>Client Login

            </GatsbyButton>
          </Box>
        </motion.li>

        <Box sx={{ display: { xs: "block", md: "none" }, mt: 6, }}>

          {definedSiteSettings && definedSiteSettings?.companyDetails.map((location, i) => {

            return (
              <motion.li variants={item}>
                <Box sx={{ display: { xs: "block", md: "none", flexDirection: "column", } }}>
                  <List sx={{ px: 4,  py: 6, }}>
                    {location?.title &&
                      <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 0, pr: 3 }}>
                          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: 24, color: "primary.main" }}>
                            <CiLocationOn style={{ width: "100%", height: "auto" }} />
                          </Box>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: "caption" }} primary={location?.title} />
                      </ListItem>
                    }
                    {location?.phone &&
                      <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 0, pr: 3 }}>
                          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: 24, color: "primary.main" }}>
                            <CiPhone style={{ width: "100%", height: "auto" }} />
                          </Box>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: "caption" }} primary={location?.phone} />
                      </ListItem>
                    }
                    {location?.email &&
                      <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: 0, pr: 3 }}>
                          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: 24, color: "primary.main" }}>
                            <CiMail style={{ width: "100%", height: "auto" }} />
                          </Box>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: "caption" }} primary={location?.email} />
                      </ListItem>
                    }
                  </List>
                  <Divider />
                </Box>
              </motion.li>
            )
          })}

        </Box>


      </MotionContainer>
    </Box>
  )
}

export default MainNavigation