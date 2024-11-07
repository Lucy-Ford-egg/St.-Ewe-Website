import React from "react"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(
  ({ verticalSpace, backgroundColour, elevation = 0, theme }) => ({
    gridColumn: "1/25",
    display: "grid",
    gridTemplateColumns: "repeat(24, 1fr)",
    backgroundColor: backgroundColour?.value,
    paddingTop:
      verticalSpace?.topPadding?.toLowerCase() === "ms6"
        ? `var(--ms4)`
        : `var(--${verticalSpace?.topPadding?.toLowerCase()})`,
    paddingBottom:
      verticalSpace?.bottomPadding?.toLowerCase() === "ms6"
        ? `var(--ms4)`
        : `var(--${verticalSpace?.bottomPadding?.toLowerCase()})`,
    maxHeight: "max-content",
    //color: `${contrastBrandPalette[backgroundColour?.label]?.contrastText}`,
    zIndex: elevation,
    [theme.breakpoints.up("md")]: {
      paddingTop: `var(--${verticalSpace?.topPadding?.toLowerCase()})`,
      paddingBottom: `var(--${verticalSpace?.bottomPadding?.toLowerCase()})`,
    },
  }),
)

export const ModuleContainer = props => {
  const { children } = props

  return <Wrapper {...props}>{children}</Wrapper>
}
