import React, {useState} from "react"
import { motion } from "framer-motion"
import { Typography } from "@mui/material"

export const AnimatedText = ({ text, titleSize, titleWidth, subtitlePosition }) => {
  // const [loaded, setLoaded] = useState(false)

  // useEffect(() => {
  //   setLoaded(true)
  // }, [setLoaded])
  
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

  // transition={{ type: "spring", stiffness: 100 }}
  
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

  const Component = React.forwardRef((props, ref) => (
    <Typography {...props} ref={ref} />
  )) 

  const MotionTitle = motion(Component)

  return (
    <MotionTitle variants={sentance} initial="hidden" animate="visible" variant={titleSize} align="center" sx={{ width: {xs: '100%', md: titleWidth}, mx: "auto", pb: { xs: subtitlePosition !== null ? 5 : 8 } }}>
      {text.split('').map((char, i) => {
        return (
          <motion.span key={`${char}-${i}`} variants={letter}>{char}</motion.span>
        )
      })}
    </MotionTitle>
  )
}

//dangerouslySetInnerHTML={{__html: gridTitleSubtitleText.title}}