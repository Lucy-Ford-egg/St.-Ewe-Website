import React from "react"
import { Link } from "@mui/material"
import { Link as GatsbyLink } from "gatsby-theme-material-ui"

export const PortableTextInlineLink = ({ value, children, color }) => {
  let linkType = null
  let definedInternal =
    value?.reference?.slug?.current ||
    (value?.markDefs && value?.markDefs[0]?.reference?.slug?.current)
  const definedExternal = value?.href

  const isExternal = value?._type === "link"
  const linkPath = value?.reference || (value?.markDefs && value?.markDefs[0])
  const isInternal = value?._type === "internalLink"
  const isFile = value.reference?._type === "file"

  if (linkPath?._type === "page") {
    definedInternal = `/${definedInternal}`
  }
  if (linkPath?._type === "post") {
    definedInternal = `/news/${value?.reference?.categories?.slug?.current}/${definedInternal}`
  }
  if (linkPath?._type === "recipes") {
    definedInternal = `/recipe/${definedInternal}`
  }
  if (linkPath?._type === "teamMembers") {
    definedInternal = `/team-members/${definedInternal}`
  }

  if (isExternal) {
    linkType = (
      <Link
        rel="noopener"
        target="_blank"
        sx={{
          a: { "&:hover": { cursor: "pointer" } },
          color: color,
          display: "inline-block",
          mx: "5px",
        }}
        className="portableTextInlineLink link-animation"
        href={definedExternal}
        aria-label={`Link to ${children}`}
      >
        {children}
      </Link>
    )
  }
  if (isInternal && !isFile) {
    linkType = (
      <GatsbyLink
        sx={{
          a: { "&:hover": { cursor: "pointer" } },
          color: color,
          display: "inline-block",
          mx: "5px",
        }}
        className="portableTextInlineLink link-animation"
        to={definedInternal}
        aria-label={`Link to ${children}`}
      >
        {children}
      </GatsbyLink>
    )
  }
  if (isFile) {
    linkType = (
      <Link
        rel="noopener"
        target="_blank"
        sx={{
          a: { "&:hover": { cursor: "pointer" } },
          color: color,
          display: "inline-block",
          mx: "5px",
        }}
        className="portableTextInlineLink link-animation"
        href={definedExternal}
        aria-label={`Link to ${children}`}
      >
        {children}
      </Link>
    )
  }

  // Default return if no linkType is set
  return linkType || <span>{children}</span>
}
