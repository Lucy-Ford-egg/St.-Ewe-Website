import IframePreview from '../previews/iframePreview'
// import {SEOPane} from 'sanity-plugin-seo-pane'
// import {getUrl} from '../previews/iframePreview'

const remoteURL = process.env.SANITY_STUDIO_FRONTEND // either production or a specialized deploy branch for previews
const localURL = 'http://localhost:8000' // local development port from Gatsby
const previewUrl = process.env.SANITY_STUDIO_FRONTEND

export const Views = (S, context) => {
  return [
    S.view.form(), // Default Sanity's form view for editing content
    S.view
      .component(IframePreview)
      .options({previewUrl, isMobilePreview: false, context})
      .title('Preview'), // Iframe custom view for desktop screens
    S.view
      .component(IframePreview)
      .options({previewUrl, isMobilePreview: true, context})
      .title('Mobile Preview'), // Iframe custom view for mobile screens
    // S.view
    //   .component(SEOPane)
    //   .options({
    //     // Retrieve the keywords and synonyms at the given dot-notated strings
    //     keywords: `seo.keywords`,
    //     synonyms: `seo.synonyms`,
    //     url: async(document) => {
    //       const response = await fetch(previewUrl)
    //       const url = response;
    //       console.log(`What url - ${JSON.stringify(url)}`)
    //       return url
    //     }

    //     // url: async (document) => {
    //     //   // console.log(`Document Preview ${JSON.stringify(document)}`)
    //     //   const displayed = document
          
    //     //   return getUrl({ previewUrl, displayed, context })
    //     // },

    //     // Alternatively, specify functions (may be async) to extract values
    //     // keywords: doc => doc.seo?.keywords,
    //     // synonyms: async(doc) => client.fetch('some query to get synonyms', {id: doc._id}),
    //     // url: async(doc) => client.fetch('some query to construct a url with refs', {id: doc._id})
    //   })
    //   .title('SEO'),
  ]
}
