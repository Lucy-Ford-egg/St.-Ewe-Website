import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId:  '0y4lutj5', //process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',
  apiVersion: "2023-08-01",
})

export const urlFor = (source) => {
  return builder.image(source)
}