import React, { useState } from "react"
import Button from "@mui/material/Button"
import { navigate } from "gatsby"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import { motion } from "framer-motion"
import { styled } from "@mui/material/styles"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"

const Navigation = styled(motion.ul)(({ theme }) => ({
  gridTemplateColumns: "repeat(24, 1fr)",
  display: "grid",
  flexDirection: "column",
  gridColumn: "3/23",
  position: "relative",
  top: "0%",
  left: 0,
  width: "100%",
  gridTemplateRows: "auto",
  margin: 0,
  padding: 0,
  [theme.breakpoints.up("lg")]: {
    top: "50%",
    transform: "translateY(-50%)",
  },
}))

const ParentItem = styled(motion.li)(({ theme, active }) => ({
  color: "var(--white)",
  fontSize: "var(--ms2)",
  fontStyle: "normal",
  lineHeight: "var(--ms2)",
  letterSpacing: 1.4,
  textTransform: "uppercase",
  display: "inline-flex",
  flexDirection: "column",
  gridTemplateColumns: "repeat(23, 1fr)",
  gridColumn: "1/21",
  listStyle: "none",
  fontFamily: "Roboto Slab",
  fontWeight: 500,
  "& > a, button": {
    borderBottom: active ? `1px solid ${theme.palette.primary.main}` : "unset",
    [theme.breakpoints.up("lg")]: {
      borderBottom: "unset",
    },
  },
  "& a, button": {
    fontFamily: "inherit",
    fontWeight: "inherit",
    fontSize: "inherit !important",
    textTransform: "inherit",
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
  "&:hover": {
    "& > ul": {
      flexDirection: "column",
    },
  },
}))

const LinkWrapper = styled("span")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    alignItems: "center",
  },
}))

const ChildUl = styled(motion.ul)(({ theme, activeMenu, index }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  opacity: activeMenu === index ? 1 : 0,
  height: activeMenu === index ? "100%" : 0,
  pointerEvents: activeMenu === index ? "visible" : "none",
  paddingTop: activeMenu === index ? "var(--ms0)" : 0,
  paddingBottom: activeMenu === index ? "var(--ms0)" : 0,
  listStyle: "none",
  paddingLeft: 0,
  marginLeft: 0,
  [theme.breakpoints.up("lg")]: {
    position: "absolute",
    top: "50%",
    transform: `translateX(${activeMenu === index ? "0%" : "100%"}) translateY(-50%)`,
    left: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: "unset",
    paddingBottom: "unset",
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
  fontWeight: 400,
  lineHeight: "var(--ms2)",
  letterSpacing: 1.4,
  whiteSpace: "nowrap",
  paddingLeft: 0,
  textTransform: "capitalize",
  [theme.breakpoints.up("lg")]: {
    color: headerColour === "light" ? "white" : "var(--primary-navy)",
    fontSize: "var(--ms0) !important",
    paddingLeft: "var(--ms0)",
    textTransform: "capitalize",
  },
}))

const MenuImage = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("lg")]: {
    gridColumn: "10/23",
    display: "grid",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    gap: "var(--ms-3)",
    maxWidth: 618,
    right: 0,
    zIndex: 3,
    transition: "all 0.2s ease-in-out 0s",
    borderRadius: "var(--ms4)",
    overflow: "hidden",
    "&.active": {
      opacity: 1,
    },
  },
}))

const MainNavigation = props => {
  const { data, handleCloseNavMenu } = props

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const [activeMenu, setActiveMenu] = useState(null)

  const handleClick = (i, e) => {
    if (mobile) {
      e.preventDefault()
      setActiveMenu(i) // Open the submenu

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
      initial={"hover"}
      variants={navigationVariants}
    >
      {data?.map((menuItem, index) => {
        return (
          <ParentItem
            key={menuItem._id || menuItem._key}
            whileHover="hover"
            active={activeMenu === index}
          >
            <LinkWrapper>
              <LinkType
                index={index}
                disableSubMenu={false}
                className="hoverUnderline"
                link={menuItem?.link}
              >
                {menuItem.childItems && menuItem.childItems.length > 0 && (
                  <ChildUl activeMenu={activeMenu} index={index}>
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
                  </ChildUl>
                )}
              </LinkType>
            </LinkWrapper>

            {menuItem?.image?.asset?._id && activeMenu === index && (
              <MenuImage className={`menuItemImage menuItemImage-${index}`}>
                <Image
                  crop={menuItem?.image?.crop}
                  hotspot={menuItem?.image?.hotspot}
                  alt={menuItem?.image?.asset?.altText}
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
                />
              </MenuImage>
            )}
          </ParentItem>
        )
      })}
    </Navigation>
  )
}

export default MainNavigation
