import React from 'react'
import { graphql } from "gatsby"
import { Container, Typography } from '@mui/material';
import { RenderPortableText } from './renderPortableText';
import clientTheme from '../gatsby-theme-material-ui-top-layout/theme';

export const Text = ({ _rawContent }) => {

  return (
    <Container className="section text" maxWidth="xl" sx={{pt: {xs: 6, md: 11} }}>
      <Container maxWidth="sm">
        <RenderPortableText variant={false} value={_rawContent} textColor={clientTheme.palette.secondary.main} />
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