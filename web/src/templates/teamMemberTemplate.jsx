import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import { IncludePreview } from "../context/includePreview"
import Modules from "../components/modules"
import { pageQuery } from "./queries/documentQueries"

import {
  Container,
  Grid,
  useTheme,
  Box,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { getGatsbyImageData } from "gatsby-source-sanity"
import { RenderPortableText } from "../components/renderPortableText"
import { CategoryLabel } from "../components/categoryLabel"

const TeamMembersTemplate = props => {
  const { data, pageContext, previewData, sanityConfig } = props
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  const image = data.sanityTeamMember?.image
  return (
    <IncludePreview
      documentQueries={pageQuery}
      slug={data.sanityTeamMember.slug} //
      data={data}
    >
      <Container
        maxWidth="fluid"
        disableGutters
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(24, 1fr)",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "100vh",
          maxHeight: { xs: "", md: "100vh" },
          overflow: "hidden",
          px: "0 !important",
        }}
      >
        

        <Box
          sx={{
            gridColumn: "1/25",
            gridRow: "1/auto",
            display: "grid",
            gridTemplateColumns: "repeat(24, 1fr)",
            height: "100%",
            maxHeight: "100%",
          }}
        >
          {image && (
            <Image
              // pass asset, hotspot, and crop fields
              crop={(previewData && previewData?.image?.crop) || image?.crop}
              hotspot={
                (previewData && previewData?.image?.hotspot) || image?.hotspot
              }
              asset={
                (previewData &&
                  previewData.image &&
                  previewData.image?._ref &&
                  urlFor(previewData.image).width(1440).url()) ||
                image.asset
              }
              width={1440}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                flexGrow: 1,
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
              //backgroundColor: "rgba(0,0,0,0.3)",
            }}
          />
        </Box>
      </Container>

      <Container maxWidth="md" sx={{py: {xs: 15 ,md: 16}}} disableGutters={mobile ? false : true}>
        <RenderPortableText value={data?.sanityTeamMember._rawBio}/>
      </Container>

      <Modules
        pageContext={pageContext}
        modules={data?.sanityTeamMember?.pageBuilder}
      />
    </IncludePreview>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityTeamMember} location={location} />
}

export const teamMemberTemplateQuery = graphql`
  query teamMemberTemplateQuery($slug: String!) {
    sanityTeamMember(slug: { current: { eq: $slug } }) {
      slug {
        current
      }
      title
      name
      image {
        asset {
          _id

          gatsbyImageData
        }
        hotspot {
          x
          y
          width
          height
        }
        crop {
          bottom
          left
          right
          top
        }
      }
      _rawBio(resolveReferences: { maxDepth: 10 })
      #...SeoPageFragment
      pageBuilder {
        ...PageBuilderFragment
      }
    }
  }
`
export default TeamMembersTemplate
