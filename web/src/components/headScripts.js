import React, { useState } from "react"
import { Script } from "gatsby"

export const HeadScripts = ({ location }) => {
  console.log("headSripts location", location)
  // "?previewMode=true&previewDataset=production&validation=%5B%5D&isNewUnpublishedDoc=false"

  const queryString = location.search

// Use the URLSearchParams constructor to parse the query string
const params = new URLSearchParams(queryString);

// Convert the URLSearchParams object to a plain JavaScript object
const queryObject = {};

for (const [key, value] of params) {
  queryObject[key] = value;
}

  return (
    <>
      {queryObject.previewMode === "true" ? <></> : (
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
