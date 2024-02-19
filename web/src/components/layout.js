import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { Footer } from "./footer"
import { VisualEditing } from "./visualEditing"
import {Box} from "@mui/material"

export const Layout = (props) => {

  const {children, data, previewData} = props

  const previewNavColor = previewData && previewData?.navColor?.label && previewData?.navColor || previewData && previewData?.navColor;
  const navColor = data?.sanityPage?.navColor || data?.sanityPost?.navColor


    return (
    <div>
      <VisualEditing {...props}/>
      <Header navColor={previewNavColor && previewNavColor || navColor} navOverlay={data?.sanityPage?.navOverlay || data?.sanityPost?.navOverlay}/>
      <Box previewData={previewData}>{
         React.Children.map(children, child => {
          // Clone the child element and pass additional props
          if (React.isValidElement(child)) {
            console.log("React Vaild")
            return React.cloneElement(child, { previewData: previewData });
          } else {
            console.log("React InVaild")
            // Handle if child is not a React element (regular object)
            return <Box>Loading</Box>; // or any other handling logic
          }

        })}
        </Box>
      <Footer/>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

