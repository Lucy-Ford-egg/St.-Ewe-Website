import {Views} from './views/preview'
import {resolveProductionUrl} from '../previews/resolveProductionUrl'

import {
  MdCategory,
  MdHolidayVillage,
  MdOutlineMenu,
  MdOutlineChat,
  MdAutoStories,
  MdFavorite,
  MdOutlineMyLocation,
  MdOutlineTagFaces,
} from 'react-icons/md'


export const deskStructure = (S, context) => {
  return S.list()
    .title('Site Content')
    .items([
      S.listItem()
        .title('Navigation')
        .icon(MdOutlineMenu)
        .child(
          S.documentTypeList('navigation')
            .title('Navigation')
            .child((id) =>
              S.document().schemaType('navigation').documentId(id).views(Views(S, context))
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
        S.divider(),
      S.listItem()
        .title('Posts')
        .icon(MdOutlineChat)
        .child(
          S.documentTypeList('post')
            .title('Posts')
            .child((id) => S.document().schemaType('post').documentId(id).views(Views(S, context)))
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),

      S.listItem()
        .title('Pages')
        .icon(MdAutoStories)
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .child((id) => S.document().schemaType('page').documentId(id).views(Views(S, context)))
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Places')
        .icon(MdHolidayVillage)
        .child(
          S.documentTypeList('place')
            .title('Places')
            .child((id) => S.document().schemaType('place').documentId(id).views(Views(S, context)))
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),

      S.listItem()
        .title('Features')
        .icon(MdFavorite)
        .child(
          S.documentTypeList('feature')
            .title('Features')
            .child((id) =>
              S.document().schemaType('feature').documentId(id).views(Views(S, context))
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
        S.divider(),
      S.listItem()
        .title('Locations')
        .icon(MdOutlineMyLocation)
        .child(
          S.documentTypeList('location')
            .title('Locations')
            .child((id) =>
              S.document().schemaType('location').documentId(id).views(Views(S, context))
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),

      S.listItem()
        .title('Authors')
        .icon(MdOutlineTagFaces)
        .child(
          S.documentTypeList('author')
            .title('Authors')
            .child((id) =>
              S.document().schemaType('author').documentId(id).views(Views(S, context))
            )
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
        S.divider(),
        S.listItem()
        .title('Post Categories')
        .icon(MdCategory)
        .child(
          S.documentTypeList('categories')
          .title('Post Categories')
          .child((id) =>
            S.document().schemaType('categories').documentId(id).views(Views(S, context))
          )
          .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),

        S.listItem()
        .title('Feature Categories')
        .icon(MdCategory)
        .child(
          S.documentTypeList('featureCategories')
          .title('Feature Categories')
          .child((id) =>
            S.document().schemaType('featureCategories').documentId(id).views(Views(S, context))
          )
          .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),

       

        S.listItem()
        .title('Place Categories')
        .icon(MdCategory)
        .child(
          S.documentTypeList('placeCategories')
          .title('Place Categories')
          .child((id) =>
            S.document().schemaType('placeCategories').documentId(id).views(Views(S, context))
          )
          .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
        
      
          

      // Remove Media from Admin
      // ...S.documentTypeListItems().filter(template => {
      //   if (template.spec.id === 'media.tag') {
      //     template.spec.icon = MdOutlineDiscount
      //     return false
      //   }
      //   if(template.spec.id === 'post') {
      //     return false
      //   }
      //   else{
      //     return true
      //   }
      // }),
    ],
    )
}
//
const url = window.location.hostname.includes('localhost')
  ? 'http://localhost:8000'
  : 'https://architecturalholidays.netlify.app'
// Customise this function to show the correct URL based on the current document
function getPreviewUrl(document, context) {
  //console.log('URL', url)
  let slug = document?.slug?.current

  // if(document.slug.current === "homepage"){
  //   return slug = ""
  // }
  const dataset = 'production'
  const params = new URLSearchParams()
  params.set('preview', 'true')
  params.set('dataset', dataset)

  const previewUrl = `${url}/${slug}?${params}`

  return previewUrl
}
//!

// export const defaultDocumentNode = (S, {schemaType}) => {
//   // Conditionally return a different configuration based on the schema type
//   switch (schemaType) {
//     // case `page`:
//     //   return S.document().views([
//     //     S.view.form(),
//     //     S.view
//     //       .component(Iframe)
//     //       .options({
//     //         url: (document) => ( getPreviewUrl(document)),
//     //         reload: {
//     //           button: true,
//     //         },
//     //         attributes: {
//     //           allow: 'fullscreen', // string, optional
//     //           referrerPolicy: 'no-referrer', // string, optional
//     //           sandbox: 'allow-same-origin', // string, optional
//     //         }
//     //       })
//     //       .title('Preview'),
//     //   ])
//     case `post`:
//       console.log('Document, --', document)
//       return S.document().views([
//         S.view.form(),
//         S.view
//           .component(SEOPane)
//           .options({
//             // Retrieve the keywords and synonyms at the given dot-notated strings
//             keywords: `seo.keywords`,
//             synonyms: `seo.synonyms`,
//             url: (document) => {
//               return resolveProductionUrl(document)
//             },

//             // Alternatively, specify functions (may be async) to extract values
//             // keywords: doc => doc.seo?.keywords,
//             // synonyms: async(doc) => client.fetch('some query to get synonyms', {id: doc._id}),
//             // url: async(doc) => client.fetch('some query to construct a url with refs', {id: doc._id})
//           })
//           .title('SEO'),
        
//       ])
//     default:
//       return S.document().views([S.view.form()])
//   }
// }
