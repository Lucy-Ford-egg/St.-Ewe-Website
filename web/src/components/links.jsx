import React from "react"
import { ButtonFormat } from "./buttonFormat"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(({ alignment }) => ({
  width: "fit-content",
  display: "flex",
  // justifyContent: alignment ? alignment : "flex-end",
  flexDirection: "row",
  // flexBasis: "100%",
  columnGap: "var(--ms2)",
}))

export const Links = props => {
  const { links, previewData, backgroundColour, alignment } = props

  const definedLinks =
    (previewData && previewData.links && previewData?.links) || links
  return (
    <Wrapper alignment={alignment}>
      {definedLinks &&
        definedLinks.map((node, i) => {
          return (
            <ButtonFormat
              key={node._key}
              {...props}
              variant={i === 0 ? "contained" : "outlined"}
              backgroundColour={backgroundColour}
              //color={i === 0 ? linkOne === 'primary' ? "primary" : "secondary" : highlighted ? "secondary" : "tertiary"}
              node={previewData && previewData.node ? previewData.node : node}
            />
          )
        })}
    </Wrapper>
  )
}
