import React, { createContext, useContext, useState } from "react"

// Create the context
const MenuContext = createContext()

// Create the provider
export const MenuProvider = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false)

  const toggleOpenNavMenu = toggle => {
    setNavOpen(toggle)
  }

  const handleCloseNavMenu = () => {
    setNavOpen(null)
  }

  return (
    <MenuContext.Provider
      value={{ navOpen, toggleOpenNavMenu, handleCloseNavMenu }}
    >
      {children}
    </MenuContext.Provider>
  )
}

// Custom hook to use the menu context
export const useMenuContext = () => {
  return useContext(MenuContext)
}
