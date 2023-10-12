export const resolveProductionUrl = (document) => {

  const url = process.env.SANITY_STUDIO_FRONTEND// window.location.hostname.includes("localhost") ? "http://localhost:8000" : "https://architecturalholidays.netlify.app"
  
  // console.log(`Frontend URL - ${url}`)

  const slug = document.slug?.current
  if (!slug) {
    return undefined
  }
  const routes = {
    page: `${url}/${slug}`,
    post: `${url}/blog/${slug}`,
    feature: `${url}/features-gallery/${slug}`,
    place: `${url}/places/${slug}`,

  }
  console.log("routes", routes[document._type])
  // ** Only show the preview option for documents for which a preview makes sense.
 
  return routes[document._type] ? routes[document._type] : undefined
}