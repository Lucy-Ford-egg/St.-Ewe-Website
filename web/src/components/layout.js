import * as React from "react"
import PropTypes from "prop-types"
import "./layout.scss"
import Header from "./header"
import { Footer } from "./footer"

export const Layout = ({ children }) => {
  

  return (
    <div className="container-fluid p-0">
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

