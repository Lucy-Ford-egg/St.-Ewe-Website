import React from "react"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { contrastBrandPalette } from "../utils/colours"

export const ButtonFormat = props => {
  const { node, sx, endIcon, variant, size = "large", backgroundColour } = props

  let definedInternal = node?.link?.internal?.slug?.current
  const definedExternal = node?.link?.external
  debugger
  if (node?.link?.internal?._type === "post") {
    definedInternal = `blog/${node?.link?.internal?.category?.slug?.current}/${definedInternal}`
  }
  if (node?.link?.internal?._type === "recipe") {
    definedInternal = `/recipe/${definedInternal}`
  }
  if (node?.link?.internal?._type === "teamMembers") {
    definedInternal = `/team-members/${definedInternal}`
  }
  console.log(
    `What Colour? -- ${contrastBrandPalette[backgroundColour?.label]?.contrastButton[variant]}`,
  )

  return (
    <Box className="button" sx={sx}>
      {node?.link?.internal ? (
        <GatsbyButton
          size={size}
          color={
            contrastBrandPalette[backgroundColour?.label]?.contrastButton[
              variant
            ]
          }
          variant={variant}
          to={`/${definedInternal}`}
          // sx={{...sx}}
          endIcon={endIcon}
        >
          {node?.text}
        </GatsbyButton>
      ) : definedExternal ? (
        <Button
          size={size}
          color={
            contrastBrandPalette[backgroundColour]?.contrastButton[variant]
          }
          variant={variant}
          href={definedExternal}
          rel="noopener"
          target="_blank"
          endIcon={endIcon}
        >
          {node.text}
        </Button>
      ) : null}
    </Box>
  )
}
