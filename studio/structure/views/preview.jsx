import {SEOPane} from 'sanity-plugin-seo-pane'

const remoteURL = 'https://heligancampsite.netlify.app' // ! For some reason env.vars aren't working process.env.SANITY_STUDIO_FRONTEND // either production or a specialized deploy branch for previews
const localURL = 'https://localhost:8000' // local development port from Gatsby
const previewUrl = window.location.hostname.includes('localhost') ? localURL : remoteURL


const resolveProductionUrl = (doc) => {
  console.log(`RPU - ${previewUrl}`)
  return previewUrl
}
// const previewUrl = process.env.SANITY_STUDIO_FRONTEND
export const Views = (S, context) => {

  console.log(`previewUrl = ${previewUrl}`)
  return [
    S.view.form(), // Default Sanity's form view for editing content
    
    S.view
      .component(SEOPane)
      .options({
        // Retrieve the keywords and synonyms at the given dot-notated strings
        keywords: `seo.keywords`,
        synonyms: `seo.synonyms`,
        url: (doc) => resolveProductionUrl(doc),
      })
      .title('SEO'),
  ]
}
