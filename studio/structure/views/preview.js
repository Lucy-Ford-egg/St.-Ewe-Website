import IframePreview from '../previews/iframePreview'

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
  ]
}