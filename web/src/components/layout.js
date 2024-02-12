import * as React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { Footer } from "./footer"
import { VisualEditing } from "./visualEditing"

export const Layout = (props) => {

  const {children, data} = props

  return (
    <div>
      <VisualEditing {...props}/>
      <Header navColor={data?.sanityPage?.navColor || data?.sanityPost?.navColor} navOverlay={data?.sanityPage?.navOverlay || data?.sanityPost?.navOverlay}/>
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

