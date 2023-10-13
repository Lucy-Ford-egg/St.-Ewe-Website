import {createClient} from "@sanity/client"
import imageUrlBuilder from "@sanity"

export const client = createClient({
projectId: 'e1fodg96',
dataset: 'production',
apiVersion: '2023-06-22',
useCdn: false, // must be false when using 'previewDrafts'
perspective: 'previewDrafts', // 'raw' | 'previewDrafts' | 'published'
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)