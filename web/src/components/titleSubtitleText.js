import React from "react"
import { graphql } from "gatsby"
import { Container, Typography, Box } from "@mui/material"
import { AnimatedText } from "./animatedText"
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme"
import {ArchIcon} from "../components/archIcon"
import { renderTaxonomies, renderLocation } from "../utils/metaDataHelpers"

export const TitleSubtitleText = ({ disableTopPadding, displayTitle, subtitle, text, subtitlePosition, titleSize, showAdornment, placeLocation = '', postCategory = '' }) => {

  const renderSubtitle = () => {
    return placeLocation ? placeLocation && renderLocation(placeLocation) : postCategory && renderTaxonomies(postCategory)
  }
  return (
    <>{displayTitle && <Container className="section titleSubtitleText" maxWidth={false} sx={{ pt: { xs: disableTopPadding === true ? 0 : 10, md: disableTopPadding === true ? 0 :11 } }}>
      <Container maxWidth="md">
        {subtitlePosition === false && (
          <Typography
            variant="subtitle1"
            component="h5"
            color="primary.main"
            align="center"
            sx={{ pb: { xs: 5 } }}
          >
            {subtitle}
          </Typography>
        )}
        { displayTitle  && <AnimatedText subtitlePosition={subtitlePosition} displayTitle={displayTitle} titleSize={titleSize ? titleSize : "h2"} />}
        
          {subtitle && subtitlePosition === true && <Typography component="h6" variant="subtitle2" color="primary.main" align="center"  sx={{ pb: { xs: 5, md: 8 } }}>
            {subtitle ? subtitle : renderSubtitle()}
          </Typography> }
        
      </Container>

      {text && <Container maxWidth="sm">
        <Typography align="center" variant="body1">{text}</Typography>
      </Container>}

      
      {showAdornment && <Container maxWidth="sm" sx={{py: {xs: 6}}}>
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box display="span" sx={{ width: "85px", borderBottom: `1px solid ${clientTheme.palette.secondary.main}`, mx: {xs: 7} }}></Box>
            <ArchIcon />
            <Box display="span" sx={{ width: "85px", borderBottom: `1px solid ${clientTheme.palette.secondary.main}`, mx: {xs: 7} }}></Box>
          </Box>
         
        </Container>
     }

    </Container>
    }</>
  )
}

export const query = graphql`
  fragment TitleSubtitleTextFragment on SanityTitleSubtitleText {
      subtitle
      subtitlePosition
      text
      displayTitle :  _rawDisplayTitle(resolveReferences: {maxDepth: 10})
      showAdornment
  }
`
