import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import {
  Container,
  Grid,
  Typography,
  useTheme,
  Divider,
  Box,
  Button,
  IconButton,
} from "@mui/material"
import { RenderPortableText } from "./renderPortableText"
import { CiMail, CiLinkedin } from "react-icons/ci"

export const TeamSection = props => {
  const theme = useTheme()
  const {
    teamTiles,
    subtitle,
    title,
    _rawLeftText,
    _rawRightText,
    linkGroup,
    previewData,
    sanityConfig,
    topPadding,
    links,
    tileColor,
  } = props
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          pt: topPadding
            ? 0
            : {
                xs: theme.spacing(15),
                md: theme.spacing(15),
              },
          mt: topPadding ? 0 : 0,
        }}
      >
        <Grid container sx={{ pb: 15 }} rowSpacing={6}>
          <Grid item xs={12} md={7}>
            {subtitle && (
              <Typography color="primary" variant="overline">
                {subtitle}
              </Typography>
            )}
            <Typography
              variant="h1"
              sx={{
                py: 4,
              }}
            >
              {title}
            </Typography>
            <Divider
              sx={{
                borderColor: "primary.main",
                mb: 5,
                maxWidth: 307,
              }}
            />
            {_rawLeftText && (
              <RenderPortableText
                previewData={previewData}
                sanityConfig={sanityConfig}
                variant={false}
                value={
                  previewData && previewData._rawLeftText
                    ? _rawLeftText
                    : _rawLeftText
                }
              />
            )}
          </Grid>
          <Grid item xs={12} md={5} sx={{ alignSelf: "flex-end" }}>
            {_rawRightText && (
              <RenderPortableText
                previewData={previewData}
                sanityConfig={sanityConfig}
                variant={false}
                value={
                  previewData && previewData._rawRightText
                    ? _rawRightText
                    : _rawRightText
                }
              />
            )}
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl" sx={{  pb: {
            xs: theme.spacing(15),
            md: theme.spacing(15),
          }, 
          paddingRight: { xs: "0 !important", overflowX: "hidden", maxWidth: '100vw' } }}>
        <Grid
          container
          columnSpacing={6}
          rowSpacing={6}
          sx={{
            flexDirection: { xs: "row", md: "row" },
            flexWrap: "nowrap",
            overflowX: {xs: 'scroll', md: 'unset'},
            scrollSnapType: {xs: 'x mandatory', md: 'unset'},
            scrollSnapAlign: 'center',
          }}
        >
          {teamTiles.map((member, i) => {
            let image = member.image
            let memberShortName = member.name.split(" ")
            return (
              <Grid
                key={`${member.name}-member-${i}`}
                item
                xs="auto"
                md={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: 312 },
                  flexBasis: { xs: 312 },
                }}
              >
                {image && (
                  <Image
                    // pass asset, hotspot, and crop fields
                    crop={
                      (previewData && previewData?.image?.crop) || image?.crop
                    }
                    hotspot={
                      (previewData && previewData?.image?.hotspot) ||
                      image?.hotspot
                    }
                    asset={
                      (previewData &&
                        previewData.image &&
                        previewData.image?._ref &&
                        urlFor(previewData.image).width(250).url()) ||
                      image.asset
                    }
                    width={312}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: 220,
                      //flexGrow: 1,
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "secondary.main",
                    py: 5,
                    px: 5,
                    flexGrow: 1,
                  }}
                >
                  <Box sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end'}}>
                  {member.position && (
                    <Typography color="white.main" variant="overline">
                      {member.position}
                    </Typography>
                  )}
                  </Box>
                  <Divider
                    sx={{
                      borderColor: "white.main",
                      my: 5,
                    }}
                  />
                  {member.name && (
                    <Typography color="white.main" variant="h4">
                      {member.name}
                    </Typography>
                  )}
                  <Divider
                    sx={{
                      borderColor: "white.main",
                      my: 5,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          pr: 3,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <CiMail color="white" />
                      </Box>
                      <Typography
                        variant="caption"
                        color="white.main"
                        component="p"
                        sx={{
                          fontStyle: "italic",
                        }}
                      >{`Email ${memberShortName[0]}`}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {member.linkedIn && (
                        <IconButton
                          size="small"
                          href={member.linkedIn}
                          color="white"
                          aria-label={`Go to ${member.name} linkedIn profile`}
                        >
                          <CiLinkedin />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

export const query = graphql`
  fragment TeamSectionFragment on SanityTeamSection {
    _key
    _type
    _rawLeftText(resolveReferences: { maxDepth: 10 })
    _rawRightText(resolveReferences: { maxDepth: 10 })
    subtitle
    title
    tileColor {
      value
    }
    teamTiles {
      email
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
      bio {
        _rawChildren
      }
      excerpt
      name
      position
      linkedIn
    }
    topPadding
  }
`
