// // locate.ts
// import {DocumentLocationResolver} from 'sanity/presentation'
// import {map} from 'rxjs'

// export const locate: DocumentLocationResolver = (params, context) => {
//   // Set up locations for documents of the type "post"
//   console.log(`DLR Params - ${params}`)
//   console.log(`DLR Context - ${context}`)

//   if (params.type === 'post') {
//     // Subscribe to the latest slug and title
//     const doc$ = context.documentStore.listenQuery(
//       `*[_id == $id][0]{slug,title, category->{...}}`,
//       params,
//       {perspective: 'previewDrafts'}, // returns a draft article if it exists
//     )
//     // Return a streaming list of locations
//     return doc$.pipe(
//       map((doc) => {
//         // If the document doesn't exist or have a slug, return null
//         if (!doc || !doc.slug?.current) {
//           return null
//         }
//         return {
//           locations: [
//             {
//               title: doc.title || 'Untitled',
//               href: `/news/${doc.category.current}/${doc.slug.current}`,
//             },
//           ],
//         }
//       }),
//     )
//   }
//   // Pages
//   if (params.type === 'page') {
//     // Subscribe to the latest slug and title
//     const doc$ = context.documentStore.listenQuery(
//       `*[_id == $id][0]{ slug, title,  ...}`,
//       params,
//       {perspective: 'previewDrafts'}, // returns a draft article if it exists
//     )
//     console.log(`The Doc$ ${doc$} `)
//     // Return a streaming list of locations
//     return doc$.pipe(
//       map((doc) => {
//         // If the document doesn't exist or have a slug, return null
//         if (!doc || !doc.slug?.current) {
//           return null
//         }
//         return {
//           locations: [
//             {
//               title: doc.title || 'Untitled',
//               href: `${doc.slug.current}`,
//             },
//           ],
//         }
//       }),
//     )
//   }
//   // Team Member Page
//   if (params.type === 'teamMember') {
//     // Subscribe to the latest slug and title
//     const doc$ = context.documentStore.listenQuery(
//       `*[_id == $id][0]{ slug, title,  ...}`,
//       params,
//       {perspective: 'previewDrafts'}, // returns a draft article if it exists
//     )
//     console.log(`The Doc$ ${doc$} `)
//     // Return a streaming list of locations
//     return doc$.pipe(
//       map((doc) => {
//         // If the document doesn't exist or have a slug, return null
//         if (!doc || !doc.slug?.current) {
//           return null
//         }
//         return {
//           locations: [
//             {
//               title: doc.title || 'Untitled',
//               href: `/team-member/${doc.slug.current}`,
//             },
//           ],
//         }
//       }),
//     )
//   }
//   // Case Studies
//   if (params.type === 'recipe') {
//     // Subscribe to the latest slug and title
//     const doc$ = context.documentStore.listenQuery(
//       `*[_id == $id][0]{ slug, title,  ...}`,
//       params,
//       {perspective: 'previewDrafts'}, // returns a draft article if it exists
//     )
//     console.log(`The Doc$ ${doc$} `)
//     // Return a streaming list of locations
//     return doc$.pipe(
//       map((doc) => {
//         // If the document doesn't exist or have a slug, return null
//         if (!doc || !doc.slug?.current) {
//           return null
//         }
//         return {
//           locations: [
//             {
//               title: doc.title || 'Untitled',
//               href: `${doc.slug.current}`,
//             },
//           ],
//         }
//       }),
//     )
//   }
//   return null
// }
