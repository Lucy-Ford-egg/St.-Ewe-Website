import {createClient} from "@sanity/client"
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
projectId: '0y4lutj5',
dataset: 'production',
apiVersion: "2023-08-01",
useCdn: false, // must be false when using 'previewDrafts'
perspective: 'previewDrafts', // 'raw' | 'previewDrafts' | 'published'
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)