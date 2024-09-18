import React, { useRef } from "react";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { Button as GatsbyButton } from "gatsby-theme-material-ui";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"

// Styling for the main menu list
const MenuList = styled(motion.ul)(({ theme }) => ({
  gridTemplateColumns: "subgrid",
  display: "grid",
  gridColumn: "3/23",
  position: "relative",
  top: "50%",
  left: 0,
  transform: "translateY(-50%)",
  gridTemplateRows: "auto",
  "& li": {
    gridTemplateColumns: "subgrid",
    gridColumn: "1/21",
    display: "grid",
    listStyle: "none",
    fontFamily: "Roboto Slab",
    color: "white",
    "&.active > a, &.active > button": {
      color: theme.palette.primary.main,
    },
    "& button": {
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
  "& a, button": {
    fontFamily: "Roboto Slab",
    fontSize: "var(--modular-scale-ms2) !important",
    color: "white",
    display: "grid",
    gridColumn: "1/4",
    backgroundSize: "0 100%",
    transition: "background-size .3s ease",
    backgroundImage: `linear-gradient(transparent calc(100% - 1px),${theme.palette.primary.main} 1px)`,
    backgroundRepeat: "no-repeat",
    cursor: "pointer",
    padding: "var(--modular-scale-ms-1) 0",
    "&:hover": {
      backgroundSize: "100% 100%",
    },
  },
}));

// Styling for the submenu list
const SubMenuList = styled(motion.ul)(({ theme }) => ({
  gridColumn: "1/auto",
  display: "grid",
  visibility: "hidden",
  opacity: 0,
  paddingTop: "var(--modular-scale-ms-4)",
  gridAutoRows: "auto",
  height: 0,
  transition: "all 0.2s ease-in-out",
  "&.active": {
    opacity: 1,
    visibility: "visible",
    height: "auto",
  },
  "& li": {
    "& a, button": {
      fontFamily: "Roboto",
      fontSize: "var(--modular-scale-ms0) !important",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
  [theme.breakpoints.up("lg")]: {
    gridColumn: "5/auto",
    position: "fixed",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    zIndex: 3,
  },
}));

const MenuImage = styled('div')(({ theme, navOpen }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
  gridColumn: '10/23',
  display: 'grid',
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 3,
  transition: 'all 0.2s ease-in-out 0s',
  borderRadius: 'var(--modular-scale-ms4)',
  overflow: 'hidden',
},
}));

const MainNavigation = (props) => {
  const { menu, handleCloseNavMenu } = props;

  const activeSubMenu = useRef(null); // Track the active submenu
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleMouseOver = (i) => {
    if (activeSubMenu.current !== null && activeSubMenu.current !== i) {
      // Deactivate the previous submenu
      const prevSubMenu = document.querySelector(`.subMenu-${activeSubMenu.current}`);
      const prevMenuItem = document.querySelector(`.menuItem-${activeSubMenu.current}`);
      if (prevSubMenu) prevSubMenu.classList.remove("active");
      if (prevMenuItem) prevMenuItem.classList.remove("active");
    }

    // Update the active submenu ref
    activeSubMenu.current = i;

    // Activate the current submenu
    const newSubMenu = document.querySelector(`.subMenu-${i}`);
    const newMenuItem = document.querySelector(`.menuItem-${i}`);
    const parentMenuItem = document.querySelector(`.menuItem-${i}`).closest('li');
    if (newSubMenu) newSubMenu.classList.add("active");
    if (parentMenuItem)parentMenuItem.classList.add("active");
    if (newMenuItem) newMenuItem.classList.add("active");
  };

  const handleMouseLeave = () => {
    if (activeSubMenu.current !== null) {
      // Remove 'active' class from the previous submenu and menu item
      const prevSubMenu = document.querySelector(`.subMenu-${activeSubMenu.current}`);
      const prevMenuItem = document.querySelector(`.menuItem-${activeSubMenu.current}`);
      const parentMenuItem = document.querySelector(`.menuItem-${activeSubMenu.current}`).closest('li');
      if (prevSubMenu) prevSubMenu.classList.remove("active");
      if (parentMenuItem) parentMenuItem .classList.remove("active");
      if (prevMenuItem) prevMenuItem.classList.remove("active");
    }
    activeSubMenu.current = null;
  };

  const RenderMenuItem = ({ menuItem, i, children }) => (
    <motion.li
      className={`menuItem menuItem-${i}`}
      key={`main-menu-item-${i}`}
      onMouseOver={() => handleMouseOver(i)}
      onMouseLeave={handleMouseLeave()} // To deactivate the submenu when leaving
    >
      {menuItem?.link?.internal ? (
        <GatsbyButton
          variant="text"
          disableElevation
          onClick={handleCloseNavMenu}
          size="large"
          to={`/${menuItem?.link?.internal?.slug?.current}`}
        >
          {menuItem?.text}
        </GatsbyButton>
      ) : (
        <Button
          variant="text"
          disableElevation
          onClick={handleCloseNavMenu}
          size="large"
          href={menuItem?.link?.external}
        >
          {menuItem?.text}
        </Button>
      )}
      {children}
    </motion.li>
  );

  return (
    <MenuList initial="hidden" animate="visible">
      {menu?.sanityNavigation?.items &&
        menu.sanityNavigation.items.map((menuItem, i) => (
          <React.Fragment key={i}>
            <RenderMenuItem menuItem={menuItem.link} i={i} >
            {menuItem.childItems && (
              <SubMenuList
                className={`subMenu subMenu-${i}`}
                onMouseOver={() => handleMouseOver(i)} // Keep submenu active when hovered
                onMouseLeave={handleMouseLeave} // Deactivate when the mouse leaves the submenu
              >
                {menuItem.childItems.map((childItem, j) => (
                  <RenderMenuItem key={j} menuItem={childItem} i={j} />
                ))}
              </SubMenuList>
             
               
            )}
             </RenderMenuItem>
            {/* { activeSubMenu.current === i && menuItem?.image?.asset?._id
                && (
                  <MenuImage>
                    <Image
                      crop={menuItem?.image?.crop}
                      hotspot={menuItem?.image?.hotspot}
                      asset={
                        menuItem?.image?.asset?._id && urlFor(menuItem?.image?.asset).width(618).url()
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
                )} */}
          </React.Fragment>
        ))}
    </MenuList>
  );
};

export default MainNavigation;
