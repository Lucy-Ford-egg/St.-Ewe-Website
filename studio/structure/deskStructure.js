// ./structure.js (.ts)
// import { SeoPreview } from '../previews/index'
import {SEOPane} from 'sanity-plugin-seo-pane'
import { resolveProductionUrl } from '../previews/resolveProductionUrl'


export const structure = (S, context) => {
  return(
  S.list()
    .title('Site Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      ...S.documentTypeListItems()
    ])
  )
}

export const defaultDocumentNode = (S, {schemaType}) => {
  // Conditionally return a different configuration based on the schema type
  if (schemaType === "post") {
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
  }
  return S.document().views([
    S.view.form(),
    S.view.component(SEOPane).options({
      // Retrieve the keywords and synonyms at the given dot-notated strings
      keywords: `seo.keywords`,
      synonyms: `seo.synonyms`,
      url: (doc) => resolveProductionUrl(doc),
  
      // Alternatively, specify functions (may be async) to extract values
      // keywords: doc => doc.seo?.keywords,
      // synonyms: async(doc) => client.fetch('some query to get synonyms', {id: doc._id}),
      // url: async(doc) => client.fetch('some query to construct a url with refs', {id: doc._id})
    })
    .title('SEO')
  ])
 }
 
//  export default S.defaults()