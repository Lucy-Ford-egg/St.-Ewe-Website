import React, { useState, useEffect, useContext } from "react"
import { Script } from "gatsby"
import { PreviewContext } from "../context/previewContext"

export const HeadScripts = () => {
  const { activePreview } = useContext(PreviewContext)

  const [preview, setPreview] = useState(activePreview || null)

  useEffect(() => {
    setPreview(activePreview)
  }, [activePreview])

  console.log(`Preview Active = ${preview}`)

  return (
    <>
      {!preview ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`}
            strategy="off-main-thread"
            forward={[`gtag`]}
          />
          <Script
            id="hs-script-loader"
            async
            defer
            preconnect
            src={`https://js-eu1.hs-scripts.com/${process.env.GATSBY_HUBSPOT_ID}.js`}
            //strategy="off-main-thread"
            // forward={[`gtag`]}
          />
          <Script
            id="gtag-config"
            strategy="off-main-thread"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){ window.dataLayer.push(arguments);}
          gtag('js', new Date()); 
          gtag('config', '${process.env.GATSBY_GTAG}', { send_page_view: false, page_path: location ? location.pathname + location.search + location.hash : undefined })`,
            }}
          />
        </>
      ) : (
        ""
      )}
    </>
  )
}
