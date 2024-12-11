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
          {/* <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`}
            strategy="off-main-thread"
            forward={[`gtag`]}
          /> */}

          <Script
            id="FBPixel"
            strategy="off-main-thread"
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s) {
              if(f.fbq)return;
              n=f.fbq=function(){
                n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)
              };
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1050078168975279');
            fbq('track', 'PageView');
            <noscript><img height="1" width="1" style="display:none"src="https://www.facebook.com/tr?id=1050078168975279&ev=PageView&noscript=1"/></noscript>
            `,
            }}
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
          {/* <Script
            id="gtag-config"
            strategy="off-main-thread"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){ window.dataLayer.push(arguments);}
          gtag('js', new Date()); 
          gtag('config', '${process.env.GATSBY_GTAG}', { send_page_view: false, page_path: location ? location.pathname + location.search + location.hash : undefined })`,
            }}
          /> */}
        </>
      ) : (
        ""
      )}
    </>
  )
}
