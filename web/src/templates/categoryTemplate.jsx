// import * as React from "react"
// import { graphql } from "gatsby"
// import { Seo } from "../components/seo"
// import Modules from "../components/modules"
// import {
//   Container,
//   Grid,
//   useTheme,
//   Box,
//   Typography,
//   useMediaQuery,
// } from "@mui/material"
// import Image from "gatsby-plugin-sanity-image"
// import { urlFor } from "../utils/imageHelpers"
// import { RenderPortableText } from "../components/renderPortableText"
// //Preview
// import { useQuery } from "../../sanity/store"
// import { CATEGORIES_QUERY } from "../queries/documentQueries"

// const CategoryTemplate = props => {
//   const { data, pageContext, initial, location } = props
//   const theme = useTheme()
//   const mobile = useMediaQuery(theme.breakpoints.down("md"))

//   // Preview
//   const { data: previewData } = useQuery(
//     CATEGORIES_QUERY,
//     { slug: data.sanityCategories.slug.current },
//     { initial },
//   )

//   const definedModules = (previewData && previewData?.pageBuilder)  || data?.sanityCategories?.pageBuilder
   
//   return (
//     <>
//       <Modules
//         pageContext={pageContext}
//         modules={definedModules}
//         getAllPosts={data.getAllPosts}
//       />
            
//     </>
//   )
// }

// export const Head = ({ data, location }) => {
//   return <Seo seoContext={data.sanityRecipes} location={location} />
// }

// export const categoryTemplateQuery = graphql`
//   query categoryTemplateQuery($slug: String!) {
//     sanityCategories(slug: { current: { eq: $slug } }) {
//       ... SeoCategoryFragment
//       slug {
//         current
//       }
//       pageBuilder {
//         ...PageBuilderFragment
//       }
//     }
//     getAllPosts: allSanityPost(sort: {date: DESC}){
//       nodes {
//         tileImage {
//           asset {
//             _id
//             gatsbyImageData
//           }
//           hotspot {
//             x
//             y
//             width
//             height
//           }
//           crop {
//             bottom
//             left
//             right
//             top
//           }
//         }
     
//         slug {
//           current
//         }
//         date
//         category {
//           name
//           _id
//           slug{
//             current
//           }
//         }
//         author {
//           name
//         }
//         title
        
//       }
//     }
//   }
// `
// export default CategoryTemplate

// // TODO:
// // ... on SanityLocationSection {
// //   ...LocationSectionFragment
// // }
// // ... on SanityBenifitsSection {
// //   ... BenifitsSectionFragment
// // }
// // ... on SanityContactSection {
// //   ... ContactSectionFragment
// // }
