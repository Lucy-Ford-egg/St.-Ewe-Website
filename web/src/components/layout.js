import * as React from "react"
import PropTypes from "prop-types"
import "./layout.scss"
import Header from "./header"
import { Footer } from "./footer"
import { VisualEditing } from "./visualEditing"

export const Layout = (props) => {

  const {children, data} = props

  return (
    <div>
     

      <VisualEditing {...props}/>
      <Header navColor={data.sanityPage.navColor}/>
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

