import React, { useEffect, useState, useCallback } from 'react'
import { graphql } from "gatsby"
import Image from "gatsby-plugin-sanity-image"
import { Container, Typography, Box } from '@mui/material';

export const ImageLink = ({ image, mobileImage, linkGroup, isAdvert }) => {

  const [link, setLink] = useState(null)
  const checkLinkType = useCallback(
    () => {
      let linkType = "external"
      linkType = linkGroup.internalLink ? "internal" : "external"
      return setLink(linkType)
    },
    [linkGroup],
  )

  useEffect(() => {
    checkLinkType();
  }, [])


  return (
    <Container className="section imageLink" maxWidth="fluid" disableGutters={true} sx={{pt: { xs: 10, md: 11 }}}>
      {link === "external" && <a href={linkGroup}></a>}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', }}>
        {isAdvert && <Container maxWidth="lg" sx={{display: 'flex', justifyContent: 'flex-end'}}><Typography variant="caption" component="p">Advertisment</Typography></Container>}
        <Box sx={{display:{xs: 'block', md: 'none'}}}>
        {mobileImage && <Image
          // pass asset, hotspot, and crop fields
          {...mobileImage}
          // tell Sanity how large to make the image (does not set any CSS)
          width={600}
          // style it how you want it
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />}
        </Box>
        <Box sx={{display:{xs: 'none', md: 'block'}}}>
        {image && <Image
          // pass asset, hotspot, and crop fields
          {...image}
          // tell Sanity how large to make the image (does not set any CSS)
          // width={410}
          height={565}
          // style it how you want it
          style={{
            width: "100%",
            height: 565,
            objectFit: "cover",
          }}
        />}
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'none', md: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', } }}>
        {isAdvert && <Container maxWidth="lg" sx={{display: 'flex', justifyContent: 'flex-end'}}><Typography variant="caption" component="p">Advertisment</Typography></Container>}
        {image && <Image
          // pass asset, hotspot, and crop fields
          {...image}
          // tell Sanity how large to make the image (does not set any CSS)
          width={1440}
          height={565}
          // style it how you want it
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />}

      </Box>
    </Container>
  )

}

export const query = graphql`
  fragment ImageLinkFragment on SanityImageWithLink {
    image {
      ...ImageWithPreview
    }
    mobileImage {
      ...ImageWithPreview
    }
    isAdvert
    linkGroup {
      externalLinkGroup {
        href
        blank
        label
      }
      internalLinkGroup {
        reference {
          ... on SanityPage {
            id
            slug {
              current
            }
          }
        }
        label
      }
    }
  }
`