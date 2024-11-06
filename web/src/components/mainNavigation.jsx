import React, { useState, useRef } from "react"
import Button from "@mui/material/Button"
import { navigate } from "gatsby"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import { motion } from "framer-motion"
import { styled } from "@mui/material/styles"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"

// Styling for the main menu list
const MenuList = styled(motion.ul)(({ theme }) => ({}))

// Styling for the submenu list
// const SubMenuList = styled(motion.ul)(({ theme }) => ({
//   gridColumn: "1/auto",
//   display: "grid",
//   visibility: "hidden",
//   opacity: 0,
//   height: 0,
//   paddingTop: "var(--ms-4)",
//   gridAutoRows: "auto",

//   transition: "all 0.2s ease-in-out",
//   "&.active": {
//     opacity: 1,
//     visibility: "visible",
//     height: "auto",
//   },
//   "& li": {
//     "& a, button": {
//       fontFamily: "Roboto",
//       fontSize: "var(--ms0) !important",
//       "&:hover": {
//         color: theme.palette.primary.main,
//       },
//     },
//   },
//   [theme.breakpoints.up("lg")]: {
//     gridColumn: "5/auto",
//     position: "fixed",
//     top: "50%",
//     left: 0,
//     transform: "translateY(-50%)",
//     zIndex: 3,
//   },
// }));

// ! Refactor
const Navigation = styled(motion.ul)(({ theme, menu, headerColour }) => ({
  gridTemplateColumns: "subgrid",
  display: "grid",
  flexDirection: "column",
  gridColumn: "3/23",
  position: "relative",
  top: "50%",
  left: 0,
  width: "100%",
  transform: "translateY(-50%)",
  gridTemplateRows: "auto",
  margin: 0,
  padding: 0,
}))

const ParentItem = styled(motion.li)(({ theme }) => ({
  color: "var(--white)",
  fontSize: "var(--ms2)",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "var(--ms2)",
  letterSpacing: 1.4,
  textTransform: "uppercase",
  display: "inline-flex",
  flexDirection: "column",

  gridTemplateColumns: "subgrid",
  gridColumn: "1/21",
  listStyle: "none",
  fontFamily: "Roboto Slab",
  color: "white",

  "& a, button": {
    fontFamily: "inherit",
    fontSize: "inherit !important",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gridColumn: "1/4",
    backgroundSize: "0 100%",
    transition: "background-size .3s ease",
    backgroundImage: `linear-gradient(transparent calc(100% - 1px),${theme.palette.primary.main} 1px)`,
    backgroundRepeat: "no-repeat",
    cursor: "pointer",
    padding: "var(--ms-1) 0",
    justifyContent: "start",
    alignItems: "start",
    textAlign: "left",
    "&:hover": {
      backgroundSize: "100% 100%",
      color: theme.palette.primary.main,
      fontSize: "inherit !important",
    },
  },
  "& button": {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.up("lg")]: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "23%",
  },
  "& ul": {
    listStyle: "none",
    paddingTop: "var(--ms0)",
    paddingBottom: "var(--ms0)",
    paddingLeft: 0,
    marginLeft: 0,
    [theme.breakpoints.up("lg")]: {
      position: "absolute",
      top: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      gap: "var(--ms-3)",
      left: "35%",
      flexDirection: "column",
      paddingTop: "unset",
      paddingBottom: "unset",
    },
  },
  "&:hover": {
    "& > ul": {
      flexDirection: "column",
    },
  },
}))

const LinkWrapper = styled("span")(({ theme, menu, headerColour }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    alignItems: "center",
  },
}))

const ChildItem = styled("li")(({ theme, menu, headerColour }) => ({
  color:
    headerColour === "light" || menu === false
      ? "white"
      : "var(--primary-navy)",
  fontFamily: "Roboto",
  fontSize: "var(--ms-2) !important",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "var(--ms2)",
  letterSpacing: 1.4,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  paddingLeft: 0,
  [theme.breakpoints.up("lg")]: {
    color: headerColour === "light" ? "white" : "var(--primary-navy)",
    fontFamily: "Roboto Slab",
    fontSize: "var(--ms2) !important",
    paddingLeft: "var(--ms0)",
  },
}))

const MenuImage = styled("div")(({ theme, navOpen }) => ({
  display: "none",
  [theme.breakpoints.up("lg")]: {
    gridColumn: "10/23",
    display: "grid",
    position: "absolute",
    top: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    gap: "var(--ms-3)",
    left: "50%",
    right: 0,
    zIndex: 3,
    transform: "translateY(-50%)",
    transition: "all 0.2s ease-in-out 0s",
    borderRadius: "var(--ms4)",
    overflow: "hidden",
    //opacity: 0,
    "&.active": {
      opacity: 1,
    },
  },
}))

//!

