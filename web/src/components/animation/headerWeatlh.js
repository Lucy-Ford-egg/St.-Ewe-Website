import React, {useState} from "react"
import {Script } from "gatsby"
import {Box} from "@mui/material"
import { AnimateCC, GetAnimationObjectParameter } from 'react-adobe-animate';
import wealthAnimation from "./headerWealthAnimation.js"

export const HeaderWealthAnimation = (props) => {
  
  const [scriptsLoadedCount, setScriptsLoadedCount] = useState(0);
  const [isCreateJSLoaded, setIsCreateJSLoaded] = useState(false);
  const [animationObject, getAnimationObject] = useState(null);
  
  const onScriptLoad = () => {
    setScriptsLoadedCount((n) => n + 1);
  };




  const areScriptsLoaded = isCreateJSLoaded;
  return (
  <>
  <Script
        strategy="off-main-thread"
        src="https://code.createjs.com/1.0.0/createjs.min.js"
        onReady={() => setIsCreateJSLoaded(true)}
      />
  {isCreateJSLoaded && (
    <>
      <Script
        strategy="off-main-thread"
        dangerouslySetInnerHTML={{ __html: wealthAnimation }}
      
        type="text/javascript"
        onReady={onScriptLoad}
      />
    </>
  )}
  <Box sx={{ gridColumn: "1/25", py: 6, m: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {!areScriptsLoaded && 'Loading scripts...'}
        {areScriptsLoaded && scriptsLoadedCount === 1(
          <AnimateCC
            animationName="taylor_money_export_atlas_1"
            composition="12ABE26C81814E43AEB504FB91596CBA"
            getAnimationObject={getAnimationObject}
            onError={() => console.log('onError')}
            paused={false}
          />
        )}
      </Box>
  </>
  )
}