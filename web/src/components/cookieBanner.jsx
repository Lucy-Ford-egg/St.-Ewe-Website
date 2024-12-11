import React, { useState, useEffect } from "react"
import { CookieNotice } from "gatsby-cookie-notice"
import { styled } from "@mui/material/styles"

const Wrapper = styled("div")(({ theme }) => ({
  gridColumn: "1/25",
  display: "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  alignItems: "center",
  position: "fixed",
  zIndex: 10,
  left: 0,
  right: 0,
  bottom: 0,
  padding: "${defaultTheme.spacing(6)}",
  backgroundColor: "var(--original-medium)",
  alignItems: "flex-end",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

const Inner = styled("div")(({ theme }) => ({
  gridColumn: "2/24",
  display: "grid",
  gridTemplateColumns: "repeat(24, 1fr)",
  alignItems: "center",
  position: "relative",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.up("lg")]: {},
}))

export const CookieBanner = () => {
  const [isBrave, setIsBrave] = useState(false)

  const checkIfBrave = async () => {
    if (typeof window !== "undefined") {
      if (navigator.brave) {
        return true
      }
      if (navigator.storage && navigator.storage.estimate) {
        const { quota } = await navigator.storage.estimate()
        if (quota < 120000000) {
          return true
        }
      }
    }
    return false
  }

  useEffect(() => {
    checkIfBrave().then(result => setIsBrave(result))
  }, [])

  return (
    <Wrapper>
      <Inner>
        {!isBrave && (
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
              We use cookies to make the site work better, but also to see how
              you interact with it. how you interact with it. We will only use
              cookies if you allow us to do so by clicking by clicking on
              "Accept Cookies". You can also choose which cookie you want to
              allow.
            </p>
          </CookieNotice>
        )}
      </Inner>
    </Wrapper>
  )
}
