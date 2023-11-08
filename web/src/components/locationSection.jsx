import React from "react"
import { graphql } from "gatsby"
import { Icons } from "../components/icons"
import {textAlignToJustifyContent} from '../utils/alignment'
import {
  Container,
  Typography,
  Box,
  useTheme,
  Grid,
  Divider,
} from "@mui/material"
import { Map } from "./map"


export const LocationSection = props => {
  const theme = useTheme()
  const { previewData, sanityConfig,icon, subtitle, title, text, geopoint, topPadding, textAlign } = props

  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: { xs: theme.spacing(10), md: theme.spacing(10) },
        pt: topPadding
          ? {
              xs: theme.spacing(10),
              md: theme.spacing(0),
            }
          : { xs: theme.spacing(10), md: theme.spacing(10) },
      }}
    >
      <Grid
        container
        rowSpacing={{ xs: 6, sm: 6, md: 6 }}
        // columnSpacing={{ xs: 13, sm: 13, md: 13 }}
        direction="row"
        justifyContent={textAlignToJustifyContent(textAlign)}
        sx={{
          
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: textAlignToJustifyContent(textAlign)
          }}>
            {icon && (
              <Icons
                type={previewData && previewData.icon ? previewData.icon : icon}
              />
            )}

            {subtitle && (
              <Typography
                align={textAlign}
                sx={{ mt: { xs: 4, md: 4 } }}
                variant="overline"
                component="p"
              >
                {previewData && previewData.subtitle
                  ? previewData.subtitle
                  : subtitle}
              </Typography>
            )}

            { title && <Typography align={textAlign} variant="h2">
              {previewData && previewData.title ? previewData.title : title}
            </Typography>
            }
            {text && (
              <Divider
                component="div"
                role="presentation"
                sx={{
                  borderColor: theme.palette.primary.main,
                  width: 305,
                  mx: textAlign === 'center' ? 'auto' : 'unset'
                }}
              />
            )}
            {text && <Typography
             align={textAlign}
              sx={{ py: { xs: 5, md: 6 } }}
              variant="body1"
            >
              {previewData && previewData.text ? previewData.text : text}
            </Typography>
            }
          </Box>
        </Grid>
      </Grid>
      
      <Map geopoint={geopoint}/>
      
    </Container>
  )
}

export const query = graphql`
  fragment LocationSectionFragment on SanityLocationSection {
    _key
    _type
    topPadding
    title
    textAlign
    text
    subtitle
    icon
    geopoint {
      lng
      lat
      alt
    }
  }
`
