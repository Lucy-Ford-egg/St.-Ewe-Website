// import React, { useState, useEffect } from "react"
// import { graphql } from "gatsby"
// import Typography from "@mui/material/Typography"
// import Container from "@mui/material/Container"
// import Box from "@mui/material/Box"
// import Grid from "@mui/material/Grid"
// import { useTheme } from "@mui/material"

// import Image from "gatsby-plugin-sanity-image"
// import { urlFor } from "../utils/imageHelpers"
// import { ButtonFormat } from "./buttonFormat"

// export const CtaSection = props => {
//   const {
//     title,
//     text,
//     image,
//     previewData,
//     overlay,
//     leftAlign,
//     links,
//     topPadding,
//     _type,
//   } = props

//   const theme = useTheme()

//   const definedTopPadding = ( _type === previewData?._type && previewData && previewData?.topPadding) || topPadding
//   const definedImage = ( _type === previewData?._type && previewData && previewData?.image) || image
//   const definedOverlay = ( _type === previewData?._type && previewData && previewData?.overlay) || overlay
//   const definedAlign = ( _type === previewData?._type && previewData && previewData?.leftAlign) || leftAlign
//   const definedTitle = ( _type === previewData?._type && previewData && previewData?.title)  || title
//   const definedText = ( _type === previewData?._type && previewData && previewData?.text) || text
//   const definedLinks = ( _type === previewData?._type && previewData && previewData?.links) || links

//   return (
//     <Container
//       maxWidth="false"
//       disableGutters={true}
//       sx={{
//         pt: definedTopPadding
//           ? 0
//           : {
//               xs: theme.spacing(10),
//               md: theme.spacing(14),
//             },
//         pb: {
//           xs: theme.spacing(10),
//           md: 0,
//         },
//       }}
//     >
//       <Container maxWidth="xl"
//         sx={{
//           display: { xs: "grid", md: "grid" },
//           gridTemplateColumns: "repeat(24,1fr)",
//           alignItems: "center",
//           width: "100%",
//         }}
//       >
//         {definedImage && (
//           <Image
//             // pass asset, hotspot, and crop fields
//             crop={definedImage?.crop}
//             hotspot={definedImage?.hotspot}
//             asset={
//               (definedImage?._ref &&
//                 urlFor(definedImage).width(200).url()) ||
//                 definedImage.asset
//             }
//             width={1330}
//             height={515}
//             style={{
//               objectFit: "cover",
//               width: "100%",
//               height: "100%",
//               flexGrow: 1,
//               minHeight: "100%",
//               gridColumn: "1/25",
//               gridRow: "1/auto",
//             }}
//           />
//         )}

//         {definedOverlay && (
//           <Box
//             className="overlay"
//             sx={{
//               width: "100%",
//               height: "100%",
//               minHeight: "100%",
//               gridColumn: "1/25",
//               gridRow: "1/auto",
//               position: "relative",
//               zIndex: 1,
//               backgroundColor: `rgba(0,40,86, ${definedOverlay})`,
//             }}
//           />
//         )}

//         <Box
//           sx={{
//             display: "grid",
//             gridColumn: "1/25",
//             gridRow: "1/auto",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           <Container
//             maxWidth="xl"
            
//           >
//             <Box>
//               <Grid
//                 container
//                 justifyContent={definedAlign === "left" ? "flex-start" : "center"}
//               >
//                 <Grid item xs={12} md={6}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: definedAlign === "left" ? "flex-start" : "center",
//                       px: { xs: 4, md: 11 },
//                       py: { xs: 8, md: 11 },
//                     }}
//                   >
//                     <Typography
//                       color="white.main"
//                       align={definedAlign === "left" ? "left" : "center"}
//                       sx={{ my: { xs: 0, md: 5 } }}
//                       variant="h2"
//                     >
//                       {definedTitle}
//                     </Typography>

//                     <Typography
//                       color="white.main"
//                       align={definedAlign === "left" ? "left" : "center"}
//                       sx={{ my: { xs: 0, md: 5 } }}
//                       variant="body1"
//                     >
//                       {definedText}
//                     </Typography>

//                     <Box
//                       sx={{
//                         width: "fit-content",
//                         display: "flex",
//                         justifyContent: { xs: "center", md: "flex-end" },
//                         flexDirection: "row",
//                         flexWrap: { xs: "wrap", md: "no-wrap" },
//                         flexBasis: "100%",
//                         columnGap: 6,
//                         rowGap: 6,
//                         py: 2,
//                       }}
//                     >
//                       {definedLinks &&
//                         definedLinks.map((node, i) => {
//                           return (
//                             <ButtonFormat
//                                key={node._key}
//                               variant={i === 0 ? "contained" : "outlined"}
//                               color={i === 0 ? "primary" : "secondary"}
//                               node={ node }
                              
//                             />
//                           )
//                         })}
//                     </Box>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Container>
//         </Box>
//       </Container>
//     </Container>
//   )
// }

// export const query = graphql`
//   fragment CtaSectionFragment on SanityCtaSection {
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
//     title
//     text
//     links {
//       link {
//         external
//         internal {
//           ... on SanityPage {
//             id
//             _type
//             slug {
//               current
//             }
            
//           }
//           ... on SanityPost {
//             id
//                   slug {
//                     current
//                     _type
//                   }
//                   categories {
//                     name
//                     slug{
//                       current
//                     }
//                   }
//           }
//         }
//       }
//       text
//     }
//     leftAlign
//     topPadding
//     overlay
//   }
// `
