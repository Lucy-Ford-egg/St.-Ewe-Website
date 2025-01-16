export const isSanityPreview = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const previewMode = urlParams.get("previewMode")
  return previewMode === "true" || window.self !== window.top
}
