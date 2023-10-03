export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  ...,
  title,
 
}`

export const pageQuery = `*[_type == "page" && slug.current == $slug][0] {
  ...,
  title,
 
}`

export const placeQuery = `*[_type == "place" && slug.current == $slug][0] {
  ...,
  title,
 
}`