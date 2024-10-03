import React from "react"
import { Link as GatsbyLink } from "gatsby-theme-material-ui"
import Link from "@mui/material/Button"

export const LinkType = props => {
  const { node, children } = props

  let definedInternal = node?.link?.internal?.slug?.current
  const definedExternal = node?.link?.external

  if (node?.link?.internal?._type === "post") {

    definedInternal = `blog/${node?.link?.internal?.category?.slug?.current}/${definedInternal}`
  }
  if (node?.link?.internal?._type === "Recipe") {
    definedInternal = `/recipe/${definedInternal}`
  }
  if (node?.link?.internal?._type === "teamMembers") {
    definedInternal = `/team-members/${definedInternal}`
  }
  
  return (
    <div>
      {node?.link?.internal ? (
        <GatsbyLink
          to={`/${definedInternal}`}
        >
          {children}
        </GatsbyLink>
      ) : definedExternal ? (
        <Link
          href={definedExternal}
          rel="noopener"
          target="_blank">
          {children}
        </Link>
      ) : null}
    </div>
  )
}
