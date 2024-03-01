import React from "react"
import { Container, useTheme, Button, Box } from "@mui/material"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"

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
  const { menu } = props
  
  const childRef = React.useRef();

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
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
          pt: { xs: 12, sm: 12, md: 0 },
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
                    size="large"
                    to={`/${menuItem?.link?.link.internal.slug.current}`}
                  >{menuItem?.link.text}</GatsbyButton> :

                    <Button
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
                      size="large"
                      href={menuItem?.link?.link?.link.external} >{menuItem?.link.text}</Button>}

                </Box>
              </Box>
            </motion.li>
          )
        })}
        <motion.li variants={item}>
          <Button
            to="/client-login"
            variant="contained"
            color="primary"
            size="small"
            sx={{
              display: { xs: 'flex', sm: 'flex' },
              textAlign: { xs: 'left', md: 'center' },
              justifyContent: { xs: 'left', sm: 'center' },
              fontWeight: 400,
              mt: { xs: 12, md: 0 },
              // px: theme.spacing(1),
            }}>Client Login

          </Button>
        </motion.li>
        <motion.li variants={item}>
          <Box sx={{ display: { xs: "block", md: "none" } }}>

            Some component

          </Box>
        </motion.li>

      </MotionContainer>
    </Box>
  )
}

export default MainNavigation