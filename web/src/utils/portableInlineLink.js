import React from 'react'
import { Link } from '@mui/material';
import { Link as GatsbyLink } from "gatsby-theme-material-ui"

export const PortableTextInlineLink = ({ value, children, color }) => {
  
  let linkType = ""
  let definedInternal = value?.reference?.slug?.current
  const definedExternal = value?.href

  const isExternal = value?._type === "link"

  function checkStringType(str) {
    const validStrings = ["post", "Recipe", "page", "teamMembers"];
    return validStrings.includes(str);
  }

  const isInternal = checkStringType(value?.reference?._type)
  const isFile = value.reference?._type === "file"

  if (value.reference?._type === "post") {
    definedInternal = `/blog/${value?.reference?.category?.slug?.current}/${definedInternal}`
  }
  if (value.reference?._type === "Recipe") {
    definedInternal = `/Recipe/${definedInternal}`
  }
  if (value.reference?._type === "teamMembers") {
    definedInternal = `/team-members/${definedInternal}`
  }
  if (isExternal) {
    linkType = <Link rel={value?.blank && 'noopener'}
      target={value?.blank && "_blank"} sx={{ a: { "&:hover": { cursor: "pointer" } }, color: color, display: 'inline-block', mx: '5px' }} className="portableTextInlineLink link-animation" href={definedExternal} aria-label={`Link to ${children}`}>{children}</Link>
  }
  if (isInternal && !isFile) {
    linkType = <GatsbyLink sx={{ a: { "&:hover": { cursor: "pointer" } }, color: color, display: 'inline-block', mx: '5px' }} className="portableTextInlineLink link-animation" to={definedInternal} aria-label={`Link to ${children}`}> {children}</GatsbyLink>
  }
  if (isFile) {
    linkType = <Link rel='noopener'
      target="_blank" sx={{ a: { "&:hover": { cursor: "pointer" } }, color: color, display: 'inline-block', mx: '5px' }} className="portableTextInlineLink link-animation" href={definedExternal} aria-label={`Link to ${children}`}> {children}</Link>
  }

  return (
    linkType
  )
}