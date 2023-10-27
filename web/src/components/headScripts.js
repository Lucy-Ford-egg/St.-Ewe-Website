import React, { useState, useEffect } from "react"
import { Script } from "gatsby"

export const HeadScripts = (props) => {
  const {activePreview} = props

  const [preview, setPreview] = useState(activePreview || null)

  useEffect(() => {
    setPreview( activePreview)

  }, [activePreview])
  debugger

console.log(`Preview Active = ${preview}`)
  return (
    <>
      {!preview ? 
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`}
            strategy="off-main-thread"
            forward={[`gtag`]}
          />
          <Script
            id="gtag-config"
            strat egy="off-main-thread"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){ window.dataLayer.push(arguments);}
          gtag('js', new Date()); 
          gtag('config', '${process.env.GATSBY_GTAG}', { send_page_view: false, page_path: location ? location.pathname + location.search + location.hash : undefined })`,
            }}
          />
          <Script id="gemaParkSearch" src={`https://bookings.gemapark.co.uk/javascript/gemapark_5_0_s.js?cid=${process.env.GATSBY_GEMAPARK_CID}`}></Script>
         
        </>
        
      : <></>}
    </>
  )
}
