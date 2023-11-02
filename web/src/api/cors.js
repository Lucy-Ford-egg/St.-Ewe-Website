// Is the SEO plugin trying to fetch and return HTML?
// AND is the Studio on a different URL to the website?
if (req.query.fetch) {
  // Allow requests from the Studio's URL
  console.log("fetch", req.query.fetch)
  const corsOrigin = host.includes('localhost') ? STUDIO_URL_DEV : STUDIO_URL_PROD
  res.setHeader('Access-Control-Allow-Origin', corsOrigin)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
}

res.setPreviewData({})

// Return just the HTML if the SEO plugin is requesting it
if (req.query.fetch) {
  // Create preview URL
  console.log(`CMS Fetch - ${req.query.fetch}`)
  const baseOrigin = host.includes('localhost') ? STUDIO_URL_DEV : STUDIO_URL_PROD
  const absoluteUrl = new URL(slug, baseOrigin).toString()

  // Create preview headers from the setPreviewData above
  const previewHeader = res.getHeader('Set-Cookie')
  const previewHeaderString =
    typeof previewHeader === 'string' || typeof previewHeader === 'number'
      ? previewHeader.toString()
      : previewHeader?.join('; ')
  const headers = new Headers()
  headers.append('credentials', 'include')
  headers.append('Cookie', previewHeaderString ?? '')

  const previewHtml = await fetch(absoluteUrl, { headers }).then((previewRes) => {
    console.log(`Preview String ${previewRes.text()}`)
    previewRes.text()
  }).catch((err) => console.error(err))
  return res.send(previewHtml)
}