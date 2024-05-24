import React from 'react'
import Box from '@mui/material/Box'
import { ButtonFormat } from "./buttonFormat"

export const Links = (props) => {
const {links, highlighted, previewData, linkOne = 'primary'} = props

const definedLinks = (previewData && previewData.links && previewData?.links) || links 
  return (
    <Box
    sx={{
      width: "fit-content",
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "row",
      flexBasis: "100%",
      columnGap: 6,
    }}
  >
    {definedLinks &&
      definedLinks.map((node, i) => {
        return (
          <ButtonFormat
            {...props}
            variant={i === 0 ? "contained" : "outlined"}
            color={i === 0 ? linkOne === 'primary' ? "primary" : "secondary" : highlighted ? "secondary" : "tertiary"}
            node={
              previewData && previewData.node
                ? previewData.node
                : node
            }
          />
        )
      })}
  </Box>
  )
}

