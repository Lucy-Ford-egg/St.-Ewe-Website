import React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { Icons } from "../components/icons"
import { textAlignToJustifyContent } from "../utils/alignment"
import { ServicesTile } from "./servicesTile"
import {Carousel} from './carousel'

export const ServicesSection = props => {
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
    servicesTile,
  } = props

  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: { xs: theme.spacing(10), md: theme.spacing(10) },
        pt: topPadding ? {
          xs: theme.spacing(10),
          md:  theme.spacing(0),
        } : { xs: theme.spacing(10), md: theme.spacing(10) },
      }}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: textAlignToJustifyContent(textAlign),
            }}
          >
            {icon && (
              <Icons
                type={previewData && previewData.icon ? previewData.icon : icon}
              />
            )}

            {subtitle && (
              <Typography
                color="text.primary"
                sx={{ mt: { xs: 4, md: 4 } }}
                variant="overline"
                component="p"
              >
                {previewData && previewData.subtitle
                  ? previewData.subtitle
                  : subtitle}
              </Typography>
            )}

            {title && (
              <Typography
                color="text.primary"
                variant="h2"
                align={textAlign === "left" ? "left" : "center"}
              >
                {previewData && previewData.title ? previewData.title : title}
              </Typography>
            )}

            {text && (
              <Divider
                component="div"
                role="presentation"
                sx={{
                  borderColor: theme.palette.primary.main,
                  maxWidth: 305,
                  width: 305,
                  display: 'flex'
                }}
              />
            )}
            {text && (
              <Typography
                color="text.primary"
                sx={{ py: { xs: 5, md: 6 } }}
                variant="body1"
                align={textAlign === "left" ? "left" : "center"}
              >
                {previewData && previewData.text ? previewData.text : text}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      {mobile && <Carousel previewData={previewData} sanityConfig={sanityConfig} tiles={servicesTile}/>}

      {!mobile && <Grid
        container
        rowSpacing={6}
        columnSpacing={{ xs: 13, sm: 6, md: 6 }}
        sx={{
          pt: theme.spacing(12),
          px: { xs: 0, sm: theme.spacing(12) },
        }}
      >
        {servicesTile &&
          servicesTile.map((tile, i) => {
            return (
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                sx={{
                  flexGrow: "auto",
                  "&:first-of-type": {
                    pt: { xs: 0, md: theme.spacing(6) },
                  },
                }}
              >
                <ServicesTile
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
      </Grid>}
    </Container>
  )
}

export const query = graphql`
  fragment ServicesSectionFragment on SanityServicesSection {
    _key
    _type
    icon
    subtitle
    text
    textAlign
    title
    topPadding
    servicesTile {
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
