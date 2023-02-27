import React from "react"
import { graphql } from "gatsby"
import { Container, Typography, Box } from "@mui/material"
import { AnimatedText } from "./animatedText"
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme"
import {ArchIcon} from "../components/archIcon"

export const TitleSubtitleText = ({ displayTitle, subtitle, text, subtitlePosition, titleSize, adornment }) => {

  return (
    <Container maxWidth={false} sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        {subtitlePosition === null && (
          <Typography
            variant="subtitle1"
            color="primary.main"
            align="center"
            sx={{ pb: { xs: 5 } }}
          >
            {subtitle}
          </Typography>
        )}
        <AnimatedText subtitlePosition={subtitlePosition} title={displayTitle} titleSize={titleSize ? titleSize : "h2"} />
        {subtitlePosition && (
          <Typography variant="subtitle2" color="primary.main" align="center" sx={{ pb: subtitlePosition !== null ? 8 : 8 }}>
            {subtitle}
          </Typography>
        )}
      </Container>

      <Container maxWidth="sm">
        <Typography align="center" variant="body1">{text}</Typography>
      </Container>

      {adornment &&
        <Container maxWidth="sm" sx={{py: {xs: 6}}}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box display="span" sx={{ width: "85px", borderBottom: `1px solid ${clientTheme.palette.secondary.main}`, mx: {xs: 7} }}></Box>
            <ArchIcon />
            <Box display="span" sx={{ width: "85px", borderBottom: `1px solid ${clientTheme.palette.secondary.main}`, mx: {xs: 7} }}></Box>
          </Box>
        </Container>
      }

    </Container>
  )
}

export const query = graphql`
  fragment TitleSubtitleTextFragment on SanityTitleSubtitleText {
      subtitle
      subtitlePosition
      text
      displayTitle {
        _rawChildren(resolveReferences: {maxDepth: 10})
      }
      
  }
`
