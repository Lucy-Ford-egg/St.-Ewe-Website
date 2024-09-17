import React, { useState } from "react"
import Button from "@mui/material/Button"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import { motion } from "framer-motion"
import { styled } from '@mui/material/styles'


const MenuList = styled('motion.ul')(({ theme, navOpen }) => ({
  gridTemplateColumns: 'subgrid',
  display: 'grid',
  gridColumn: '3/23',
  position: 'relative',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
  gridTemplateRows: 'auto',
  [theme.breakpoints.up('lg')]: {

  },
  "& li": {
    gridTemplateColumns: 'subgrid',
    gridColumn: '1/auto',
    display: 'grid',
    listStyle: 'none',
    fontFamily: 'Roboto Slab',
    color: 'white',
  },

  "& a, button": {
    fontFamily: 'Roboto Slab',
    fontSize: 'var(--modular-scale-ms3) !important',
    color: 'white',
    display: 'grid',
    gridColumn: '1/4',
    backgroundSize: '0 100%',
    transition: 'background-size .3s ease',
    backgroundImage: `linear-gradient(transparent calc(100% - 1px),${theme.palette.primary.main} 1px)`,
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 'var(--modular-scale-ms-1) !important',
    paddingBottom: 'var(--modular-scale-ms-1) !important',
    '&:hover': {
      backgroundSize: '100% 100%',
      color: 'white',
    },
    '&.active': {
      //color: theme.palette.primary.main,
      backgroundSize: '100% 100%',
    },
  },
}));

const SubMenuList = styled('motion.ul')(({ theme, navOpen }) => ({
  gridColumn: '3/auto',
  display: 'grid',
  position: 'fixed',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
  zIndex: 3,
  visibility: 'hidden',
  opacity: 0,
  paddingTop: 'var(--modular-scale-ms-4)',
  gridAutoRows: 'auto',
  "&.active": {
    opacity: 1,
    visibility: 'visible',
  },
  "& li": {

    "& a, button": {
      fontFamily: 'Roboto',
      fontSize: 'var(--modular-scale-ms0) !important',
      textTransform: 'unset',
    },
  },
}));


const MenuImage = styled('div')(({ theme, navOpen }) => ({
  gridColumn: '10/23',
  display: 'grid',
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 3,
  transition: 'all 0.2s ease-in-out 0s',
  borderRadius: 'var(--modular-scale-ms4)',
  overflow: 'hidden',
}));


const MainNavigation = (props) => {

  const { menu, definedSiteSettings, handleCloseNavMenu } = props

  const [subMenu, setSubMenu] = useState(null)

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))



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
    visible: { opacity: 1, y: 0, listStyle: "none", display: "flex", alignItems: "center", },
    hidden: { opacity: 0, y: 0, listStyle: "none", display: "flex", alignItems: "center", },
  }

  const RenderMenuItem = (props) => {

    const { menuItem, i, children, setSubMenu, active } = props

    return (
      <motion.li variants={item} key={`main-menu-item-${i}`}
        onMouseOver={() => setSubMenu && setSubMenu(i)}
      >
        {menuItem?.link?.internal ? <GatsbyButton
         className={`${active === true ? `active` : ``}`}
          variant="text"
          disableElevation
          onClick={e => handleCloseNavMenu()}
          size="large"
          to={`/${menuItem?.link?.internal?.slug?.current}`}
         
        >{menuItem?.text}</GatsbyButton> :

          <Button
          className={`${active === true ? `active` : ``}`}
            variant="text"
            disableElevation
            onClick={e => handleCloseNavMenu()}
            size="large"
            href={menuItem?.link?.external}>{menuItem?.text}</Button>}
           

        {children}
      </motion.li>
    )
  }
  return (

    <MenuList
      ref={childRef}
      initial="hidden"
      animate="visible"
      variants={list}
    >
      {menu?.sanityNavigation?.items &&
        menu.sanityNavigation.items.map((menuItem, i) => {

          // Check if the menuItem has childItems
          return menuItem?.childItems ? (
            // Map over childItems and render them
            <>

              <RenderMenuItem
                key={i}
                menuItem={menuItem.link}
                i={i}
                setSubMenu={setSubMenu}
                active={subMenu === i}
              />


              <SubMenuList
                ref={childRef}
                initial="hidden"
                animate="visible"
                variants={list}
                className={`subMenu ${subMenu === i && `active`}`}
              >
                {menuItem.childItems.map((childItem, j) => (
                  <RenderMenuItem key={j} menuItem={childItem} i={j} />
                ))}
              </SubMenuList>
              {menuItem?.image && subMenu === i
                && (
                  <MenuImage>
                    <Image
                      crop={menuItem?.image?.crop}
                      hotspot={menuItem?.image?.hotspot}
                      asset={
                        menuItem?.image?._ref && urlFor(menuItem?.image).width(618).url() || menuItem?.image.asset
                      }
                      width={mobile ? 20 : tablet ? 400 : 618}
                      height={mobile ? 20 : tablet ? 200 : 428}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    // onLoad={() => setImageLoaded(true)}
                    />
                  </MenuImage>
                )}
            </>


          ) : (
            // Render the menuItem directly if no childItems

            <RenderMenuItem key={i} menuItem={menuItem} i={i} setSubMenu={false} />
          )
        })}

    </MenuList>

  )
}

export default MainNavigation