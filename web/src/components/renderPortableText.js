import React from "react"
import { PortableText } from '@portabletext/react'
import { Typography, Box, List, ListItem, ListItemIcon } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import { PortableTextInlineLink } from "../utils/portableInlineLink"
import { motion } from "framer-motion"


export const RenderPortableText = ({ value, variant, textColor = 'white', animate = false, subtitlePosition = null, component }) => {

  console.log(`Value Text - ${value && JSON.stringify(value)}`)
  const standardPortableText = {
    types: {
      span: ({ value }) => <Typography sx={{ color: textColor }} variant={variant ? variant : 'body1'} component={component}>{value.text}</Typography>,
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
              <Typography sx={{ my: {xs: 6, md: 6}, color: textColor}} align="center" variant="h2" component="blockquote">
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
        <ListItem sx={{ color: textColor, pl: 0 }}>
          <ListItemIcon sx={{ minWidth: 16 }}>
            <CircleIcon color={textColor} sx={{ width: 4, height: 4 }} />
          </ListItemIcon>{props.children}
        </ListItem>
      ) : (
        <ListItem sx={{ color: textColor, display: 'list-item', px: 0 }}>
          <ListItemIcon sx={{ minWidth: 16 }}>
          </ListItemIcon>{props.children}
        </ListItem>
      )),
    marks: {
      em: ({ children }) => <Typography sx={{ color: textColor, fontStyle: 'italic' }} variant="body1" component="span">{children}</Typography>,
      strong: ({ children, value }) => <Box component="span" sx={{ color: textColor, fontWeight: 900 }}>{children}</Box>,
      link: ({ children, value }) => <PortableTextInlineLink color={textColor} value={value}>{children}</PortableTextInlineLink>,
      underline: ({ children }) => <Typography variant="body1" className="underline" component="span">{children}</Typography>,
    },
    block: {
      normal:  ({ children }) => <Typography sx={{my: {xs: 7}, color: textColor }} variant='body1'>{children}</Typography>,
      h1: ({ children }) => <Typography sx={{ my: {xs: 7}, color: textColor }} variant="h1">{children}</Typography>,
      h2: ({ children }) => <Typography sx={{ my: {xs: 7}, color: textColor }} variant="h2">{children}</Typography>,
      h3: ({ children }) => <Typography sx={{ my: {xs: 7}, color: textColor }} variant="h3">{children}</Typography>,
      h4: ({ children }) => <Typography sx={{ my: {xs: 7}, color: textColor }} variant="h4">{children}</Typography>,
      h5: ({ children }) => <Typography sx={{ my: {xs: 7}, color: textColor }} variant="h5">{children}</Typography>,
      h6: ({ children }) => <Typography sx={{ my: {xs: 7}, color: textColor }} variant="h6">{children}</Typography>,
    },
  }

  const animatePortableText = {
    block: {
      normal: ({ children }) => <AnimateBlock sx={{ my: {xs: 7}, color: textColor }} variant="h2">{children}</AnimateBlock>,
      h1: ({ children }) => <AnimateBlock sx={{ my: {xs: 7}, color: textColor }} variant="h1">{children}</AnimateBlock>,
      h2: ({ children }) => <AnimateBlock sx={{ my: {xs: 7}, color: textColor }} variant="h2">{children}</AnimateBlock>,
      h3: ({ children }) => <AnimateBlock sx={{ my: {xs: 7}, color: textColor }} variant="h3">{children}</AnimateBlock>,
    },
  }

  const basicPortableText = {
    block: {
      normal: ({ value }) => <Box sx={{ mb: { xs: 5 } }}><Typography sx={{ whiteSpace: 'pre-line' }} variant={variant ? variant : 'body1'}>{value.children[0].text}</Typography></Box>,
    },
  }

  
  return (
    <Box className={`${textColor}-text`}>
      {variant !== false ? <PortableText value={value} components={basicPortableText} /> : <PortableText value={value} components={animate === true ? animatePortableText : standardPortableText} />}
    </Box>
  )
 
}

const AnimateBlock = ({children, subtitlePosition, variant}) => {

    const Component = React.forwardRef((props, ref) => {    
      return(
        <Typography variant={variant} {...props}/>
      )
    }) 

    const MotionTitle = motion(Component)
  
    const sentance = {
      hidden: {
        //opacity: 1
        //y: -100
      },
      visible: {
        //opacity: 1,
        //y: 0,
        transition: {
         delay: 0.25,
         //staggerChildren: 0.01,
        }
      }
    }
    
    const letter = {
      hidden: {
        opacity: 0,
        y: "5rem",
        display: "inline"
      },
      visible: {
        opacity: 1,
        y: 0,
        display: "inline"
      }
    }

  return (
    <MotionTitle variants={sentance} initial="hidden" animate="visible" align="center" sx={{ mx: "auto", pb: { xs: subtitlePosition === true ? 5 : 8 } }}>
    {children && children.map((node, i) => {
      return (
        typeof node === 'string' || node instanceof String ? node.split('').map((char, i) => {
          return <motion.span key={`${char}-${i}`} variants={letter}>{char}</motion.span>
        }) : <Box sx={{width: {xs: "100%"}}}/>
      ) 
    })}
  </MotionTitle>

  )
}

