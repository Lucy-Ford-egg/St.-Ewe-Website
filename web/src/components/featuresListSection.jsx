import React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  useTheme,
} from "@mui/material"
import { Icons } from "../components/icons"
import { textAlignToJustifyContent } from "../utils/alignment"
import { FeaturesTile } from "./featuresTile"

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
    featuresTile,
  } = props

  return (
    <Container
      maxWidth="xl"
      sx={{ pb: {xs: theme.spacing(0), md: theme.spacing(10)}, pt: topPadding ? 0 : {xs: theme.spacing(10), md: theme.spacing(10)} }}
    >
      <Grid
        container
        rowSpacing={6} 
        columnSpacing={{ xs: 13, sm: 13, md: 13 }}
        sx={{
          px: { xs: 0, sm: theme.spacing(12) },
          justifyContent: textAlignToJustifyContent(textAlign),
        }}
      >
        <Grid item xs={12} sm={12} md={8}>
          <Box>
            <Icons
              type={previewData && previewData.icon ? previewData.icon : icon}
            />
            <Typography
              color="text.primary"
              sx={{ my: { xs: 5 } }}
              variant="h2"
              align={textAlign === "right" ? "left" : textAlign}
            >
              {previewData && previewData.title ? previewData.title : title}
            </Typography>
            { text && <Divider
              component="div"
              role="presentation"
              sx={{
                backgroundColor: theme.palette.primary.main,
                maxWidth: 305,
              }}
            />} 
            <Typography
              color="text.primary"
              sx={{ my: { xs: 5 } }}
              variant="body1"
              align={textAlign === "right" ? "left" : textAlign}
            >
              {previewData && previewData.text ? previewData.text : text}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={6} 
        columnSpacing={{ xs: 13, sm: 6, md: 6 }}
        sx={{
          pt: theme.spacing(12),
          px: { xs: 0, sm: theme.spacing(12) },
        }}
      >
        
          {featuresTile &&
            featuresTile.map((tile, i) => {
              return (
                <Grid item xs={12} sm={6} md={6} lg={3} sx={{flexGrow: 'auto', 
                "&:first-of-type":{
                  pt: {xs: 0, md: theme.spacing(6)}
                }}}>
                <FeaturesTile
                  title={tile.title}
                  text={tile.text}
                  node={tile}
                  link={tile.link}
                  previewData
                  sanityConfig
                />
                 </Grid>
              )
            })}
       
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
    featuresTile {
      title
      text
      link {
        text
        link {
          external
          internal {
            ... on SanityPage {
              id
              slug {
                current
              }
            }
            ... on SanityPost {
              id
            }
          }
        }
      }
      image {
        asset {
          gatsbyImageData(height: 240)
        }
      }
    }
  }
`
