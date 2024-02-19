import * as React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { Footer } from "./footer"
import { VisualEditing } from "./visualEditing"

export const Layout = (props) => {

  const {children, data, previewData} = props

  const previewNavColor = previewData && previewData?.navColor?.label && previewData?.navColor || previewData && previewData?.navColor;
  const navColor = data?.sanityPage?.navColor || data?.sanityPost?.navColor
debugger
    return (
    <div>
      <VisualEditing {...props}/>
      <Header navColor={previewNavColor && previewNavColor || navColor} navOverlay={data?.sanityPage?.navOverlay || data?.sanityPost?.navOverlay}/>
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

