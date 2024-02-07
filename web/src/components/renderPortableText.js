import React from "react"
import { PortableText } from '@portabletext/react'
import { Typography, Box, List, ListItem, ListItemIcon, useTheme } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import { PortableTextInlineLink } from "../utils/portableInlineLink"
import { motion } from "framer-motion"
import Image from "gatsby-plugin-sanity-image"
import { getGatsbyImageData } from "gatsby-source-sanity"


export const RenderPortableText = (props) => {

  const { setAsHeading = false, previewData, sanityConfig, value, variant, textAlign,  animate = false, subtitlePosition = null, component } = props

  const theme = useTheme()

  const block = {
    normal: ({ children, node  }) => <Typography sx={{ textAlign: textAlign, py: 2, color: 'inherit'}} variant={ setAsHeading ? setAsHeading : 'body1'}>{children}</Typography>,
    body2: ({ children, node  }) => <Typography sx={{ py: 2, color: 'inherit'}} variant='body2'>{children}</Typography>,
    h1: ({ children, node  }) => { 
      return <Typography sx={{ textAlign: textAlign, py: { xs: 5 }, color: 'inherit' }} variant="h1">{children}</Typography>
    },
    h2: ({ children, node  }) => <Typography sx={{ py: { xs: 5 }, color: 'inherit' }} variant="h2">{children}</Typography>,
    h3: ({ children, node  }) => <Typography sx={{ py: { xs: 5 }, color: 'inherit' }} variant="h3">{children}</Typography>,
    h4: ({ children, node  }) => <Typography sx={{ py: { xs: 7 }, color: 'inherit' }} variant="h4">{children}</Typography>,
    h5: ({ children, node  }) => <Typography sx={{ py: { xs: 5 }, color: 'inherit' }} variant="h5">{children}</Typography>,
    h6: ({ children, node  }) => {
      
    return <Typography sx={{ py: { xs: 5 }, color: 'inherit' }} variant="h6">{children}</Typography>
    },
    blockquote: ({ children }) => {
      return (
        <Box sx={{ py: {xs: 5}, mx: 0}} component="figure">
          <Typography sx={{ fontStyle: 'italic', py: { xs: 0 }, color: 'inherit', pl: 3 }} variant="h3" component="blockquote">
            {children}
          </Typography>
          {value.cite && <Typography align="center" variant="subtitle1" component="figcaption">{value.cite}</Typography>}
        </Box>
      )
    },
  };

  const marks = {
    em: ({ children }) => <Typography sx={{ color: value.value, fontStyle: 'italic' }} variant="body1" component="span">{children}</Typography>,
    strong: ({ children, node  }) => <Box component="span" sx={{ fontWeight: 900 }}>{children}</Box>,
    
    link: ({ children, value }) => <PortableTextInlineLink color={children[0].props.value.value} value={value}>{children}</PortableTextInlineLink>,
    underline: ({ children }) => <Typography variant="body1" className="underline" component="span">{children}</Typography>,
    // Color
    textColor: ({children, value}) => <span style={{color: value.value}}>{children}</span>,
    highlightColor: ({children, value}) => (
      <span style={{background: value.value}}>{children}</span>
    ),
  };
  
  const standardPortableText = {
    types: {
      span: ({ value }) => {
        
      return <Typography sx={{ color: 'inherit' }} variant={'body1'} component={component}>{value.children.text}</Typography>
      },
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

            <Typography sx={{ py: { xs: 6, md: 6 }, color: value.markDefs[0].value, pl: 1, borderLeft: `1px solid ${theme.palette.highlight.main}` }} align="center" variant="h2" component="blockquote">
              {value.text}
            </Typography>
            {value.cite && <Typography align="center" variant="subtitle1" component="figcaption">{value.cite}</Typography>}
          </Box>
        )
      },
    },
    list: ({value, children,}) =>
      console.log("list", props) ||
      (value.listItem === "bullet" ? (
        <List sx={{ listStyle: 'inside', pt: { xs: 0 }, mt: { xs: '-4px' } }} component="ul" dense={true}>{children}</List>
      ) : (
        <List sx={{ listStyle: 'decimal inside', pt: { xs: 0 }, mt: { xs: '-4px' } }} component="ol" dense={true}>{children}</List>
      )),
    listItem: ({value, children}) => {
      return (
      (value.listItem === "bullet" ? (
        <ListItem sx={{ color: 'inherit', pl: 0 }}>
          <ListItemIcon sx={{ minWidth: 16 }}>
            <CircleIcon color='red' sx={{ width: 4, height: 4 }} />
          </ListItemIcon>{children[0]}
        </ListItem>
      ) : (
        <ListItem sx={{ color: 'inherit', display: 'list-item', px: 0 }}>
          <ListItemIcon sx={{ minWidth: 16 }}>
          </ListItemIcon>{children}
        </ListItem>
      ))
      )},
    marks: marks,
    block: block,
  }

  return (
    <Box className={``}>
      <PortableText value={value || [] } components={standardPortableText}/>
    </Box>
  )

}

// components={standardPortableText}


//! [@portabletext/react] Unknown block type "block", specify a component for it in the `components.types` prop