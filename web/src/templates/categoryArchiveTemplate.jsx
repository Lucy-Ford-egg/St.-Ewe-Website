// import React from "react"
// import { graphql } from "gatsby"
// import { Seo } from "../components/seo"
// import Modules from "../components/modules"
// //Preview
// import { useQuery } from "../../sanity/store"
// import { PAGE_QUERY } from "../queries/documentQueries"
// import { getSanityClient } from "../../sanityUtils/sanity"

// const CategoryArchiveTemplate = props => {
//   const { data, pageContext, initial } = props

//   // Preview
//   const { data: previewData } = useQuery(
//     PAGE_QUERY,
//     { slug: data.sanityCategories.slug.current },
//     { initial },
//   )

//   const definedModules = (previewData && previewData?.pageBuilder) || data?.sanityCategories?.pageBuilder

//   return (
//     <>
//       <Modules
//           previewData={previewData?.pageBuilder}
//           sanityConfig={getSanityClient}
//           allSanityPost={data.allSanityPost}
//           pageContext={pageContext}
//           modules={definedModules}
//           getAllPosts={data.allSanityPost}
//         />
//     </>
//   )
// }

// export const Head = ({ data, location }) => {
//   return <Seo seoContext={data.sanityPage} location={location} />
// }

// export const blogArchiveTemplateQuery = graphql`
//   query blogArchiveTemplateQuery(
//     $slug: String!
//     $skip: Int
//     $limit: Int
//   ) {
//     allSanityPost(
//       skip: $skip
//       limit: $limit
//       sort: {date: DESC}
//       filter: {categories: {elemMatch: {slug: {current: {eq: ""}}}}}
//     ) {
//       nodes {
//         author {
//           name
//         }
//         slug {
//           current
//         }
//         title
//         date
//         category {
//           _id
//           name
//           slug{
//             current
//           }
//         }
//         tileColor {
//           value
//           label
//         }
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
//       }
//     }
//     sanityCategories(slug: { current: { eq: $slug } }) {
//       _id
//       slug {
//         current
//       }
//       navOverlay
//       navColor {
//         value
//         label
//       }

//       pageBuilder {
//         ...PageBuilderFragment
//       }
//     }
//   }
// `
// export default CategoryArchiveTemplate
