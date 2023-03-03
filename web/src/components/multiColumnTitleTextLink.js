import React from 'react'
import { graphql } from "gatsby"
import { Container, Grid, Box } from '@mui/material'
import { RenderPortableText } from './renderPortableText'
import ButtonLink from "../utils/buttonLink"

export const MultiColumnTitleTextLink = ({ columns, linkGroup }) => {

  return (
    <Container className="section multiColumnTitleTextLink" maxWidth="false" sx={{ px: { xs: 0 }, mt: { xs: 2, md: 11 }, backgroundColor: 'primary.main' }}>
      
        <Container maxWidth="lg" sx={{py: { xs: 2, md: 11 }}}>
          <Grid container spacing={9} rowSpacing="0px">
            {columns && columns.map((node, i) => {

              return (
                <Grid key={`column-${i}`} item xs={12} md={6}>
                  <Box sx={{ maxWidth: { xs: '100%', md: '80%' }, mb: { xs: 4 } }}>
                    <RenderPortableText variant="h3" value={node._rawTitle} />
                  </Box>
                  <RenderPortableText variant={false} value={node._rawText} />
                </Grid>
              )
            })}
            <Grid item xs={12}>
              <ButtonLink linkGroup={linkGroup} variant="contained" color="secondary" />
            </Grid>
          </Grid>

        </Container>
    
    </Container>
  )

}

export const query = graphql`
  fragment MultiColumnTitleTextLinkFragment on SanityTwoColumnTitleTextCta {
    _key
    _type
    linkGroup {
      externalLinkGroup {
        label
        href
        blank
      }
      internalLinkGroup {
        label
        reference {
          ... on SanityNews {
            id
            slug {
              current
            }
          }
          ... on SanityPlace {
            id
            slug {
              current
            }
          }
          ... on SanityPage {
            id
            slug {
              current
            }
          }
        }
      }
    }
    columns {
      _rawTitle(resolveReferences: {maxDepth: 10})
      _rawText(resolveReferences: {maxDepth: 10})
      _key
      _type

    }
  }
`