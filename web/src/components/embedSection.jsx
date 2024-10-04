// import React, { useState, useEffect, useRef } from "react";
// import { Script, graphql } from "gatsby";
// import { Container } from "@mui/material";

// export const EmbedSection = (props) => {
//   const [loaded, setLoaded] = useState(false);

//   const { scriptTag, embedCode, backgroundColour, verticalSpace, _type } = props;

//   const formRef = useRef(null);

//   useEffect(() => {
//     // Once the script has loaded, we inject the HubSpot form
//     if (loaded && formRef.current) {
//       const formScript = document.createElement("script");
//       formScript.type = "text/javascript";
//       formScript.innerHTML = embedCode?.code;
//       formRef.current.appendChild(formScript);
//     }
//   }, [loaded, embedCode]);

//   return (
//     <Container
//       maxWidth="false"
//       sx={{
//         backgroundColor: backgroundColour?.value || "transparent",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "green",
//           padding: "3rem",
//         }}
//       >
//         <Script src={`${scriptTag}`} onLoad={() => setLoaded(true)} />

//         {loaded && (
//           <Container
//             maxWidth="sm"
            
//           >
//             <div ref={formRef} style={{
//                 "&& iframe input.hs-button": {
//                     borderRadius: '100 !important'
//                 }
//             }}/>
//           </Container>
//         )}
//       </div>
//     </Container>
//   );
// };

// export const query = graphql`
//   fragment EmbedSectionFragment on SanityEmbedSection {
//     _key
//     _type
//     scriptTag
//     embedCode {
//       code
//       _key
//     }
//     verticalSpace {
//       topPadding
//       bottomPadding
//     }
//     backgroundColour {
//       label
//       value
//     }
//   }
// `;
