import React from 'react'
import { graphql } from "gatsby"
import { Container, Typography } from '@mui/material';
import { RenderPortableText } from './renderPortableText';
import clientTheme from '../gatsby-theme-material-ui-top-layout/theme';

export const Text = ({ _rawContent }) => {

  return (
    <Container maxWidth="xl" sx={{py: {xs: 6, md: 6} }}>
      <Container maxWidth="sm">
        <RenderPortableText variant={false} value={_rawContent} textColor={clientTheme.palette.secondary.main} />
        {/* {.map((content, i) => {

          let contentArray = []

            if(content.style.indexOf('h1','h2','h3','h4')){
              contentArray = [...contentArray, <Typography sx={{my: {xs: 7}, maxWidth: 'max-content'}} variant={content.style}>{content.children.map((child, i) => child.text)}</Typography>]
            } 
            if(content.style === 'normal'){  
              contentArray = [...contentArray, <Typography sx={{my: {xs: 7}}} variant="body1">{content.children.map((child, i) => child.text)}</Typography>]
            }

            return contentArray
          
        })} */}
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