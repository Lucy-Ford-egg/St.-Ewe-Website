import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { Container, Typography, Box, useTheme } from "@mui/material"
//Preview

import { STUDIO_ORIGIN, useQuery } from "../../sanity/store";
import {PAGE_QUERY} from '../queries/documentQueries'
import { useEncodeDataAttribute } from "@sanity/react-loader";

export const HeaderSectionAccommodationSearch = props => {

  const { data, sourceMap } = useQuery(
    PAGE_QUERY,
    {},
    { initial }
  );

  const encodeDataAttribute = useEncodeDataAttribute(
    data,
    sourceMap,
    STUDIO_ORIGIN
  );

  const theme = useTheme()
  const {
    title,
    text,
    image,
    linkGroup,
    previewData,
    sanityConfig,
    showSearch,
    searchColour,
    // Preview
    initial
  } = props

 

  return (
    <Container
      maxWidth="fluid"
      disableGutters
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(24, 1fr)",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: 639,
        maxHeight: 639,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          gridColumn: "1/25",
          gridRow: "1/auto",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 749,
          }}
        >
          <Typography
            color="white.main"
            align="center"
            sx={{ textAlign: "center", my: { xs: 5 } }}
            variant="h1"
            // Preview
            data-sanity={encodeDataAttribute?.([
              "title",
              title._key,
              "slug",
            ])}
          >
            {previewData && previewData.title ? previewData.title : title}
          </Typography>
          <Typography
            color="white.main"
            align="center"
            sx={{ textAlign: "center", my: { xs: 5 } }}
            variant="body1"
          >
            {previewData && previewData.text ? previewData.text : text}
          </Typography>
        </Box>
        {(previewData && previewData.showSearch !== true) || (showSearch === true) && (
          <Box
            sx={{
              maxWidth: 707,
              width: "100%",
              // height: "100%",
              px: theme.spacing(2),
              py: theme.spacing(2),
              backgroundColor: previewData && previewData.searchColour ? `rgba(${previewData.searchColour.color.rgb.r},${previewData.searchColour.color.rgb.g},${previewData.searchColour.color.rgb.b}, ${previewData.searchColour.color.rgb.a}) !important` :  searchColour && `rgba(${searchColour.color.rgb.r},${searchColour.color.rgb.g},${searchColour.color.rgb.b}, ${searchColour.color.rgb.a}) !important`,
            }}
          >
            <Box class="gemawidgetcontainer" sx={{}}>
              <div className="gemawidgetcontainer">
                <iframe
                  className="gemaSearch"
                  border="0"
                  frameborder="0"
                  //**  https://bookings.gemapark.co.uk/Park/searchbox.aspx?&&o=h&curid=1&cul=en-GB&template=heligan&lnk=https%3a%2f%2fheligancampsite.com%2fsearch-results&nt=7&fl=0&ct=2185&ty=-1&mo=2&deft=2&mout=0&oc=2180x2m&ad=2023-10-28&dd=2023-11-04&cid=335&pid=13258&purl=https%3A%2F%2Fheligancampsite.com%2Fsearch-results%2F%3Fgemant%3D7%26gemafl%3D0%26gemact%3D2185%26gematy%3D-1%26gemamo%3D2%26gemadeft%3D2%26gemamout%3D0%26gemaoc%3D2180x2m%26gemaad%3D2023-10-28%26gemadd%3D2023-11-04%26gemacid%3D335%26gemapid%3D13258&url=https%3A%2F%2Fheligancampsite.com%2Fsearch-results%2F%3Fgemant%3D7%26gemafl%3D0%26gemact%3D2185%26gematy%3D-1%26gemamo%3D2%26gemadeft%3D2%26gemamout%3D0%26gemaoc%3D2180x2m%26gemaad%3D2023-10-28%26gemadd%3D2023-11-04%26gemacid%3D335%26gemapid%3D13258
                  src={`https://bookings.gemapark.co.uk/Park/searchbox.aspx?cid=${process.env.GATSBY_GEMAPARK_CID}&pid=${process.env.GATSBY_GEMAPARK_PID}&o=h&curid=1&cul=en-GB&template=heligan&lnk=https%3a%2f%2f${process.env.GATSBY_GEMAPARK_URL}%2fsearch-results`}
                  style={{
                    width:"100%", border:"none", height: 250}}
                  width="100%"
                  
                ></iframe>
              </div>
            </Box>
          </Box>
        )}
      </Container>

      <Box
        sx={{
          gridColumn: "1/25",
          gridRow: "1/auto",
          display: "grid",
          gridTemplateColumns: "repeat(24, 1fr)",
          height: "100%",
        }}
      >
        {image && (
          <GatsbyImage
            image={
              getGatsbyImageData(
                previewData?.image?.asset?._ref,
                { maxWidth: 1440 },
                sanityConfig,
              ) || getImage(image?.asset)
            }
            layout="constrained"
            aspectRatio={133 / 8}
            alt={image.asset?.altText}
            style={{
              minHeight: "100%",
              gridColumn: "1/25",
              gridRow: "1/auto",
            }}
          />
        )}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            gridColumn: "1/25",
            gridRow: "1/auto",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
      </Box>
    </Container>
  )
}

export const query = graphql`
  fragment HeaderSectionAccommodationSearchFragment on SanityHeaderSectionAccommodationSearch {
    _key
    _type
    text
    title
    searchColour {
      color {
        rgb {
          r
          g
          b
          a
        }
      }
    }
    showSearch
    image {
      asset {
        _id
        gatsbyImage(width: 1440, height: 639)
        altText
      }
    }
  }
`