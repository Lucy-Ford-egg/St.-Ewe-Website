import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Modules from "../components/modules"
import { contrastColour } from "../utils/contrastColour"
import {RenderPortableText} from '../components/renderPortableText'
import {formattedDate } from "../utils/formattedDate"
import {
  Container,
  Grid,
  useTheme,
  Box,
  Typography,
  Divider,
  useMediaQuery
} from "@mui/material"
import Image from "gatsby-plugin-sanity-image"
import { urlFor } from "../utils/imageHelpers"
//Preview
import { useQuery } from "../../sanity/store"
import { POST_QUERY } from "../queries/documentQueries"

const PostTemplate = props => {
  const { data, pageContext, initial } = props
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  // const { featuredMedia, tileColor } = data?.sanityPost

  // Preview
  const { data: previewData } = useQuery(
    POST_QUERY,
    { slug: data.sanityPost?.slug?.current },
    { initial },
  )

  // const definedRawBody = (previewData && previewData?.body) || data?.sanityPost._rawBody
  const definedModules = (previewData && previewData?.pageBuilder)  || data?.sanityPost?.pageBuilder
  // const definedTileColor = (previewData && previewData?.tileColor) || tileColor
  // const definedCategory = (previewData && previewData?.categories) || data.sanityPost?.categories
  // const definedTitle = (previewData && previewData?.title) || data?.sanityPost?.title
  // const definedDate = (previewData && previewData?.date) || data.sanityPost?.date
  // const definedAuthor = (previewData && previewData?.author) || data.sanityPost?.author 
  // const definedImage = (previewData && previewData?.image) || image

  return (
   <>
      <Modules
        pageContext={pageContext}
        modules={definedModules}
        allSanityPost={data.allSanityPost}
        getAllPosts={data.getAllPosts}
      />
    </>
  )
}

export const Head = ({ data, location }) => {
  return <Seo seoContext={data.sanityPost} location={location} />
}

export const pageTemplateQuery = graphql`
  query postTemplateQuery($slug: String!) {
    sanityPost(slug: { current: { eq: $slug } }) {
      ... SeoPostFragment
      author {
        name
      }
      slug {
        current
      }
      title
      date
      categories {
        name
        slug{
            current
          }
      }    
      #...SeoPageFragment
      pageBuilder {
        ...PageBuilderFragment
      }
    }
  }
`
export default PostTemplate
