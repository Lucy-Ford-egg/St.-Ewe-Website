import React from 'react'
import { graphql } from "gatsby"
// import { motion } from "framer-motion"
import { Container, Typography } from '@mui/material';

export const Text = ({ _rawContent }) => {


  // const imageWrapper = {
  //   hovered: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       type: "spring",
  //       bounce: 0
  //     }
  //   },
  //   unhovered: {
  //     opacity: 0,
  //     y: -10,
  //   },
  // }

  return (
    <Container maxWidth="xl" sx={{py: {xs: 6, md: 6} }}>
      <Container maxWidth="sm">
        {_rawContent.map((content, i) => {

          let contentArray = []

            if(content.style.indexOf('h1','h2','h3','h4')){
              contentArray = [...contentArray, <Typography sx={{my: {xs: 7}, maxWidth: 'max-content'}} variant={content.style}>{content.children.map((child, i) => child.text)}</Typography>]
            } 
            if(content.style === 'normal'){  
              contentArray = [...contentArray, <Typography sx={{my: {xs: 7}}} variant="body1">{content.children.map((child, i) => child.text)}</Typography>]
            }

            return contentArray
          
        })}
      </Container>
    </Container>
  )

}

export const query = graphql`
  fragment TextFragment on SanityTextBlock {
      _key
      _type
      _rawContent(resolveReferences: {maxDepth: 10})
  }
`