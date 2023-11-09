import React from "react"
import { PortableText } from '@portabletext/react'
import { Typography, Box, List, ListItem, ListItemIcon } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import { PortableTextInlineLink } from "../utils/portableInlineLink"
import { motion } from "framer-motion"


export const RenderPortableText = (props) => {

  const { value, variant, color = 'white', animate = false, subtitlePosition = null, component } = props

  console.log(`Value Text - ${value && JSON.stringify(value)}`)

  const standardPortableText = {
    types: {
      span: ({ value }) => <Typography sx={{ color: color }} variant={'body1'} component={component}>{value.text}</Typography>,
      image: ({ value }) => <img src={value.imageUrl} alt={value.imageAlt} />,
      callToAction: ({ value, isInline }) =>
        isInline ? (
          <a style={{ color: 'blue' }} href={value.url}>{value.text}</a>
        ) : (
          <div style={{ color: 'blue' }} className="callToAction">{value.text}</div>
        ),
        blockquote: ({ value }) => {
          return (
            <Box sx={{mx: {xs: 0, md: -9}}} component="figure">
              <Typography sx={{ my: {xs: 6, md: 6}, color: color}} align="center" variant="h2" component="blockquote">
                {value.text}
              </Typography>
              {value.cite && <Typography align="center" variant="subtitle1" component="figcaption">{value.cite}</Typography>}
            </Box>
          )
        }
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
        <ListItem sx={{ color: color, pl: 0 }}>
          <ListItemIcon sx={{ minWidth: 16 }}>
            <CircleIcon color={color} sx={{ width: 4, height: 4 }} />
          </ListItemIcon>{props.children}
        </ListItem>
      ) : (
        <ListItem sx={{ color: color, display: 'list-item', px: 0 }}>
          <ListItemIcon sx={{ minWidth: 16 }}>
          </ListItemIcon>{props.children}
        </ListItem>
      )),
    marks: {
      em: ({ children }) => <Typography sx={{ color: color, fontStyle: 'italic' }} variant="body1" component="span">{children}</Typography>,
      strong: ({ children, value }) => <Box component="span" sx={{ color: color, fontWeight: 900 }}>{children}</Box>,
      link: ({ children, value }) => <PortableTextInlineLink color={color} value={value}>{children}</PortableTextInlineLink>,
      underline: ({ children }) => <Typography variant="body1" className="underline" component="span">{children}</Typography>,
    },
    block: {
      normal:  ({ children }) => <Typography sx={{mb: 5, color: color }} variant='body1'>{children}</Typography>,
      h1: ({ children }) => <Typography sx={{ my: {xs: 5}, color: color }} variant="h1">{children}</Typography>,
      h2: ({ children }) => <Typography sx={{ my: {xs: 5}, color: color }} variant="h2">{children}</Typography>,
      h3: ({ children }) => <Typography sx={{ my: {xs: 5}, color: color }} variant="h3">{children}</Typography>,
      h4: ({ children }) => <Typography sx={{ my: {xs: 5}, color: color }} variant="h4">{children}</Typography>,
      h5: ({ children }) => <Typography sx={{ my: {xs: 5}, color: color }} variant="h5">{children}</Typography>,
      h6: ({ children }) => <Typography sx={{ my: {xs: 5}, color: color }} variant="h6">{children}</Typography>,
    },
  }
  
  return (
    <Box className={`${color}-text`}>
      <PortableText value={value || []} components={standardPortableText} />
    </Box>
  )
 
}
