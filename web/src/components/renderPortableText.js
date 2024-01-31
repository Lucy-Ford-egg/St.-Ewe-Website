import React from "react"
import { PortableText } from '@portabletext/react'
import { Typography, Box, List, ListItem, ListItemIcon, useTheme } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import { PortableTextInlineLink } from "../utils/portableInlineLink"
import { motion } from "framer-motion"
import Image from "gatsby-plugin-sanity-image"
import { getGatsbyImageData } from "gatsby-source-sanity"


export const RenderPortableText = (props) => {

  // searchColour {
  //   color {
  //     rgb {
  //       r
  //       g
  //       b
  //       a
  //     }
  //   }
  // }

  debugger

  const { previewData, sanityConfig, value, variant, textAlign,  animate = false, subtitlePosition = null, component } = props

  const getColor = value[0].markDefs[0].value
  const theme = useTheme()
  console.log(`Value Text - ${value && JSON.stringify(value)}`)

  const standardPortableText = {
    types: {
      span: ({ value }) => <Typography sx={{ color: getColor }} variant={'body1'} component={component}>{value.text}</Typography>,
      image: ({ value }) => {

        return (
          <Box sx={{ py: 6, }}>
            <Image
              // pass asset, hotspot, and crop fields
              asset={
                getGatsbyImageData(
                  previewData &&
                  previewData?.image?.asset,
                  { maxWidth: 100 },
                  sanityConfig,
                ) || value.asset
              }
              // tell Sanity how large to make the image (does not set any CSS)
              // width={1300}
              // style it how you want it
              style={{
                objectFit: "cover",
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <Typography sx={{ pl: 1, borderLeft: `1px solid ${theme.palette.tertiary.main}` }} variant='body2'>{value.asset.description}</Typography>
          </Box>
        )
      },
      callToAction: ({ value, isInline }) =>
        isInline ? (
          <a style={{ color: 'blue' }} href={value.url}>{value.text}</a>
        ) : (
          <div style={{ color: 'blue' }} className="callToAction">{value.text}</div>
        ),
      blockquote: ({ value }) => {
        return (
          <Box sx={{ mx: { xs: 0, md: -9 } }} component="figure">

            <Typography sx={{ py: { xs: 6, md: 6 }, color: getColor, pl: 1, borderLeft: `1px solid ${theme.palette.highlight.main}` }} align="center" variant="h2" component="blockquote">
              {value.text}
            </Typography>
            {value.cite && <Typography align="center" variant="subtitle1" component="figcaption">{value.cite}</Typography>}
          </Box>
        )
      },
      // sanity:{
      //   imageAsset:{

      //   },
      // },
    },
    list: (props) =>
      console.log("list", props) ||
      (props.value.listItem === "bullet" ? (
        <List sx={{ listStyle: 'inside', pt: { xs: 0 }, mt: { xs: '-4px' } }} component="ul" dense={true}>{props.children}</List>
      ) : (
        <List sx={{ listStyle: 'decimal inside', pt: { xs: 0 }, mt: { xs: '-4px' } }} component="ol" dense={true}>{props.children}</List>
      )),
    listItem: (props) =>
      console.log("list", props) ||
      (props.value.listItem === "bullet" ? (
        <ListItem sx={{ color: getColor, pl: 0 }}>
          <ListItemIcon sx={{ minWidth: 16 }}>
            <CircleIcon color={getColor} sx={{ width: 4, height: 4 }} />
          </ListItemIcon>{props.children}
        </ListItem>
      ) : (
        <ListItem sx={{ color: getColor, display: 'list-item', px: 0 }}>
          <ListItemIcon sx={{ minWidth: 16 }}>
          </ListItemIcon>{props.children}
        </ListItem>
      )),
    marks: {
      em: ({ children }) => <Typography sx={{ color: getColor, fontStyle: 'italic' }} variant="body1" component="span">{children}</Typography>,
      strong: ({ children, value }) => <Box component="span" sx={{ color: getColor, fontWeight: 900 }}>{children}</Box>,
      link: ({ children, value }) => <PortableTextInlineLink color={getColor} value={value}>{children}</PortableTextInlineLink>,
      underline: ({ children }) => <Typography variant="body1" className="underline" component="span">{children}</Typography>,
    },
    block: {
      normal: ({ children }) => <Typography sx={{ py: 2, color: getColor}} variant='body1'>{children}</Typography>,
      h1: ({ children }) => <Typography sx={{ py: { xs: 5 }, color: getColor }} variant="h1">{children}</Typography>,
      h2: ({ children }) => <Typography sx={{ py: { xs: 5 }, color: getColor }} variant="h2">{children}</Typography>,
      h3: ({ children }) => <Typography sx={{ py: { xs: 5 }, color: getColor }} variant="h3">{children}</Typography>,
      h4: ({ children }) => <Typography sx={{ py: { xs: 7 }, color: getColor }} variant="h4">{children}</Typography>,
      h5: ({ children }) => <Typography sx={{ py: { xs: 5 }, color: getColor }} variant="h5">{children}</Typography>,
      h6: ({ children }) => <Typography sx={{ py: { xs: 5 }, color: getColor }} variant="h6">{children}</Typography>,
      blockquote: ({ children }) => {
        return (
          <Box sx={{ py: {xs: 5}, mx: 0}} component="figure">
            <Typography sx={{ fontStyle: 'italic', py: { xs: 0 }, color: 'highlight.main', pl: 3, borderLeft: `1px solid ${theme.palette.highlight.main}` }} variant="h5" component="blockquote">
              "{children}"
            </Typography>
            {value.cite && <Typography align="center" variant="subtitle1" component="figcaption">{value.cite}</Typography>}
          </Box>
        )
      },
    },
  }

  return (
    <Box className={``}>
      <PortableText value={value || []} components={standardPortableText} />
    </Box>
  )

}
