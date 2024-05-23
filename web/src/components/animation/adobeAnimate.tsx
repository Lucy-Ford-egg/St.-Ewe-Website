import React, { useState } from "react"
import {
  AnimateCC,
  GetAnimationObjectParameter,
} from "react-adobe-animate"
import { Script, withPrefix } from "gatsby"
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"

export const AdobeAnimate = props => {
  const { useAnimation } = props

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [isCreateJSLoaded, setIsCreateJSLoaded] = useState(false)
  const [scriptsLoadedCount, setScriptsLoadedCount] = useState(0)
  const [animationObject, getAnimationObject] =
    useState<GetAnimationObjectParameter | null>(null)
  // const [adobeAnimation, setAdobeAnimation] = useState(false)

  //const [createJs, setCreateJs] = useState(false)

  console.log(animationObject)

  const onScriptLoad = () => {
    setScriptsLoadedCount(n => n + 1)
  }

  const areScriptsLoaded = isCreateJSLoaded && scriptsLoadedCount === 1

  return (
    <>
      <Script
        strategy="post-hydrate"
        src={withPrefix("libs/1.0.0/createjs.min.js")}
        onLoad={() => setIsCreateJSLoaded(true)}
      />

      {isCreateJSLoaded && (mobile === false) && (
        <Script
          strategy="post-hydrate"
          src={withPrefix("taylor-money-animation-html5.js")}
          onLoad={() => onScriptLoad()}
        />
      )}
      {isCreateJSLoaded && (mobile === true) && (
        <Script
          strategy="post-hydrate"
          src={withPrefix("taylor-money-animation-html5-mobile.js")}
          onLoad={() => onScriptLoad()}
        />
      )}
      {!isCreateJSLoaded && !areScriptsLoaded && <Box sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          minHeight: { xs: "100vh", sm: "100vh" }, 
          animation: "blinker 1s linear infinite",
    }}><Typography variant="caption">Loading...</Typography></Box>}
      {areScriptsLoaded && (
        <>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            display: {xs: "none", sm: "flex"},
          }}
        >
          <AnimateCC
            animationName="taylormoneyrevision1spinningspiro"
            composition="12ABE26C81814E43AEB504FB91596CBA"
            getAnimationObject={getAnimationObject}
            onError={() => console.log("onError")}
          />
        </Box>
        <Box
        sx={{
          width: "100%",
          height: "100vh",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          display: {xs: "flex", sm: "none"},
        }}
      >
        <AnimateCC
          animationName="taylormoneyrevision1spinningspiromobile"
          composition="12ABE26C81814E43AEB504FB91596CBA"
          getAnimationObject={getAnimationObject}
          onError={() => console.log("onError")}
        />
      </Box>
      </>
      )}
    </>
  )
}
