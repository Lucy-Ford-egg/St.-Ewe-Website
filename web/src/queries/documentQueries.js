// * Helpful - https://www.sanity.io/docs/query-cheat-sheet
 
export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  ...,
  title,
  pageBuilder
}`

export const pageQuery = `*[_type == "page" && slug.current == $slug][0] {
  ...,
  title,
  pageBuilder,
}`

export const placeQuery = `*[_type == "place" && slug.current == $slug][0] {
  ...,
  title,
  pageBuilder,
}`