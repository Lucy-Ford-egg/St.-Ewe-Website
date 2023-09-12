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
const url = window.location.hostname.includes("localhost") ? "http://localhost:8000" : "https://architecturalholidays.netlify.app"
// Customise this function to show the correct URL based on the current document
function getPreviewUrl(document, context) {
console.log("URL", url )
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

}
//!

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
            reload: {
              button: true,
            },
          })
          .title('Preview'),
      ])
    case `post`:
      console.log("Document, --", document)
      return S.document().views([
        S.view.form(),
        S.view.component(SEOPane).options({
          // Retrieve the keywords and synonyms at the given dot-notated strings
          keywords: `seo.keywords`,
          synonyms: `seo.synonyms`,
          url: (document) => {
          
            return(resolveProductionUrl(document))},
      
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
 }
 