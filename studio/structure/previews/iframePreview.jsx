import React, { useState, useEffect } from 'react'
import { useValidationStatus } from 'sanity'


export const getUrl = ({previewUrl, displayed, context, validation}) => {


  const basePreviewUrl = previewUrl
  const {slug, _type} = displayed
  const checkHome = (slug) => {
    if (slug.current.includes('home-page')) {
      return `${basePreviewUrl}`
    }
    else{
      return `${basePreviewUrl}/${slug}`
    }
   
  }
  const routes = {
    page: checkHome(slug),
    post: `${basePreviewUrl}/blog/${slug}`,
    feature: `${basePreviewUrl}/features-gallery/${slug}`,
    place: `${basePreviewUrl}/places/${slug}`,

  }
  
  // Append the slug to the base URL to get the final page preview URL
  const finalPagePreviewUrl = routes[_type]

  return `${finalPagePreviewUrl}?previewMode=true&previewDataset=${context.dataset}`.toString()
  // return `${finalPagePreviewUrl}`
}


// Function to assemble the preview URL based on the displayed object
const assembleProjectUrl = ({ displayed, context, previewUrl, validation, isNewUnpublishedDoc }) => {
  // Construct the base preview URL
 
  const basePreviewUrl = previewUrl
  const slug = displayed?.slug?.current
  const validationArray = encodeURIComponent(JSON.stringify(validation))

  // Check if slug or basePreviewUrl is missing
  if (!slug || !basePreviewUrl) {
    console.warn('Missing slug or previewURL', { slug, basePreviewUrl })
    return ''
  }

  const checkHome = (slug) => {
    if (slug.includes('home-page')) {
      return `${basePreviewUrl}`
    }
    else{
      return `${basePreviewUrl}/${slug}`
    }
   
  }
  const routes = {
    page: checkHome(slug),
    post: `${basePreviewUrl}/blog/${slug}`,
    feature: `${basePreviewUrl}/features-gallery/${slug}`,
    place: `${basePreviewUrl}/places/${slug}`,

  }
  
  // Append the slug to the base URL to get the final page preview URL
  const finalPagePreviewUrl = routes[displayed._type]

  return `${finalPagePreviewUrl}?previewMode=true&previewDataset=${context.dataset}&validation=${validationArray}&isNewUnpublishedDoc=${isNewUnpublishedDoc}`
  // return `${finalPagePreviewUrl}`

}

// Component for rendering an iframe preview
const IframePreview = ({ document, options }) => {
  const [url, setUrl] = useState(null)
  const { isMobilePreview, context, previewUrl } = options

  // Get validation status
  const { isValidating, validation } = useValidationStatus(
    document?.published?._id || document?.displayed?._rev || document?.displayed?._id?.replace('drafts.', ''),
    document?.published?._type || document?.displayed?._type
  )

  const isNewUnpublishedDoc = !document?.published?._id

  // Update the URL when the document prop changes
  useEffect(() => {

    const { displayed } = document

    setUrl(assembleProjectUrl({ displayed, context, previewUrl, validation, isNewUnpublishedDoc }))
  }, [document, validation])

  const { displayed } = document

  // Render a message if there is no document to preview
  if (!displayed) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <p>There is no document to preview</p>
      </div>
    )
  }

  // Render a message if there is a problem with the URL
  if (!url) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          padding: '10px',
        }}
      >
        <p>
          There has been a problem constructing the web front-end URL. Please reselect the preview.
        </p>
      </div>
    )
  }
 
  // Render the iframe preview
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            maxWidth: isMobilePreview ? '360px' : 'none',
            maxHeight: isMobilePreview ? '800px' : 'none',
            transformOrigin: 'center',
            transform: isMobilePreview ? 'scale(1.3)' : 'none', // Scale the iframe size if it's a mobile preview
          }}
        >
          
          <iframe
            
            id="iframeid"
            title="Iframe-preview-noa"
            src={url}
            allow="clipboard-write"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </>
  )
}

export default IframePreview