import React from "react"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

export const ButtonFormat = props => {
  const { node, sx, endIcon, variant, color } = props

  let definedInternal = node?.link?.internal?.slug?.current
  const definedExternal = node?.link?.external

  if(node?.link?.internal?._type === "post"){

    definedInternal = `blog/${node?.link?.internal?.category?.slug?.current}/${definedInternal}`
  }
  if(node?.link?.internal?._type === "recipies" ){
    definedInternal = `/recipies/${definedInternal}`
  }
  if(node?.link?.internal?._type === "teamMembers" ){
    definedInternal = `/team-members/${definedInternal}`
  }

  return (
    <Box sx={sx}>
      {node?.link?.internal ? (
        <GatsbyButton
          size="small"
          color={color}
          variant={variant}
          to={`/${definedInternal}`} 
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
    </Box>
  )
}
