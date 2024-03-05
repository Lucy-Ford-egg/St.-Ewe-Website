import React from "react"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import { Button } from "@mui/material"

export const ButtonFormat = props => {
  const { node, sx, endIcon, variant, color } = props
  
  const definedInternal = node?.link?.internal?.slug?.current
  const definedExternal = node?.link?.external
  return (
    <>
      {node?.link?.internal ? (
        <GatsbyButton
          size="small"
          color={color}
          variant={variant}
          to={definedInternal} 
          // sx={{...sx}}
          endIcon={endIcon}
        >
          {node?.text}
        </GatsbyButton>
      ) : definedExternal ? (
        <Button 
        size="small"
        color={color}
        variant={variant} 
        href={definedExternal} 
        rel="noopener"
        target="_blank"
        endIcon={endIcon}>
          {node.text}
        </Button>
      ) : null}
    </>
  )
}
