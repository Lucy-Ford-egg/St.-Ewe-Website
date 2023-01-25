import React from 'react'
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

export const PlaceTile = ({category}) => {
  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        title="green iguana"
      />
      <GatsbyImage style={{minHeight: 'inherit'}} image={getImage(carousel[imageIndex].image.asset.gatsbyImageData)} alt="alt tag" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

}

export const query = graphql`
  fragment PlaceFragment on SanityPlacesGrid {
    _key
    _type
    reference {
      coverImage {
        asset {
          gatsbyImageData(width: 1440, height: 765)
        }
      }
      title
      categories {
        name
      }
    }
  }
`