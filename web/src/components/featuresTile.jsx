import React, {useState} from "react"
import { Box, Paper, Typography, useTheme, Divider } from "@mui/material"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import {ButtonFormat} from "./buttonFormat"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

export const FeaturesTile = props => {
  const { title, text, previewData, node, sanityConfig, link } = props
  const [hover, setHover] = useState(false)
  const theme = useTheme()
  const { image } = node
 
  return (
    <Paper
      sx={{
        border: "1px solid #E1E1D1",
        background: "var(--Sand, #F6F6EE)",
        boxShadow: hover ? "0px 4px 12px 0px rgba(50, 50, 26, 0.4)" : "0px 4px 4px 0px rgba(50, 50, 26, 0.06)",
        height: '100%',
        display: 'flex', 
        flexDirection: 'column',

      }}
    >
      <Box>
        {image && image.asset && (
          <GatsbyImage
            image={
              getGatsbyImageData(
                previewData?.image?.asset?._ref,
                { maxWidth: 1440 },
                sanityConfig,
              ) || getImage(image?.asset)
            }
            layout="constrained"
            aspectRatio={133 / 8}
            alt={image.asset?.altText}
            style={{
              width: "100%",
              minHeight: "240px",
            }}
          />
        )}
      </Box>
      <Box sx={{ pt: 1, pb: 6, px: { xs: theme.spacing(3) }, display: 'flex', flexDirection: 'column', flexBasis: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '100%' }}>
        <Typography color="text.primary" sx={{ my: { xs: 5 } }} variant="h5">
          {previewData && previewData.title ? previewData.title : title}
        </Typography>

        <Divider component="div" role="presentation" sx={{borderColor: theme.palette.primary.main, maxWidth: 305}}/>

        <Typography color="text.primary" sx={{ my: { xs: 5 } }} variant="body1">
          {previewData && previewData.text ? previewData.text : text}
        </Typography>
        </Box>
       
        <Box onMouseOver={e => setHover(!hover)} onMouseOut={e => setHover(false)} sx={{ width: 'fit-content', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', flexBasis: '100%' }}>
          <ButtonFormat variant='text' endIcon={<ArrowRightAltIcon/>} node={previewData && previewData.link ? previewData.link : link} sx={{ pl: 0, textTransform: 'uppercase'}}/>
        </Box>
        </Box>
    </Paper>
  )
}
