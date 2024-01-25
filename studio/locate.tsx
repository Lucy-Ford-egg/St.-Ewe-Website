// locate.ts
import { DocumentLocationResolver } from "sanity/presentation";
import { map } from "rxjs";

export const locate: DocumentLocationResolver = ({id, type}) => {
	// Set up locations for documents of the type "post"
  console.log(`id = ${id}`)
  if (type === 'post') {
    return {
      // '/post' is an example path.
      // Replace it with an actual relative or absolute value
      // depending on your environment
      locations: [
        {title: `Post #${id}`, href: `/blog/${id}`},
        {title: 'Posts', href: '/posts'},
      ],
    }
  }
  if (type === 'page') {
    return {
      // '/post' is an example path.
      // Replace it with an actual relative or absolute value
      // depending on your environment
      locations: [
        {title: `Page #${id}`, href: `/${id}`},
        {title: 'Pages', href: '/'},
      ],
    }
  }
  return null
}


// // Pass 'context' as the second argument
// export const locate: DocumentLocationResolver = (params, context) => {
//   // Set up locations for post documents
//   if (params.type === "post") {
//     // Subscribe to the latest slug and title
//     const doc$ = context.documentStore.listenQuery(
//       `*[_id == $id][0]{slug, ...}`,
//       params,
//       { perspective: "previewDrafts" } // returns a draft article if it exists
//     );
//     // Return a streaming list of locations
//     return doc$.pipe(
//       map((doc) => {
//         // If the document doesn't exist or have a slug, return null
//         if (!doc || !doc.slug?.current) {
//           return null;
//         }
//         return {
//           locations: [
//             {
//               title: doc.pageTitle || "Untitled",
//               href: `/post/${doc.slug.current}`,
//             },
//             {
//               title: "Posts",
//               href: "/",
//             },
//           ],
//         };
//       })
//     );
//   }
//   // Pages
//   if (params.type === "page") {
//     // Subscribe to the latest slug and title
//     const doc$ = context.documentStore.listenQuery(
//       `*[_id == $id][0]{slug, ...}`,
//       params,
//       { perspective: "previewDrafts" } // returns a draft article if it exists
//     );
//     console.log(`doc$ = ${doc$}`)
//     // Return a streaming list of locations
//     return doc$.pipe(
//       map((doc) => {
//         // If the document doesn't exist or have a slug, return null
//         if (!doc || !doc.slug?.current) {
//           return null;
//         }
//         return {
//           locations: [
//             {
//               title: doc.pageTitle || "Untitled",
//               href: `/${doc.slug.current}`,
//             },
//             {
//               title: "Pages",
//               href: "/",
//             },
//           ],
//         };
//       })
//     );
//   }
//   return null;
// }