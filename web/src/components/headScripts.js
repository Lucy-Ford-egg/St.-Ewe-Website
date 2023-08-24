import React, { useState } from "react"
import { Script } from "gatsby"

export const HeadScripts = ({ location }) => {
  console.log("headSripts location", location)

  return (
    <>
      {location.search === `?preview=true&dataset=production` || location.search === `?fetch=true` ? false : (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GTAG}`}
            strategy="off-main-thread"
            forward={[`gtag`]}
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
      )}
    </>
  )
}
