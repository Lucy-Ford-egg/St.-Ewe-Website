import React from "react"
import { graphql } from "gatsby"
import Vimeo from '@u-wave/react-vimeo';
import { Container, Grid, Box, useTheme } from "@mui/material"

import 'react-html5video/dist/styles.css';


export const VideoSection = props => {
  const theme = useTheme()
  const {
    previewData,
    sanityConfig,
    topPadding,
    video,
  } = props

  return (
    <Container maxWidth="xl" sx={{pb: theme.spacing(10), pt: topPadding ? 0 : theme.spacing(10)}}>
      <Grid container sx={{
        px: {xs: 0, sm: theme.spacing(12)}, alignItems: 'center'
      }}>
        <Grid item xs={12} sm={12}>
          <Box sx={{iframe: {width: '100%'}}}>
            {video && (
             <Vimeo
             video={video.url}
             autoplay
             width="100%"
             height={`749px`}
             controls={true}
             playsInline={true}
           />
              // <GatsbyImage
              //   image={
              //     getGatsbyImageData(
              //       previewData?.image?.asset?._ref,
              //       { maxWidth: 1440 },
              //       sanityConfig,
              //     ) || getImage(image?.asset)
              //   }
              //   layout="constrained"
              //   aspectRatio={133 / 8}
              //   alt={image.asset?.altText}
              //   style={{
              //     minHeight: "100%",
              //     gridColumn: "1/25",
              //     gridRow: "1/auto",
              //     borderRadius: theme.spacing(2)
              //   }}
                
              // />
            )}
          </Box>
        </Grid>

      </Grid>
    </Container>
  )
}

export const query = graphql`
  fragment VideoSectionFragment on SanityVideoSection {
    _key
    _type
    video {
      url
      id
      service
    }
  }
`