const MainNavigation = props => {
  const { data, handleCloseNavMenu } = props

  const activeSubMenu = useRef(null) // Track the active submenu
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const [activeMenu, setActiveMenu] = useState(null)

  // Mobile

  const followLink = (e, i) => {
    handleCloseNavMenu()
    //setMenu(false)
    navigate(e?.currentTarget?.pathname)
  }

  // const deactivateSubMenu = () => {
  //   setActiveMenu(null)
  // }

  const handleClick = (i, e) => {
    if (mobile) {
      // Mobile click behavior

      e.preventDefault()

      setActiveMenu(i) // Open the submenu
      debugger
      if (activeMenu === i) {
        setActiveMenu(null) // Close if already active
        navigate(e?.currentTarget?.pathname)
        handleCloseNavMenu()
      }
    }
    if (!mobile) {
      setActiveMenu(null)
      handleCloseNavMenu()
    }
  }

  const handleMouseOver = i => {
    if (!mobile) {
      // Desktop hover behavior
      setActiveMenu(i)
    }
  }

  const handleMouseLeave = () => {
    if (!mobile) {
      setActiveMenu(null)
    }
  }

  //! Refactor

  // const [menu, setMenu] = useState(false)

  const LinkType = props => {
    const { link, children, index, disableSubMenu } = props
    return (
      <>
        {link?.link?.internal ? (
          <GatsbyButton
            variant="text"
            disableElevation
            onMouseEnter={() => !disableSubMenu && handleMouseOver(index)}
            onClick={e => handleClick(index, e)}
            size="large"
            to={`/${link?.link?.internal?.slug?.current}`}
          >
            {link?.text}
          </GatsbyButton>
        ) : (
          <Button
            variant="text"
            disableElevation
            onMouseEnter={() => !disableSubMenu && handleMouseOver(index)}
            onClick={e => handleClick(index, e)}
            size="large"
            href={link?.link?.external}
          >
            {link?.text}
          </Button>
        )}
        {children}
      </>
    )
  }

  const navigationVariants = {
    hover: {
      display: "flex",
      opacity: 1,
    },
    hidden: {
      display: "none",
      opacity: 0,
    },
  }

  //!
  return (
    //! Refactor
    <Navigation
      menu={activeMenu}
      // animate={menu ? 'hover' : 'hidden'}
      initial={"hover"}
      variants={navigationVariants}
    >
      {data?.map((menuItem, index) => {
        return (
          <ParentItem
            key={menuItem._id || menuItem._key}
            whileHover="hover"
            //variants={parentVariants}
          >
            <LinkWrapper>
              <LinkType
                index={index}
                disableSubMenu={false}
                className="hoverUnderline"
                link={menuItem?.link}
              >
                {menuItem.childItems && menuItem.childItems.length > 0 && (
                  <motion.ul
                    initial={
                      {
                        //display: 'none',
                      }
                    }
                    style={{
                      opacity: activeMenu === index ? 1 : 0,
                      height: activeMenu === index ? "100%" : 0,
                      paddingTop: activeMenu === index ? "var(--ms0)" : 0,
                      paddingBottom: activeMenu === index ? "var(--ms0)" : 0,
                      //pointerEvents: activeMenu === index ? 'auto' : 'none',
                    }}
                    //variants={subMenuVariants}
                  >
                    {menuItem.childItems.map(child => {
                      return (
                        <ChildItem key={child._key} index={index}>
                          <LinkType
                            disableSubMenu={true}
                            index={index}
                            className="hoverUnderline"
                            link={child}
                          />
                        </ChildItem>
                      )
                    })}
                  </motion.ul>
                )}
              </LinkType>
            </LinkWrapper>

            {menuItem?.image?.asset?._id && activeMenu === index && (
              <MenuImage className={`menuItemImage menuItemImage-${index}`}>
                <Image
                  crop={menuItem?.image?.crop}
                  hotspot={menuItem?.image?.hotspot}
                  asset={
                    (menuItem?.image?._id &&
                      urlFor(menuItem?.image?.asset).width(618).url()) ||
                    menuItem?.image?.asset
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
          </ParentItem>
        )
      })}
    </Navigation>
    //!
    // <MenuList initial="hidden" animate="visible">
    //   {menu?.sanityNavigation?.items &&
    //     menu.sanityNavigation.items.map((menuItem, i) => {

    //     return(
    //       <React.Fragment key={i}>
    //         <RenderMenuItem menuItem={menuItem.link} i={i} >
    //         {menuItem.childItems && (
    //           <SubMenuList
    //             className={`subMenu subMenu-${i}`}
    //             onMouseOver={() => handleMouseOver(i)} // Keep submenu active when hovered
    //             onMouseLeave={handleMouseLeave} // Deactivate when the mouse leaves the submenu
    //           >
    //             {menuItem.childItems.map((childItem, j) => (
    //               <RenderMenuItem key={j} menuItem={childItem} i={j} />
    //             ))}
    //           </SubMenuList>

    //         )}
    //          </RenderMenuItem>
    //
    //       </React.Fragment>
    //     )}
    //     )}
    // </MenuList>
  )
}

export default MainNavigation
