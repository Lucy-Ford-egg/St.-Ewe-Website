import React, { useState } from "react"
import { Box, Paper, Typography, useTheme, Divider } from "@mui/material"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { ButtonFormat } from "./buttonFormat"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { Icons } from "../components/icons"

export const ServicesTile = props => {
  const {
    title,
    text,
    previewData,
    node,
    sanityConfig,
    link,
    overlay = true,
  } = props
  const [hover, setHover] = useState(false)
  const theme = useTheme()
  const { image } = node

  return (
    <Paper
      sx={{
        background: theme.palette.highlight.main,
        boxShadow: hover
          ? "0px 4px 12px 0px rgba(50, 50, 26, 0.4)"
          : "0px 4px 4px 0px rgba(50, 50, 26, 0.06)",
        height: "100%",
        minHeight: 'max-content',
        display: "grid",
        gridTemplateColumns: "repeat(24, 1fr)",
      }}
    >
      <Box
        sx={{
          gridColumn: "1/25",
          gridRow: "1/auto",
        }}
      >
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
              height: "100%",
            }}
          />
        )}
      </Box>
      {overlay && image && (
        <Box
          className="overlay"
          sx={{
            width: "100%",
            height: "100%",
            minHeight: "100%",
            gridColumn: "1/25",
            gridRow: "1/auto",
            position: "relative",
            zIndex: 1,
            backgroundColor: `rgba(36,36,36, 0.4)`,
          }}
        />
      )}

      <Box
        sx={{
          p: { xs: theme.spacing(3) },
          gridColumn: "1/25",
          gridRow: "1/auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            // pt: 1,
            // pb: 6,
            p: { xs: theme.spacing(3) },
            border: `1px solid ${theme.palette.background.main}`,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: {xs: "center", lg: "flex-end"},
              alignItems: "center",
              flexBasis: "100%",
              pt: 4,
            }}
            
          >
            
              <Icons
                colour={theme.palette.background.main}
                type={previewData && previewData.icon ? previewData.icon : image && image.asset ? 'bud' : 'acorn'}
              />
            
            {title && <Typography
              align="center"
              color="background.main"
              sx={{ my: { xs: 5 } }}
              variant={image ? 'h4' : 'h5'}
            >
              {previewData && previewData.title ? previewData.title : title}
            </Typography>}

            {text && <Typography
              align="center"
              color="background.main"
              sx={{ my: { xs: 5 } }}
              variant="body1"
            >
              {previewData && previewData.text ? previewData.text : text}
            </Typography>}
          </Box>

          <Box
            onMouseOver={e => setHover(!hover)}
            onMouseOut={e => setHover(false)}
            sx={{
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              pb: 4,
            }}
          >
            <ButtonFormat
              variant={image ? 'outlined' : 'text'}
              endIcon={<ArrowRightAltIcon />}
              node={previewData && previewData.link ? previewData.link : link}
              sx={{ }}
              color="secondary"
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
