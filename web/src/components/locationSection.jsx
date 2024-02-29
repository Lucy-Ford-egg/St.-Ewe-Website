import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import {
  Container,
  Typography,
  Box,
  useTheme,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { Map } from "./map"
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { RenderPortableText } from "../components/renderPortableText"

export const LocationSection = props => {
  const theme = useTheme()
  const {
    previewData,
    sanityConfig,
    subtitle,
    _rawTitle,
    _rawText,
    geopoint,
    topPadding,
    textAlign,
    sanitySiteSettings,
  } = props

  const definedTopPadding =
    (previewData && previewData?.topPadding) || topPadding
  const definedSubtitle = (previewData && previewData?.subtitle) || subtitle
  const definedTitle = (previewData && previewData?.title) || _rawTitle
  const definedText = (previewData && previewData?.text) || _rawText
  const definedAlign = (previewData && previewData?.textAlign) || textAlign

  const definedSiteSettings = sanitySiteSettings?.companyDetails

  return (
    <Container
      maxWidth="xl"
      sx={{
        pb: { xs: theme.spacing(10), md: theme.spacing(10) },
        pt: definedTopPadding
          ? {
              xs: theme.spacing(10),
              md: theme.spacing(0),
            }
          : { xs: theme.spacing(10), md: theme.spacing(10) },
      }}
    >
      <Grid
        container
        rowSpacing={6}
        justifyContent={definedAlign}
        sx={{
          pb: { xs: 10, md: 15 },
        }}
      >
        <Grid item xs={12} sm={12} md={6}>
          {definedSubtitle && (
            <Typography
              sx={{ mt: { xs: 4, md: 4 }, textAlign: definedAlign }}
              variant="overline"
              component="p"
            >
              {definedSubtitle}
            </Typography>
          )}
          {definedTitle && (
            <>
              <RenderPortableText
                previewData={definedTitle}
                sanityConfig={sanityConfig}
                setAsHeading={false}
                value={definedTitle}
              />
              <Divider
                component="div"
                role="presentation"
                sx={{ borderColor: theme.palette.primary.main, maxWidth: 305 }}
              />
            </>
          )}
          {definedText && (
            <Box sx={{ mt: { xs: 6, md: 12 } }}>
              <RenderPortableText
                previewData={definedText}
                sanityConfig={sanityConfig}
                setAsHeading={false}
                value={definedText}
              />
            </Box>
          )}
        </Grid>
      </Grid>

      <Grid container alignItems="stretch" rowSpacing={{sm: 10, md: 0}}>
        {definedSiteSettings?.map((location, i) => {
          const definedImage = location.image
        
          return (
            <Grid item xs={12} sm={12} md={6}>
              <Grid container columnSpacing={{xs: 4, md: 6}} rowSpacing={{xs: 6, md: 0}} alignItems="stretch" sx={{
                display: "flex",
                flexDirection: {sm: i%2 && "row-reverse", md: "row"}
              }}>
                <Grid item xs={12} sm={6} md={5} sx={{
                  height: {xs: 345, sm: 355, md: 345}
                }}>
                  {definedImage && (
                    <Image
                      // pass asset, hotspot, and crop fields
                      crop={definedImage.crop}
                      hotspot={definedImage?.hotspot}
                      asset={
                        (definedImage?._ref &&
                          urlFor(definedImage).width(255).height(345).url()) ||
                        definedImage.asset
                      }
                      width={255}
                      
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={7} sx={{
                  height: 'min-content',
                  pb: {xs: 10, md: 0}
                }}>
                  <Typography sx={{
                    pl: 10,
                  }} variant="h3">{location?.title}</Typography>
                  { location?.title === "London" && <Typography sx={{fontStyle: "italic", fontSize: 14, fontWeight: 400, pl: 10, pb: 1}} variant="h6" color="text.mid">By appointment only</Typography>}
                  <List disablePadding={false} sx={{mt: 3,}}>
                    {location?.address1 && <ListItem disablePadding>
                      <ListItemIcon sx={{minWidth: 0, pr: 3}}>
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: 24, color: "primary.main"}}>
                        <CiLocationOn style={{width: "100%", height: "auto"}}/>
                        </Box>
                      </ListItemIcon>
                      <ListItemText sx={{my: 0}} primary={location?.address1} />
                    </ListItem>
                    }
                    {location?.address2 && 
                    <ListItem sx={{
                       pl: 11,
                       my: 0
                    }}disablePadding>
                      <ListItemText primary={location?.address2} />
                    </ListItem>
                    }
                    {location?.address3 && 
                    <ListItem sx={{
                       pl: 11,
                       my: 0
                    }}disablePadding>
                      <ListItemText primary={location?.address3} />
                    </ListItem>
                    }
                    {location?.address4 && 
                    <ListItem sx={{
                       pl: 11,
                       my: 0
                    }}disablePadding>
                      <ListItemText primary={location?.address4} />
                    </ListItem>
                    }
                    {location?.county && 
                    <ListItem sx={{
                       pl: 11,
                       my: 0
                    }}disablePadding>
                      <ListItemText primary={`${location?.county} ${location?.postcode}` } />
                    </ListItem>
                    }
                  </List>
                  <List>
                  {location?.phone && 
                    <ListItem disablePadding>
                      <ListItemIcon sx={{minWidth: 0, pr: 3}}>
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: 24, color: "primary.main"}}>
                        <CiPhone style={{width: "100%", height: "auto"}}/>
                        </Box>
                      </ListItemIcon>
                      <ListItemText primary={location?.phone} />
                    </ListItem>
                    }
                  </List>

                  <List>
                  {location?.email && 
                    <ListItem disablePadding>
                      <ListItemIcon sx={{minWidth: 0, pr: 3}}>
                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: 24, color: "primary.main"}}>
                        <CiMail style={{width: "100%", height: "auto"}}/>
                        </Box>
                      </ListItemIcon>
                      <ListItemText primary={location?.email} />
                    </ListItem>
                    }
                  </List>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>

      <Map sanitySiteSettings={definedSiteSettings} />
    </Container>
  )
}

export const query = graphql`
  fragment LocationSectionFragment on SanityLocationSection {
    _key
    _type
    topPadding
    _rawText(resolveReferences: { maxDepth: 10 })
    _rawTitle(resolveReferences: { maxDepth: 10 })
    subtitle
    textAlign
  }
`
export const CompanyQuery = graphql`
  fragment CompanyDetailsFragment on SanitySiteSettings {
    companyDetails {
      geopoint {
        lat
        lng
      }
      county
      title
      address1
      address2
      address3
      address4
      email
      phone
      postcode
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
