import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { Footer } from "./footer"
import { VisualEditing } from "./visualEditing"
import {Box} from "@mui/material"

// Preview
import { useQuery } from "../../sanity/store";
import {PAGE_QUERY} from '../queries/documentQueries';

export const Layout = (props) => {

  const {children, initial} = props

  
  // Preview
  const definedSlug = (props.data.sanityPage && props.data.sanityPage.slug.current !== "home-page" ? props.data.sanityPage : {slug: {current: "home-page"}} ) || props.data.sanityPost || props.data.sanityTeamMember || props.data.sanityCaseStudy

  const { data, sourceMap } = useQuery(
    PAGE_QUERY,
    {slug: definedSlug.slug.current},
    { initial }
  );

  const previewNavColor = data && data?.navColor?.label && data?.navColor || data && data?.navColor;
  const navColor = data?.sanityPage?.navColor || data?.sanityPost?.navColor


    return (
    <div>
      <VisualEditing {...props}/>
      <Header navColor={previewNavColor && previewNavColor || navColor} navOverlay={data?.sanityPage?.navOverlay || data?.sanityPost?.navOverlay}/>
      <Box previewData={data}>{
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
      <Footer/>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

