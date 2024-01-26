import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId:  'mq5c1tyr', //process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',
  apiVersion: "2023-11-01",
})

export const urlFor = (source) => {
  return builder.image(source)
}