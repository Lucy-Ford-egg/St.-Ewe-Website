import React, {useMemo } from 'react'
import { graphql } from "gatsby"
import { Container, Grid } from '@mui/material'
import {TitleSubtitleText} from '../components/titleSubtitleText'
import {CategoryFeatureTile} from '../components/categoryFeatureTile'

export const CategoryFeature = ({categories, gridTitleSubtitleText, columns }) => {

  const titleSubtitle = useMemo(() => <TitleSubtitleText {...gridTitleSubtitleText}/>, [])
  return (
    <Container maxWidth="false" sx={{ px: { xs: 0 }, py: { xs: 9, md: 9 }}}>
      <Container maxWidth="xl">

          
          {titleSubtitle}
          <Grid container spacing={9} rowSpacing={6}>
            {categories && categories.map((node, i) => {

              return (
                <CategoryFeatureTile node={node} i={i}/>
              )
            })}
          </Grid>

  
      </Container>
    </Container>
  )

}

export const query = graphql`
  fragment CategoryFeatureFragment on SanityCategoryFeature {
    _key
    _type
    gridTitleSubtitleText {
      ...TitleSubtitleTextFragment
    }
    ... CategoryFeatureTileFragment
  }
`

