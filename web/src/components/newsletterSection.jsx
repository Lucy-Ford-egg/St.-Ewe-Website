import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { Container, Box, useTheme, Typography, Grid, Divider } from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { contrastColour } from "../utils/contrastColour"
import { MailchimpList } from "./mailchimpList"

export const NewsletterSection = props => {
  const {
    title,
    text,
    image,
    previewData,
    sanityConfig,
    topPadding,
    backgroundColor,
  } = props

  const theme = useTheme()

  return (
    <Container
      maxWidth="xl"
      disableGutters="true"
      sx={{
        //backgroundColor: theme.palette.background.main,
        pt: topPadding
          ? 0
          : {
              xs: theme.spacing(10),
              md: theme.spacing(14),
            },
        pb: {
          xs: theme.spacing(0),
          md: theme.spacing(14),
        },
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            backgroundColor: backgroundColor.value,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              px: { xs: 4, md: 11 },
              py: { xs: 8, md: 15 },
            }}
          >
            <Typography
              color={contrastColour(backgroundColor).textColour}
              variant="h2"
            >
              {previewData && previewData.title ? previewData.title : title}
            </Typography>

            <Divider
                sx={{
                  display: "flex",
                  my: 10,
                  width: "19.1875rem",
                  borderColor: contrastColour(backgroundColor).divider.hex,
                }}
              />

            <Typography
              color={contrastColour(backgroundColor).textColour} 
              variant="body1"
            >
              {previewData && previewData.text ? previewData.text : text}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{
            display: 'grid',
            gridTemplateCoumns: 'repeat(7, 1fr)',
            height: "100%",
            alignItems: 'center',
          }}>
          {image && (
            <Image
              // pass asset, hotspot, and crop fields
              crop={(previewData && previewData?.image?.crop) || image?.crop}
              hotspot={
                (previewData && previewData?.image?.hotspot) || image?.hotspot
              }
              asset={
                (previewData &&
                  previewData.image &&
                  previewData.image?._ref &&
                  urlFor(previewData.image).width(200).url()) ||
                image.asset
              }
              width={1330}
              height={515}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                flexGrow: 1,
                minHeight: "100%",
                gridColumn: "1/7",
                gridRow: "1/auto",
              }}
            />
          )}
          <Grid container item xs={10} md={12} sx={{
            gridColumn: "1/7",
            gridRow: "1/auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Grid item xs={10} md={8} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "primary.lighter",
            py: {xs: 6, md: 12},
            px: {xs: 6, md: 12},
          }}>
            <MailchimpList />
          </Grid>
          
          </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export const query = graphql`
  fragment NewsletterSectionFragment on SanityNewsletterSection {
    _key
    _type
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
    title
    text
    backgroundColor {
      value
      label
    }
    topPadding
  }
`
