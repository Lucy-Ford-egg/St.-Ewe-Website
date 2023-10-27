import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { Container, Typography, Box, useTheme } from "@mui/material"
import IframeResizer from 'iframe-resizer-react'

export const UnitsListsSection = props => {
  const theme = useTheme()
  const { url } = props

  const iframeRef = useRef(null)
  const [messageData, setMessageData] = useState()

  const onResized = data => setMessageData(data)

  const onMessage = data => {
    setMessageData(data)
    iframeRef.current.sendMessage("Hello back from the parent page")
  }

  return (
    <Container
      maxWidth="large"
      sx={{
        display: "flex",
        justifyItems: "center",
      }}
    >
      <Box
        sx={{
          px: { xs: 0, sm: theme.spacing(12) },
          width: "100%",
          // display: "flex",
          // justifyItems: "center",
          // position: "relative",
          // height: "fit-content",
        }}
      >
        <IframeResizer
          forwardRef={iframeRef}
          heightCalculationMethod="taggedElement"
          sizeHeight={true}
          inPageLinks
          log
          warningTimeout={0}
          onMessage={onMessage}
          onResized={onResized}
          className="gemaResults"
          width="100%"
          src={`https://bookings.gemapark.co.uk/park/searchresults.aspx?cid=${process.env.GATSBY_GEMAPARK_CID}&amp;curid=1&amp;cul
  =en-GB&amp;ifr=ifrResults&amp;url=https%3a%2f%2f${process.env.GATSBY_GEMAPARK_URL}%2fsearch-
  results.html`}
          style={{ width: "1px", minWidth: "100%" }}
        />
        {/* <iframe
          id="ifrResults"
          
          
          style={{ 
            // position: "absolute",
            // height: "100vh", 
            // width: "100%", 
            // border: "none", 
            // left: 0, 
            // top: 0 
          }}
          border="0"
          marginwidth="0"
          marginheight="0"
          frameborder="0"
          source={`https://bookings.gemapark.co.uk/park/searchresults.aspx?cid=${process.env.GATSBY_GEMAPARK_CID}&amp;curid=1&amp;cul
=en-GB&amp;ifr=ifrResults&amp;url=https%3a%2f%2f${process.env.GATSBY_GEMAPARK_URL}%2fsearch-
results.html`}
        ></iframe> */}
      </Box>
    </Container>
  )
}

export const query = graphql`
  fragment UnitsListsSectionFragment on SanityUnitsListsSection {
    _key
    _type
    url
  }
`
