import React from "react"
import { motion } from "framer-motion"
import { Typography } from "@mui/material"
import { RenderPortableText } from "./renderPortableText"
import clientTheme from "../gatsby-theme-material-ui-top-layout/theme"

export const AnimatedText = ({ title, titleSize, subtitlePosition }) => {
  
  const sentance = {
    hidden: {
      opacity: 1
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.25,
        staggerChildren: 0.04
      }
    }
  }
  
  const letter = {
    hidden: {
      opacity: 0,
      y: -100
    },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  const Component = React.forwardRef((props, ref) => {
    // <Typography {...props}  />
    debugger
    return(
    <RenderPortableText ref={ref} value={props.children} variant={false} textColor={clientTheme.palette.secondary.main}/>
    )
  }) 

  const MotionTitle = motion(Component)
debugger
  return (
    <MotionTitle variants={sentance} initial="hidden" animate="visible" variant={titleSize} align="center" sx={{ mx: "auto", pb: { xs: subtitlePosition !== null ? 5 : 8 } }}>
      {title && title[0]?._rawChildren[0].text?.split('').map((char, i) => {
        return (
          <motion.span key={`${char}-${i}`} variants={letter}>{char}</motion.span>
        )
      })}
    </MotionTitle>
  )
}

//dangerouslySetInnerHTML={{__html: gridTitleSubtitleText.title}}