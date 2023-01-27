import React from 'react'
import { graphql } from "gatsby"
import { motion } from "framer-motion"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Card, CardActions, CardContent, Box, Grid, Typography } from '@mui/material';

export const Text = ({ _rawContent }) => {

debugger
  const imageWrapper = {
    hovered: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0
      }
    },
    unhovered: {
      opacity: 0,
      y: -10,
    },
  }

  return (
    <Container maxWidth="sm">
      {/* <Grid container spacing={9} justifyContent="flex-end" sx={{py:{xs: 4}}}>
        <Grid item xs={6} md={3}>
          
        </Grid>
      </Grid> */}
      {_rawContent.map((content, i) => {
        
        let contentArray = []
        
          if(content.style.indexOf('h1','h2','h3','h4')){
            contentArray = [...contentArray, <Typography sx={{my: {xs: 7}, maxWidth: '60%'}} variant={content.style}>{content.children.map((child, i) => child.text)}</Typography>]
          } 
          if(content.style === 'normal'){  
            contentArray = [...contentArray, <Typography sx={{my: {xs: 7}}} variant="body1">{content.children.map((child, i) => child.text)}</Typography>]
          }

          return contentArray
        
      })}
      {/* <Typography variant="caption">{_rawContent}</Typography> */}
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