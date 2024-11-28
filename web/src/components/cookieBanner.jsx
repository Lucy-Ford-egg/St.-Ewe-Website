import React from "react"
import { CookieNotice } from "gatsby-cookie-notice"

export const CookieBanner = () => {
  return (
    <CookieNotice
      personalizeButtonClasses={"CookieButton-text"}
      personalizeButtonText={"I want to choose my cookies !"}
      cookies={[
        {
          name: "necessary",
          editable: false,
          default: true,
          title: "Essential",
          text: "Essential cookies are necessary for the proper functioning of the site. The site cannot function properly without them.",
        },
        {
          name: "gatsby-gdpr-google-analytics",
          editable: true,
          default: false,
          title: "Google Analytics",
          text: "Google Analytics is a statistical tool of Google allowing to measure the audience of the website.",
        },
        {
          name: "gatsby-gdpr-facebook-pixel",
          editable: true,
          default: false,
          title: "Facebook Pixel",
          text: "Facebook Pixel is a social media platform of Meta allowing to measure the audience metrics of the website.",
        },
      ]}
    >
      <h3>This websites uses cookies.</h3>
      <p>
        We use cookies to make the site work better, but also to see how you
        interact with it. how you interact with it. We will only use cookies if
        you allow us to do so by clicking by clicking on "Accept Cookies". You
        can also choose which cookie you want to allow.
      </p>
    </CookieNotice>
  )
}
