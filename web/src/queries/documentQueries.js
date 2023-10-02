export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  ...,
  title,
}`