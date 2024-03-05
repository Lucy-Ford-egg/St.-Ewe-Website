import React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Grid,
  Typography,
  useTheme,
  Divider,
} from "@mui/material"
import { RenderPortableText } from "./renderPortableText"
import {TeamTile } from "../components/teamTile"


export const TeamSection = props => {
  const theme = useTheme()
  const {
    teamTiles,
    subtitle,
    _rawTitle,
    _rawLeftText,
    _rawRightText,
    _rawExcerpt,
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
            {definedTeamTiles && (
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
            return (
              <TeamTile key={`${member?.name}-member-${i}`} definedTileColor={definedTileColor} member={member}/>
            )
          })}
        </Grid>
      </Container>
      )}
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
      excerpt
      bio {
        _rawChildren
      }
      name
      position
      linkedIn
    }
    topPadding
  }
`
