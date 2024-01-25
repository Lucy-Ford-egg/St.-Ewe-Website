import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { Container, Typography, Box, useTheme } from "@mui/material"

export const UnitsListsSection = props => {
  const theme = useTheme()
  const { url } = props

  const iframeRef = useRef(null)
  const [messageData, setMessageData] = useState()
  const [height, setHeight] = useState("0px")

  return (
    <Container
      maxWidth="large"
      sx={{
        display: "flex",
        justifyItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          px: { xs: 0, sm: theme.spacing(12) },
          width: "100%",
          //       position: 'relative',
          // paddingBottom: '56.25%', /* 16:9 */
          // paddingTop: '25px',
          // height: 0,
        }}
      >
        <iframe
          id="ifrResults"
          class="gemaResults"
          height="1300px"
          width="100%"
          title="property-results"
          src={`https://bookings.gemapark.co.uk/park/searchresults.aspx?cid=${process.env.GATSBY_GEMAPARK_CID}&amp;curid=1&amp;cul=en-GB&amp;ifr=ifrResults&amp;url=https%3a%2f%2f${process.env.GATSBY_GEMAPARK_URL}%2fsearch-results.html`}
          style={{
            width: "1px",
            minWidth: "100%",
            // position: "absolute",
            // top: 0,
            // left: 0,
            // width: "100%",
            // height: "100%",
          }}
        />
        {/* <IframeResizer
          log
          forwardRef={iframeRef}
          autoResize={true}
          bodyBackground={true}
          bodyMargin={true}
          bodyPadding={true}
          heightCalculationMethod="bodyOffset"
          sizeHeight={true}
          inPageLinks
          warningTimeout={0}
          onMessage={onMessage}
          onResized={onResized}
          className="gemaResults"
          width="100%"
          src={`https://bookings.gemapark.co.uk/park/searchresults.aspx?cid=${process.env.GATSBY_GEMAPARK_CID}&amp;curid=1&amp;cul
  =en-GB&amp;ifr=ifrResults&amp;url=https%3a%2f%2f${process.env.GATSBY_GEMAPARK_URL}%2fsearch-
  results.html`}
  style={{ width: "1px", minWidth: "100%" }}
        /> */}
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
