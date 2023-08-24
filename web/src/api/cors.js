// Is the SEO plugin trying to fetch and return HTML?
// AND is the Studio on a different URL to the website?
if (req.query.fetch) {
  // Allow requests from the Studio's URL
  console.log("fetch", req.query.fetch)
  const corsOrigin = host.includes('localhost') ? STUDIO_URL_DEV : STUDIO_URL_PROD
  res.setHeader('Access-Control-Allow-Origin', corsOrigin)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
}