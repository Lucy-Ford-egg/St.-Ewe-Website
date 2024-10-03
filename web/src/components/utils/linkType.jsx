import React from "react"
import { Link as GatsbyLink } from "gatsby-theme-material-ui"
import Link from "@mui/material/Button"

export const LinkType = props => {
  const { node } = props

  let definedInternal = node?.internal?.slug?.current
  const definedExternal = node?.external

  if (node?.internal?._type === "post") {

    definedInternal = `blog/${node?.internal?.category?.slug?.current}/${definedInternal}`
  }
  if (node?.internal?._type === "Recipe") {
    definedInternal = `/recipe/${definedInternal}`
  }
  if (node?.internal?._type === "teamMembers") {
    definedInternal = `/team-members/${definedInternal}`
  }
  return (
    <div className="linkTypeWrapper">
      {node?.internal ? (
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
