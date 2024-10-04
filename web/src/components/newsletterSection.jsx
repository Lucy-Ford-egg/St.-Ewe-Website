// import React from "react"
// import { graphql } from "gatsby"
// import Container from "@mui/material/Container"
// import Box from "@mui/material/Box"
// import Grid from "@mui/material/Grid"
// import Divider from "@mui/material/Divider"
// import { useTheme } from "@mui/material"
// import Image from "gatsby-plugin-sanity-image"
// import { urlFor } from "../utils/imageHelpers"
// import { contrastColour } from "../utils/contrastColour"
// import { MailchimpList } from "./mailchimpList"
// import { RenderPortableText } from "../components/renderPortableText"

// export const NewsletterSection = props => {
//   const {
//     _rawTitle,
//     _rawText,
//     image,
//     previewData,
//     sanityConfig,
//     topPadding,
//     backgroundColor,
//     mirror,
//     _type,
//   } = props

//   const theme = useTheme()

//   const definedTopPadding = (previewData && _type === previewData?._type && previewData.topPadding) || topPadding
//   const definedTitle = (previewData && _type === previewData?._type && previewData.title) || _rawTitle
//   const definedText = (previewData && _type === previewData?._type && previewData.text) || _rawText
//   const definedMirror = (previewData && _type === previewData?._type && previewData.mirror) || mirror

//   return (
//     <Container
//       maxWidth={false}
//       disableGutters="true"
//       sx={{
//         pt: definedTopPadding
//           ? 0
//           : {
//               xs: theme.spacing(10),
//               md: theme.spacing(14),
//             },
//         pb: {
//           xs: theme.spacing(10),
//           md: theme.spacing(14),
//         },
//       }}
//     >
//       <Grid container sx={{
//         flexDirection: definedMirror ? "row-reverse" : "row",
//       }}>
//         <Grid
//           item
//           xs={12}
//           sm={5}
//           sx={{
//             backgroundColor:
//               (previewData && previewData.backgroundColor?.value) ||
//               backgroundColor?.value,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               py: { xs: 9, md: 18 },
//               px: { xs: 9, md: 18 },
//             }}
//           >
             
//             {definedTitle && (
//               <Box color={contrastColour(backgroundColor).textColour}>
//               <RenderPortableText
//                 previewData={definedTitle}
//                 sanityConfig={sanityConfig}
//                 setAsHeading={false}
//                 value={definedTitle}
//               />
//               </Box>
//             )}

//             {definedText && (
//               <>
//                 <Divider
//                   sx={{
//                     display: "flex",
//                     my: {xs: 4, md: 10},
//                     width: "19.1875rem",
//                     borderColor: contrastColour(backgroundColor).divider.hex,
//                   }}
//                 />
//                  <Box color={contrastColour(backgroundColor).textColour}>
//                 <RenderPortableText
//                   previewData={definedText}
//                   sanityConfig={sanityConfig}
//                   setAsHeading={false}
//                   value={definedText}
//                 />
//                 </Box>
//               </>
//             )}
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={7}>
//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateCoumns: "repeat(7, 1fr)",
//               height: "100%",
//               alignItems: "center",
//             }}
//           >
//             {image && (
//               <Image
//                 // pass asset, hotspot, and crop fields
//                 crop={(previewData && previewData?.image?.crop) || image?.crop}
//                 hotspot={
//                   (previewData && previewData?.image?.hotspot) || image?.hotspot
//                 }
//                 asset={
//                   (previewData &&
//                     previewData.image &&
//                     previewData.image?._ref &&
//                     urlFor(previewData.image).width(200).url()) ||
//                   image.asset
//                 }
//                 width={1330}
//                 height={515}
//                 style={{
//                   objectFit: "cover",
//                   width: "100%",
//                   height: "100%",
//                   flexGrow: 1,
//                   minHeight: "100%",
//                   gridColumn: "1/7",
//                   gridRow: "1/auto",
//                 }}
//               />
//             )}
//             <Grid
//               container
//               item
//               xs={12}
//               md={12}
//               sx={{
//                 gridColumn: "1/7",
//                 gridRow: "1/auto",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 py: {xs: 12, md: 0},
//               }}
//             >
//               <Grid
//                 item
//                 xs={10}
//                 md={8}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: "primary.lighter",
//                   px: { xs: 6, md: 12 },
//                   py: { xs: 12, md: 12 },
//                 }}
//               >
//                 <MailchimpList />
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   )
// }

// export const query = graphql`
//   fragment NewsletterSectionFragment on SanityNewsletterSection {
//     _key
//     _type
//     image {
//       asset {
//         _id
//         gatsbyImageData
//       }
//       hotspot {
//         x
//         y
//         width
//         height
//       }
//       crop {
//         bottom
//         left
//         right
//         top
//       }
//     }
//     _rawTitle(resolveReferences: { maxDepth: 10 })
//     _rawText(resolveReferences: { maxDepth: 10 })
//     backgroundColor {
//       value
//       label
//     }
//     mirror
//     topPadding
//   }
// `
