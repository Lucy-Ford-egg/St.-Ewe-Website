import groq from 'groq'

// * Helpful - https://www.sanity.io/docs/query-cheat-sheet


export const postQuery =  groq`*[_type == "post" && slug.current == $slug][0] {
  ...,
  title,
  image {
    asset->,
  },
  mobileImage {
    asset->,
  },
}`

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0] {
  ...,
  pageBuilder[] {..., searchColour->},
  title,
  text,
  image {
    asset->,
  },
  mobileImage {
    asset->,
  },
 
}`