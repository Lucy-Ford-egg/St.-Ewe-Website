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
          {icon && <Icons
                  type={
                    previewData && previewData.icon ? previewData.icon : icon
                  }
                />}

                {subtitle && <Typography
                  color='text.main'
                  sx={{ mt: { xs: 4, md: 4  }}}
                  variant="overline"
                  component='p'
                >
                  {previewData && previewData.subtitle ? previewData.subtitle : subtitle}
                </Typography>}

                <Typography
                  color='text.main'
                  variant="h2"
                >
                  {previewData && previewData.title ? previewData.title : title}
                </Typography>
                {text && <Divider
                  component="div"
                  role="presentation"
                  sx={{
                    borderColor: theme.palette.primary.main,
                    maxWidth: 305,
                  }}
                />}
                {text && <Typography
                  color='text.main'
                  sx={{ py: { xs: 5, md: 6 } }}
                  variant="body1"
                >
                  {previewData && previewData.text ? previewData.text : text}
                </Typography>
}
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={6} 
        columnSpacing={{ xs: 13, sm: 6, md: 6 }}
        sx={{
          pt: theme.spacing(6),
          px: { xs: 0, sm: theme.spacing(12) },
        }}
      >
        
          {featuresTile &&
            featuresTile.map((tile, i) => {
              return (
                <Grid item xs={12} sm={6} md={6} lg={featuresTile.length === 3 ? 4 : 3} sx={{flexGrow: 'auto', 
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
          _id
          gatsbyImageData
        }
        hotspot {
          x
          y
          width
          height
        }
        crop {
          bottom
          left
          right
          top
        }
      }
    }
  }
`
