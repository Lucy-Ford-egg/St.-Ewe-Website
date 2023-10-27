import React from "react"
import { graphql } from "gatsby"
import { Container, Grid, Typography, Box, Divider, useTheme } from "@mui/material"
import {Icons} from '../components/icons'
import {textAlignToJustifyContent} from '../utils/alignment'

export const FeaturesListSection = props => {
  const theme = useTheme()
  const {
    title,
    text,
    image,
    linkGroup,
    previewData,
    sanityConfig,
    mirror,
    topPadding,
    icon,
    subtitle,
    textAlign,
  } = props

  return (
    <Container maxWidth="xl" sx={{pb: theme.spacing(10), pt: topPadding ? 0 : theme.spacing(10)}}>
      <Grid container columnSpacing={13} sx={{
        px: {xs: 0, sm: theme.spacing(12)}, justifyContent: textAlignToJustifyContent(textAlign)
      }}>
        <Grid item xs={12} sm={12} md={6}>
          <Box>
          <Icons type={previewData && previewData.icon ? previewData.icon : icon}/>
            <Typography
              color="text.primary"
              sx={{ my: { xs: 5 } }}
              variant="h2"
              align={textAlign === 'right' ? 'left' : textAlign}
            >
              {previewData && previewData.title ? previewData.title : title}
            </Typography>
            <Divider component="div" role="presentation" sx={{backgroundColor: theme.palette.primary.main, maxWidth: 305}}/>
            <Typography
              color="text.primary"
              sx={{  my: { xs: 5 } }}
              variant="body1"
              align={textAlign === 'right' ? 'left' : textAlign}
            >
              {previewData && previewData.text ? previewData.text : text}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export const query = graphql`
  fragment FeaturesListSectionFragment on SanityFeaturesListSection {
    _key
  _type
  icon
  subtitle
  text
  textAlign
  title
  topPadding
  }
`