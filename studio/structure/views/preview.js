import IframePreview from '../previews/iframePreview'
import {SEOPane} from 'sanity-plugin-seo-pane'


const remoteURL = 'https://architecturalholidays.netlify.app' // either production or a specialized deploy branch for previews
const localURL = 'http://localhost:8000' // local development port from Gatsby
const previewUrl = window.location.hostname === 'localhost' ? localURL : remoteURL

export const Views = (S, context) => {
  return [
    S.view.form(), // Default Sanity's form view for editing content
    S.view
      .component(IframePreview)
      .options({ previewUrl, isMobilePreview: false, context })
      .title('Preview'), // Iframe custom view for desktop screens
    S.view
      .component(IframePreview)
      .options({ previewUrl, isMobilePreview: true, context })
      .title('Mobile Preview'), // Iframe custom view for mobile screens
    S.view
      .component(SEOPane)
      .options({
        // Retrieve the keywords and synonyms at the given dot-notated strings
        keywords: `seo.keywords`,
        synonyms: `seo.synonyms`,
        url: previewUrl,
    
        // Alternatively, specify functions (may be async) to extract values
        // keywords: doc => doc.seo?.keywords,
        // synonyms: async(doc) => client.fetch('some query to get synonyms', {id: doc._id}),
        // url: async(doc) => client.fetch('some query to construct a url with refs', {id: doc._id})
      })
      .title('SEO')
  ]
}