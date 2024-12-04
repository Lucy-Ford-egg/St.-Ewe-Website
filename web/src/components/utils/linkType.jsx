import React from "react"
import { Button as GatsbyButton } from "gatsby-theme-material-ui"
import Link from "@mui/material/Button"

export const LinkType = props => {
  const { node, variant, color = "primary", size = "small" } = props

  let definedInternal = node?.internal?.slug?.current
  const definedExternal = node?.external

  if (node?.internal?._type === "page") {
    definedInternal = node?.internal?.slug?.current
  }
  if (node?.internal?._type === "post") {
    definedInternal = `blog/${node?.internal?.category?.slug?.current}/${definedInternal}`
  }
  if (node?.internal?._type === "recipe") {
    definedInternal = `/recipe/${definedInternal}`
  }
  if (node?.internal?._type === "teamMembers") {
    definedInternal = `/team-members/${definedInternal}`
  }

  return (
    <div className="linkTypeWrapper">
      {node?.internal ? (
        <GatsbyButton
          color={color}
          variant={variant}
          size={size}
          to={`/${definedInternal}`}
        >
          {props.children}
        </GatsbyButton>
      ) : definedExternal ? (
        <Link
          color={color}
          variant={variant}
          size={size}
          href={definedExternal}
          rel="noopener"
          target="_blank"
        >
          {props.children}
        </Link>
      ) : (
        props.children
      )}
    </div>
  )
}
