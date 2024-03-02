import React, { useState } from "react"
import { Box, Paper, Typography, useTheme, Divider } from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { ButtonFormat } from "./buttonFormat"
import { RenderPortableText } from "../components/renderPortableText"

export const LoginTile = props => {
  const { title, text, previewData, image, node, sanityConfig, link } = props
  const [hover, setHover] = useState(false)
  const theme = useTheme()

  const definedImage = image
  const definedTitle = title

  return (
    <Paper
      sx={{
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "secondary.bright",
        p: 6,
        borderRadius: 0,
        height: "100%",
      }}
    >
      {definedImage && (
        <Image
          // pass asset, hotspot, and crop fields
          crop={definedImage.crop}
          hotspot={definedImage?.hotspot}
          asset={
            (definedImage?._ref && urlFor(definedImage).width(350).url()) ||
            definedImage.asset
          }
          width={350}
          height={279}
          style={{
            objectFit: "contain",
            width: "100%",
          }}
        />
      )}
      <Box
        sx={{
          pt: 1,
          pb: 6,
          display: "flex",
          flexDirection: "column",
          flexBasis: "100%",
          justifyContent: 'space-between',
        }}
      >
        {definedTitle && (
          <Box
            sx={{ display: "flex", flexDirection: "column", flexBasis: "100%", py: 4, }}
          >
            <Divider
              component="div"
              role="presentation"
              sx={{ borderColor: theme.palette.white.main, maxWidth: 305 }}
            />

            {definedTitle && (
              <Box sx={{color: "white.main"}}>
              <RenderPortableText
                previewData={definedTitle}
                sanityConfig={sanityConfig}
                setAsHeading="h3"
                value={definedTitle}
              />
              </Box>
            )}
          </Box>
        )}
        <Box
          onMouseOver={e => setHover(!hover)}
          onMouseOut={e => setHover(false)}
          sx={{
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
            flexBasis: "100%",
            mt: 2,
            justifyContent: "flex-end",
          }}
        >
          <ButtonFormat
            variant="contained"
            node={previewData && previewData.link ? previewData.link : link}
            sx={{ pl: 0, textTransform: "uppercase" }}
          />
        </Box>
      </Box>
    </Paper>
  )
}
