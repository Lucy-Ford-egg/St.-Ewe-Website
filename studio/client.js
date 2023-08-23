import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity"

export const client = sanityClient({
projectId: 'e1fodg96',
dataset: 'production',
apiVersion: '2023-05-31',
useCdn: false, // must be false when using 'previewDrafts'
perspective: 'previewDrafts', // 'raw' | 'previewDrafts' | 'published'
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)