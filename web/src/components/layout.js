import * as React from "react"
import PropTypes from "prop-types"
import "./layout.scss"
import Header from "./header"
import { Footer } from "./footer"
import { VisualEditing } from "./visualEditing"

export const Layout = (props) => {

  const {children} = props

  return (
    <div className="container-fluid p-0">
     

      <VisualEditing {...props}/>
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

