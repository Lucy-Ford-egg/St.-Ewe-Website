// import * as React from "react"
// import { graphql } from "gatsby"
// import { Seo } from "../components/seo"
// import Modules from "../components/modules"
// //Preview
// import { useQuery } from "../../sanity/store"
// import { CATEGORIES_QUERY } from "../queries/documentQueries"

// const CategoryTemplate = props => {
//   const { data, pageContext, initial, location } = props

//   // Preview
//   const { data: previewData } = useQuery(
//     CATEGORIES_QUERY,
//     { slug: data.sanityCategories.slug.current },
//     { initial },
//   )

//   const definedModules =
//     (previewData && previewData?.pageBuilder) ||
//     data?.sanityCategories?.pageBuilder
//   debugger
//   return (
//     <>
//       <Modules
//         pageContext={pageContext}
//         modules={definedModules}
//         allSanityPost={data.allSanityPosts}
//       />
//     </>
//   )
// }

// export const Head = ({ data, location }) => {
//   return <Seo seoContext={data.sanityRecipes} location={location} />
// }

// export const categoryTemplateQuery = graphql`
//   query categoryTemplateQuery($slug: String!, $postIds: [String]) {
//     sanityCategories(slug: { current: { eq: $slug } }) {
//       ...SeoCategoryFragment
//       slug {
//         current
//       }
//       pageBuilder {
//         ...PageBuilderFragment
//       }
//     }
//     allSanityPost(sort: { date: DESC }, filter: { _id: { in: $postIds } }) {
//       nodes {
//         _key
//         _id
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
