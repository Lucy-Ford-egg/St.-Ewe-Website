import React from "react"
import { PortableText } from '@portabletext/react'
import { Typography, Box, List, ListItem, ListItemIcon } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import {PortableTextInlineLink} from "../utils/portableInlineLink"

export const RenderPortableText = ({value, variant, textColor = 'white'}) => {
  
  const standardPortableText = {
    types: {
      image: ({ value }) => <img src={value.imageUrl} />,
      callToAction: ({ value, isInline }) =>
        isInline ? (
          <a style={{color: 'blue'}} href={value.url}>{value.text}</a>
        ) : (
          <div style={{color: 'blue'}}className="callToAction">{value.text}</div>
        ),
    },
    block: {
        // normal:  ({ value }) => <Typography sx={{color: 'red'}} variant={variant ? variant : 'body1'}>{value.children[0].text}</Typography>,
    },
    list: (props) =>
      console.log("list", props) ||
      (props.value.listItem === "bullet" ? (
        <List sx={{listStyle: 'inside', pt: {xs: 0}, mt:{xs: '-4px'}}} component="ul" dense={true}>{props.children}</List>
      ) : (
        <List sx={{listStyle: 'decimal inside', pt: {xs: 0}, mt:{xs: '-4px'}}} component="ol" dense={true}>{props.children}</List>
      )),
    listItem: (props ) =>
      console.log("list", props) ||
      (props.value.listItem === "bullet" ? (
        <ListItem sx={{color: textColor, pl: 0}}>
          <ListItemIcon sx={{minWidth: 16}}>
            <CircleIcon color={textColor} sx={{width: 4, height: 4}} />
          </ListItemIcon>{props.children}
        </ListItem>
      ) : (
        <ListItem sx={{color: textColor, display: 'list-item', px: 0}}>
          <ListItemIcon sx={{minWidth: 16}}>
          </ListItemIcon>{props.children}
        </ListItem>
      )),
    marks: {
      em: ({children}) => <Typography sx={{color: textColor, fontStyle: 'italic'}} variant="body1" component="span">{children}</Typography>,
      strong: ({ children, value }) => <Box component="span" sx={{color: textColor,  fontWeight: 900 }}>{children}</Box>,
      link: ({ children, value }) =>  <PortableTextInlineLink color={textColor} value={value}>{children}</PortableTextInlineLink>,
      underline:  ({children}) => <Typography variant="body1" className="underline" component="span">{children}</Typography>,
    },
  }

  const basicPortableText = {
    block: {
      normal: ({ value }) => <Box sx={{mb:{xs: 5}}}><Typography sx={{ whiteSpace: 'pre-line'}} variant={variant ? variant : 'body1'}>{value.children[0].text}</Typography></Box>,
    },
  }
  return(
    <Box className="white-text">
      {variant !== false ? <PortableText value={value} components={basicPortableText} /> : <PortableText value={value} components={standardPortableText} />}
    </Box>
  )
}