// ./structure.js (.ts)
// import { SeoPreview } from '../previews/index'
import {SEOPane} from 'sanity-plugin-seo-pane'
import { resolveProductionUrl } from '../previews/resolveProductionUrl'
import {Iframe} from 'sanity-plugin-iframe-pane'
import {MdOutlineDiscount} from 'react-icons/md'


export const structure = (S, context) => {
  return(
  S.list()
    .title('Site Content')
    .items([
      // S.listItem()
      //   .title('Settings')
      //   .child(
      //     S.document()
      //       .schemaType('siteSettings')
      //       .documentId('siteSettings')
      //   ),
      // ...S.defaultInitialValueTemplateItems()
      // Filter out document types of `media.tag`
      ...S.documentTypeListItems().filter(template => {
        if (template.spec.id === 'media.tag') {
          template.spec.icon = MdOutlineDiscount
          return false
        }
        return true
      }),
      // ...S.documentTypeListItems()
    ])
  )
}
//
const url = process.env.SANITY_STUDIO_FRONTEND
// Customise this function to show the correct URL based on the current document
function getPreviewUrl(document, context) {

  let slug = document.slug.current

  // if(document.slug.current === "homepage"){
  //   return slug = ""
  // }
 const dataset = "production"
  const params = new URLSearchParams()
        params.set('preview', 'true')
        params.set('dataset', dataset)
  
  const previewUrl = `${url}/${slug}?${params}`

  return previewUrl
    // ? `${window.location.host}/${document.slug.current}`
    // : `${window.location.host}`
}
//!
// Simple example of web preview

// const WebPreview = ({document}) => {
//   const {displayed} = document
//   let slug = displayed.slug.current

//   if(displayed.slug.current === "homepage"){
//     return slug = ""
//   }
//  const dataset = "production"
//   const params = new URLSearchParams()
//         params.set('preview', 'true')
//         params.set('dataset', dataset)
  
//   const previewUrl = `${url}/${slug}?${params}`
        
//   return (
//     <iframe style={{width: "100%", height: 500}} src={previewUrl}/>
//   )
// }

export const defaultDocumentNode = (S, {schemaType}) => {
  // Conditionally return a different configuration based on the schema type
  switch (schemaType) {
    case `page`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (document) => ( getPreviewUrl(document)),
          })
          .title('Preview'),
      ])
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view.component(SEOPane).options({
          // Retrieve the keywords and synonyms at the given dot-notated strings
          keywords: `seo.keywords`,
          synonyms: `seo.synonyms`,
          url: (doc) => {
          
            return(resolveProductionUrl(doc))},
      
          // Alternatively, specify functions (may be async) to extract values
          // keywords: doc => doc.seo?.keywords,
          // synonyms: async(doc) => client.fetch('some query to get synonyms', {id: doc._id}),
          // url: async(doc) => client.fetch('some query to construct a url with refs', {id: doc._id})
        })
        .title('SEO')
      ]) 
    default:
      return S.document().views([S.view.form()])
  }
  // if (schemaType === "page") {
  //   return S.document().views([
  //     S.view.form(),
  //     S.view.component(WebPreview).title('Web Preview')
  //   ])  
  // }
  // if (schemaType === "post") {
     
  // }
  // return S.document().views([
  //   // S.view.form(),
  //   // S.view.component(SEOPane).options({
  //   //   // Retrieve the keywords and synonyms at the given dot-notated strings
  //   //   keywords: `seo.keywords`,
  //   //   synonyms: `seo.synonyms`,
  //   //   url: (doc) => resolveProductionUrl(doc),
  
  //   //   // Alternatively, specify functions (may be async) to extract values
  //   //   // keywords: doc => doc.seo?.keywords,
  //   //   // synonyms: async(doc) => client.fetch('some query to get synonyms', {id: doc._id}),
  //   //   // url: async(doc) => client.fetch('some query to construct a url with refs', {id: doc._id})
  //   // })
  //   // .title('SEO')
  // ])
 }
 
//  export default S.defaults()