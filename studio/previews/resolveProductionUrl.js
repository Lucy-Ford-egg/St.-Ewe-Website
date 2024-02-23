export const resolveProductionUrl = (document) => {
  const url = process.env.SANITY_STUDIO_FRONTEND// window.location.hostname.includes("localhost") ? "http://localhost:8000" : "https://architecturalholidays.netlify.app"
  return url
}