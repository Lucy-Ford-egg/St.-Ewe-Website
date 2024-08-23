import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { Footer } from "./footer"
import { VisualEditing } from "./visualEditing"
import Box from "@mui/material/Box"
// Preview
import { useQuery } from "../../sanity/store";
import {NAV_QUERY, SITE_SETTINGS} from '../queries/documentQueries';

export const Layout = (props) => {

  const {children, data, initial} = props
  // Preview
  const definedSlug = (data?.sanityPost || data?.sanityTeamMember || data?.sanityrecipies || data?.sanityPage || data?.sanityCategories )
  
  const { data: previewData } = useQuery(
    `{ "siteSettings": ${SITE_SETTINGS}, "nav":${NAV_QUERY}}`,
    {slug: definedSlug?.slug?.current},
    { initial }
  );
  
  const definedSiteSettings = (previewData && previewData?.siteSettings[0]) || data?.sanitySiteSettings

  const navColor = data?.sanityPage?.navColor || data?.sanityPost?.navColor
  const navOverlay = data?.sanityPage?.navOverlay || data?.sanityPost?.navOverlay 
  
  const definedNavColor = (previewData && previewData?.nav?.navColor) || navColor
  const definedNavOverlay = (previewData && previewData?.nav?.navOverlay) || navOverlay 



    return (
    <div>
      <VisualEditing {...props}/>
     
      <Header definedSiteSettings={definedSiteSettings} definedNavColor={definedNavColor} navOverlay={definedNavOverlay}/>
      <Box previewData={previewData}>{
         React.Children.map(children, child => {
          // Clone the child element and pass additional props
          if (React.isValidElement(child)) {
            console.log("React Vaild")
            return React.cloneElement(child, { previewData: data });
          } else {
            console.log("React InVaild")
            // Handle if child is not a React element (regular object)
            return <Box sx={{
              display: "flex",
              justifyContent: "center",
            }}>Loading</Box>; // or any other handling logic
          }

        })}
        </Box>
      <Footer definedSiteSettings={definedSiteSettings} previewData={previewData}/>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

