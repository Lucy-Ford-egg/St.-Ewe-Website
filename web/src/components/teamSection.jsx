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
import { contrastColour } from "../utils/contrastColour"

export const TeamSection = props => {
  const theme = useTheme()
  const {
    teamTiles,
    subtitle,
    _rawTitle,
    _rawLeftText,
    _rawRightText,
    title,
    leftText,
    rightText,
    linkGroup,
    previewData,
    sanityConfig,
    topPadding,
    links,
    tileColor,
  } = props

  
  const definedTopPadding =
    (previewData && previewData?.topPadding) || topPadding
  const definedSubtitle = (previewData && previewData?.subtitle ) || subtitle
  const definedTitle = (previewData && previewData?.title) || title || _rawTitle 

  const definedLeftText = (previewData && previewData?.leftText) || leftText || _rawLeftText
  const definedRightText = (previewData && previewData?.rightText) || rightText || _rawRightText
  const definedTeamTiles = (previewData && previewData?.teamTiles) || teamTiles
  const definedTileColor = (previewData && previewData?.tileColor) || tileColor

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          pt: definedTopPadding
            ? 0
            : {
                xs: theme.spacing(15),
                md: theme.spacing(15),
              },
          mt: topPadding ? 0 : 0,
        }}
      >
        <Grid container sx={{ pb: 15 }} rowSpacing={6} columnSpacing={16}>
          <Grid item xs={12} md={7}>
            {definedSubtitle && (
              <Typography color="primary" variant="overline">
                {definedSubtitle}
              </Typography>
            )}

            {definedTitle && (
              <RenderPortableText
                previewData={definedTitle}
                sanityConfig={sanityConfig}
                setAsHeading={false}
                value={definedTitle}
              />
            )}
            <Divider
              sx={{
                borderColor: "primary.main",
                mb: 5,
                maxWidth: 307,
              }}
            />
            {definedLeftText && (
              <RenderPortableText
                previewData={definedLeftText}
                sanityConfig={sanityConfig}
                variant={false}
                value={definedLeftText}
              />
            )}
          </Grid>
          <Grid item xs={12} md={5} sx={{ alignSelf: "flex-end" }}>
            {definedRightText && (
              <RenderPortableText
                previewData={definedRightText}
                sanityConfig={sanityConfig}
                variant={false}
                value={definedRightText}
              />
            )}
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth="xl"
        sx={{
          pb: {
            xs: theme.spacing(15),
            md: theme.spacing(15),
          },
          paddingRight: {
            xs: "0 !important",
            overflowX: "hidden",
            maxWidth: "100vw",
          },
        }}
      >
        <Grid
          container
          columnSpacing={6}
          rowSpacing={6}
          sx={{
            flexDirection: { xs: "row", md: "row" },
            flexWrap: "nowrap",
            overflowX: { xs: "scroll", md: "unset" },
            scrollSnapType: { xs: "x mandatory", md: "unset" },
            scrollSnapAlign: "center",
          }}
        >
          {definedTeamTiles && definedTeamTiles?.map((member, i) => {
            let image = member?.image
            let memberShortName = member?.name.split(" ")
            return (
              <Grid
                key={`${member?.name}-member-${i}`}
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
                    crop={image?.crop}
                    hotspot={image?.hotspot}
                    asset={(image?._ref && urlFor(image).width(250).url()) || image.asset }
                    width={312}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: 220,
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: definedTileColor.value,
                    py: 5,
                    px: 5,
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    {member.position && (
                      <Typography color={contrastColour(definedTileColor).textColour} variant="overline">
                        {member.position}
                      </Typography>
                    )}
                  </Box>
                  <Divider
                    sx={{
                      borderColor: contrastColour(definedTileColor).textColour,
                      my: 5,
                    }}
                  />
                  {member.name && (
                    <Typography color={contrastColour(definedTileColor).textColour} variant="h4">
                      {member.name}
                    </Typography>
                  )}
                  <Divider
                    sx={{
                      borderColor: contrastColour(definedTileColor).textColour,
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
                          color: contrastColour(definedTileColor).textColour,
                        }}
                      >
                        <CiMail style={{color: "inherit"}}/>
                      </Box>
                      <Typography
                        variant="caption"
                        color={contrastColour(definedTileColor).textColour}
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
                          aria-label={`Go to ${member.name} linkedIn profile`}
                          sx={{
                            color: contrastColour(definedTileColor).textColour,
                          }}
                        >
                          <CiLinkedin style={{color: "inherit"}}/>
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
    _rawTitle(resolveReferences: { maxDepth: 10 })
    _rawLeftText(resolveReferences: { maxDepth: 10 })
    _rawRightText(resolveReferences: { maxDepth: 10 })
    subtitle
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
