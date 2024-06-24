import {SEOPane} from 'sanity-plugin-seo-pane'

// ...all other list items

const remoteURL = 'https://taylormoney.com' // ! For some reason env.vars aren't working process.env.SANITY_STUDIO_FRONTEND // either production or a specialized deploy branch for previews
const localURL = 'https://localhost:8000' // local development port from Gatsby
const previewUrl = window.location.hostname.includes('localhost') ? localURL : remoteURL


export const resolveProductionUrl = (doc) => {
  console.log(`RPU - ${previewUrl}`)
  return previewUrl
}


export const SeoPreview = (S, context) => {
  
  return (
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
  )
}