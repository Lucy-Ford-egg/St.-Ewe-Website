import React, { useState } from "react"
import {
  AnimateCC,
  GetAnimationObjectParameter,
} from "react-adobe-animate"
import { Script, withPrefix } from "gatsby"
import { Box } from "@mui/material"

export const AdobeAnimate = props => {
  const { useAnimation } = props

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

      {isCreateJSLoaded && (
        <Script
          strategy="post-hydrate"
          src={withPrefix("taylor-money-animation-html5.js")}
          onLoad={() => onScriptLoad()}
        />
      )}
      {!areScriptsLoaded && "Loading scripts..."}
      {areScriptsLoaded && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimateCC
            animationName="taylormoneyrevision1spinningspiro"
            composition="12ABE26C81814E43AEB504FB91596CBA"
            getAnimationObject={getAnimationObject}
            onError={() => console.log("onError")}
          />
        </Box>
      )}
    </>
  )
}
