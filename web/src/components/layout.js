import React, { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { Footer } from "./footer"
import { VisualEditing } from "./visualEditing"
import { MenuProvider } from "./utils/useMenuContext"
import { CookieBanner } from "./cookieBanner"

import { isSanityPreview } from "../utils/isSanityPreview"

export const Layout = props => {
  const { children, data } = props

  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    setIsPreview(isSanityPreview())
  }, [])

  return (
    <div>
      <MenuProvider>
        <VisualEditing {...props} />

        <Header />
        <>
          {React.Children.map(children, child => {
            // Clone the child element and pass additional props
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { previewData: data })
            } else {
              // Handle if child is not a React element (regular object)
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Loading
                </div>
              ) // or any other handling logic
            }
          })}
        </>
        <Footer />
        {!isPreview && <CookieBanner />}
      </MenuProvider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
