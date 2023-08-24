export const resolveProductionUrl = (document) => {
  const slug = document.slug?.current
  if (!slug) {
    return undefined
  }
  const routes = {
    page: `${process.env.SANITY_STUDIO_FRONTEND}/${slug}`,
    post: `${process.env.SANITY_STUDIO_FRONTEND}/blog/${slug}`,
    feature: `${process.env.SANITY_STUDIO_FRONTEND}/features-gallery/${slug}`,
    place: `${process.env.SANITY_STUDIO_FRONTEND}/places/${slug}`,

  }
  console.log("routes", routes[document._type])
  // ** Only show the preview option for documents for which a preview makes sense.
 
  return routes[document._type] ? routes[document._type] : undefined
}