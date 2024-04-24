import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
import {
  Container,
  useTheme,
  Box,
  useMediaQuery,
} from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
import { RenderPortableText } from "../components/renderPortableText"
//Preview
import { useQuery } from "../../sanity/store"
import {
  TEAM_MEMBER_PAGE_QUERY,
  SITE_SETTINGS,
} from "../queries/documentQueries"

const TeamMembersTemplate = props => {
  const { data, pageContext, initial } = props
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("md"))

  const { data: previewData, sourceMap } = useQuery(
    `{ "siteSettings": ${SITE_SETTINGS}, "page":${TEAM_MEMBER_PAGE_QUERY}}`,
    { slug: data?.sanityTeamMember?.slug.current },
    { initial },
  )

  const pageData = previewData?.page
  const siteSettings = (previewData && previewData?.siteSettings[0]) || data?.sanitySiteSettings

  const definedImage =
    (pageData && pageData?.image) ||
    data.sanityTeamMember?.image
  const definedRawBio =
    (pageData && pageData?.bio) || data?.sanityTeamMember._rawBio
  const definedModules =
    (pageData && pageData?.pageBuilder) ||
    data?.sanityTeamMember?.pageBuilder

  return (
    <>
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
          {definedImage && (
            <Image
              // pass asset, hotspot, and crop fields
              crop={definedImage?.crop}
              hotspot={definedImage?.hotspot}
              asset={
                (definedImage?._ref &&
                  urlFor(definedImage).width(1400).url()) ||
                definedImage.asset
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
        </Box>
      </Container>

      <Container
        maxWidth="md"
        sx={{ py: { xs: 15, md: 16 } }}
        disableGutters={mobile ? false : true}
      >
        <RenderPortableText value={definedRawBio} />
      </Container>

      <Modules pageContext={pageContext} modules={definedModules} getAllPosts={data.getAllPosts}/>
    </>
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
    getAllPosts: allSanityPost{
      nodes {
        tileImage {
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
     
        slug {
          current
        }
        date
        category {
          name
          _id
        }
        author {
          name
        }
        title
        tileColor{
          value
          label
        }
      }
    }
    sanitySiteSettings {
      ... CompanyDetailsFragment
     }
  }
`
export default TeamMembersTemplate
