import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { Footer } from "./footer"
import { VisualEditing } from "./visualEditing"
import {Box} from "@mui/material"
// Preview
import { useQuery } from "../../sanity/store";
import {NAV_QUERY} from '../queries/documentQueries';

export const Layout = (props) => {

  const {children, data, initial} = props
  // Preview
  const definedSlug = (props.data.sanityPost || props.data.sanityTeamMember || props.data.sanityCaseStudy || props.data.sanityPage )
  
  const { data: previewData, sourceMap } = useQuery(
    NAV_QUERY,
    {slug: definedSlug?.slug?.current},
    { initial }
  );

  const navColor = data?.sanityPage?.navColor || data?.sanityPost?.navColor
  const navOverlay = data?.sanityPage?.navOverlay || data?.sanityPost?.navOverlay

  const definedNavColor = (previewData && previewData?.navColor) || navColor
  const definedNavOverlay = (previewData && previewData?.navOverlay) || navOverlay

    return (
    <div>
      <VisualEditing {...props}/>
      <Header navColor={definedNavColor} navOverlay={definedNavOverlay}/>
      <Box previewData={previewData}>{
         React.Children.map(children, child => {
          // Clone the child element and pass additional props
          if (React.isValidElement(child)) {
            console.log("React Vaild")
            return React.cloneElement(child, { previewData: data });
          } else {
            console.log("React InVaild")
            // Handle if child is not a React element (regular object)
            return <Box>Loading</Box>; // or any other handling logic
          }

        })}
        </Box>
      <Footer previewData={data}/>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

