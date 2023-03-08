import React from "react"
import { graphql } from "gatsby"

export const InstagramEmbed = ({_rawInstagramUrl}) => {
  return(
    <>Hello
    </>
  )
}
export const query = graphql`
  fragment InstagramEmbedFragment on SanityInstagramEmbed {
    _rawInstagramUrl(resolveReferences: {maxDepth: 10})
  }
`