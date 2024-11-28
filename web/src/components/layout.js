import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { Footer } from "./footer"
import { VisualEditing } from "./visualEditing"
import { MenuProvider } from "./utils/useMenuContext"
import { CookieBanner } from "./cookieBanner"

export const Layout = props => {
  const { children, data } = props

  return (
    <div>
      <MenuProvider>
        <VisualEditing {...props} />

        <Header />
        <>
          {React.Children.map(children, child => {
            // Clone the child element and pass additional props
            if (React.isValidElement(child)) {
              //console.log("React Vaild")
              return React.cloneElement(child, { previewData: data })
            } else {
              //console.log("React InVaild")
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
        <CookieBanner />
      </MenuProvider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
