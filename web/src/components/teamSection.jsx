import React from "react"
import { graphql } from "gatsby"
import { Container, Grid, Typography, useTheme, Divider } from "@mui/material"
import { RenderPortableText } from "./renderPortableText"
import { TeamTile } from "../components/teamTile"

export const TeamSection = props => {
  const theme = useTheme()
  const {
    teamTiles,
    subtitle,
    title,
    _rawTitle,
    _rawLeftText,
    _rawRightText,
    leftText,
    rightText,
    previewData,
    sanityConfig,
    topPadding,
    tileColor,
    _type,
  } = props

  const definedTopPadding =
    (previewData && _type === previewData?._type && previewData?.topPadding) ||
    topPadding
  const definedSubtitle =
    (previewData && _type === previewData?._type && previewData?.subtitle) ||
    subtitle
  const definedTitle =
    (previewData && _type === previewData?._type && previewData?.title) ||
    title ||
    _rawTitle

  const definedLeftText =
    ((_type === previewData?._type) && (previewData && previewData?.leftText)) ||
    leftText ||
    _rawLeftText
  const definedRightText =
    ((_type === previewData?._type) && (previewData && previewData?.rightText)) ||
    rightText ||
    _rawRightText
  const definedTeamTiles =
    ((_type === previewData?._type) && (previewData && previewData?.teamTiles)) ||
    teamTiles
  const definedTileColor =
    ((_type === previewData?._type) && (previewData && previewData?.tileColor)) ||
    tileColor

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
            alignItems="stretch"
            sx={{
              flexDirection: { xs: "row", sm: "row", md: "row", lg: "row" },
              flexWrap: "nowrap",
              overflowX: {
                xs: "scroll",
                sm: "scroll",
                md: "scroll",
                lg: "scroll",
              },
              scrollSnapType: {
                xs: "x mandatory",
                sm: "x mandatory",
                md: "x mandatory",
                lg: "x mandatory",
              },
              scrollSnapAlign: "center",
            }}
          >
            {definedTeamTiles &&
              definedTeamTiles?.map((member, i) => {
                return (
                  <TeamTile
                    key={`${member?.name}-member-${i}`}
                    definedTileColor={definedTileColor}
                    member={member}
                  />
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
      label
      value
    }
    teamTiles {
      email
      tileImage {
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
