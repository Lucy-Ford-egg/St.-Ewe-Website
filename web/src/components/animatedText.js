import React from "react"
import { RenderPortableText } from "./renderPortableText"
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme"

export const AnimatedText = ({ displayTitle, subtitlePosition, children, component = displayTitle }) => {

  return (
    <RenderPortableText subtitlePosition={subtitlePosition} animate={true} value={displayTitle} variant={false} component={component} textColor={clientTheme.palette.highlight.main}/>
  )
}