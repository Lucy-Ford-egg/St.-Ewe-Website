import React from "react"
import { Link as GatsbyLink } from "gatsby-theme-material-ui"
import Link from "@mui/material/Button"

export const LinkType = props => {
  const { node } = props
debugger
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
    <div className="linkTypeWrapper">
      {node?.link?.internal ? (
        <GatsbyLink
          to={`/${definedInternal}`}
        >
          {props.children}
        </GatsbyLink>
      ) : definedExternal ? (
        <Link
          href={definedExternal}
          rel="noopener"
          target="_blank">
          {props.children}
        </Link>
      ) : props.children}
    </div>
  )
}
