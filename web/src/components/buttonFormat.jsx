import React from "react"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import { Button } from "@mui/material"

export const ButtonFormat = props => {
  const { node, sx, endIcon, variant, color } = props
  
  return (
    <>
      {node?.link?.internal ? (
        <GatsbyButton
          size="small"
          color={color}
          variant={variant}
          to={node?.link?.internal?.slug?.current} 
          // sx={{...sx}}
          endIcon={endIcon}
        >
          {node?.text}
        </GatsbyButton>
      ) : node?.link?.external ? (
        <Button 
        size="small"
        color={color}
        variant={variant} 
        to={node?.link?.external} 
        // sx={{...sx}}
        endIcon={endIcon}>
          {node.text}
        </Button>
      ) : null}
    </>
  )
}
