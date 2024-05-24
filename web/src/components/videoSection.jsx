import React from "react"
import { graphql } from "gatsby"
import Vimeo from '@u-wave/react-vimeo';
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material"
import 'react-html5video/dist/styles.css';


export const VideoSection = props => {
  const theme = useTheme()
  const {
    topPadding,
    video,
  } = props

  return (
    <Container maxWidth="lg" sx={{pb: {xs: theme.spacing(0), md: theme.spacing(10)}, pt: topPadding ? 0 : {xs: theme.spacing(10), md: theme.spacing(10)}, height: 'min-content'}}>
      <Grid container 
      rowSpacing={0}
      sx={{
        px: {xs: 0, md: 16},
        py: {xs: 0, md: 15}, 
        alignItems: 'center',
        border: {xs: 'unset', md: `1px solid ${theme.palette.primary.main}`}
      }}>
        <Grid item xs={12} sm={12}>
          <Box sx={{
            iframe: { width: "100%", height: { xs: `215px`, sm: `445px`, md: `749px` } },
            }}>
            {video && (
             <Vimeo
             muted={true}
             video={video.url}
             autoplay
             controls={true}
           />
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
    topPadding
    video {
      url
      id
      service
    }
  }
`
