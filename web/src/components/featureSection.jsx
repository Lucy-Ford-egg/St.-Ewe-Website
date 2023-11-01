import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { Container, Grid, Typography, Box, Divider, useTheme } from "@mui/material"
import {Icons} from '../components/icons'
import { ButtonFormat } from "./buttonFormat"

export const FeatureSection = props => {
  const theme = useTheme()
  const {
    title,
    icon,
    text,
    image,
    linkGroup,
    previewData,
    sanityConfig,
    mirror,
    topPadding,
    subtitle,
    links,
    highlighted,
  } = props

  const textColour = highlighted ? theme.palette.background.default : theme.palette.text.main
  const containerPx = highlighted ? { xs: theme.spacing(10), md: theme.spacing(6) } : false
  const containerPy = highlighted ? { xs: theme.spacing(10), md: theme.spacing(10) } : false
   return (
    <Container maxWidth={highlighted ? 'fluid' : 'xl'} 
      sx={{
        pb: {xs: theme.spacing(0), md: highlighted ? theme.spacing(16) : theme.spacing(10)}, 
        pt: topPadding ? 0 : { xs: theme.spacing(10), md: highlighted ? theme.spacing(16) : theme.spacing(10) },
        backgroundColor: highlighted ? theme.palette.secondary.main : 'transparent',
        }}>
      <Container sx={{
        py: containerPy,
        px: containerPx,
        border: highlighted ? `1px solid ${theme.palette.background.default}` : `unset`,
        
      }}>
      <Grid container rowSpacing={6} columnSpacing={{ xs: 13, sm: 13, md: 13 }} direction={mirror ? 'row-reverse' : 'row'} sx={{
        px: {xs: 0, sm: theme.spacing(12)}, alignItems: 'center',
        
      }}>
        <Grid item xs={12} sm={12} md={6}>
          <Box>
            {image && (
              <GatsbyImage
                image={
                  getGatsbyImageData(
                    previewData?.image?.asset?._ref,
                    { maxWidth: 1440 },
                    sanityConfig,
                  ) || getImage(image?.asset)
                }
                layout="constrained"
                aspectRatio={133 / 8}
                alt={image.asset?.altText}
                style={{
                  minHeight: "100%",
                  gridColumn: "1/25",
                  gridRow: "1/auto",
                  borderRadius: theme.spacing(2)
                }}
                
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{pb: highlighted ? theme.spacing(10) : `unset`,}}>
          <Icons type={previewData && previewData.icon ? previewData.icon : icon}/>
            <Typography
              color={textColour}
              sx={{ my: { xs: 5 } }}
              variant="h2"
            >
              {previewData && previewData.title ? previewData.title : title}
            </Typography>
            <Divider component="div" role="presentation" sx={{borderColor: highlighted ? theme.palette.background.default : theme.palette.primary.main , maxWidth: 305}}/>
            <Typography
              color={textColour}
              sx={{  my: { xs: 5 } }}
              variant="body1"
            >
              {previewData && previewData.text ? previewData.text : text}
            </Typography>

            <Box sx={{ width: 'fit-content', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', flexBasis: '100%', columnGap: 6 }}>
              {links && links.map((node, i) => {
                
                return (
                  <ButtonFormat variant={i === 0 ? 'contained' : 'outlined'} color={i === 0 ? 'primary' : 'tertiary'} node={previewData && previewData.node ? previewData.node : node} sx={{}}/>
                )
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>
      </Container>
    </Container>
  )
}

export const query = graphql`
  fragment FeatureSectionFragment on SanityFeatureSection {
    _key
    _type
    image {
      asset {
        gatsbyImageData
      }
    }
    icon
    subtitle
    title
    text
    links {
      link {
        internal {
          ... on SanityPage {
            id
            slug {
              current
            }
          }
          ... on SanityPost {
            id
            slug {
              current
            }
          }
        }
        external
      }
      text
    }
    mirror
    topPadding
    highlighted
  }
`
