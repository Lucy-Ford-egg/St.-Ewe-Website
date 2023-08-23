import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { Logo } from './plugins/logo/logo'
import { googleMapsInput } from "@sanity/google-maps-input"
import {media} from 'sanity-plugin-media'
import {structure, defaultDocumentNode} from './structure/deskStructure'
import {resolveProductionUrl} from './previews/resolveProductionUrl'

// import {createClient} from '@sanity/client'

// const client = createClient({
//   ...config,
//   useCdn: false, // must be false for 'previewDrafts'
//   perspective: 'previewDrafts', // 'raw' | 'published' | 'previewDrafts' 
// })

export default defineConfig({
  name: 'default',
  title: 'Architectural Holidays',
  projectId: 'e1fodg96',
  dataset: 'production',
  document: {
    // prev is the result from previous plugins and thus can be composed
    productionUrl: async (prev, context) => {
      // context includes the client and other details
      const {getClient, dataset, document} = context
      const client = getClient({apiVersion: '2023-05-31'})
      console.log("doc - ", document)
      if (document._type === 'post' || document._type === 'page' || document._type === 'feature' || document._type === 'place') {
       
        // const slug = await client.fetch(
        //   `*[_type == 'routeInfo' && post._ref == $postId][0].slug.current`,
        //   {postId: document._id}
        // )
       
        const params = new URLSearchParams()
        params.set('preview', 'true')
        params.set('dataset', dataset)
        const url = resolveProductionUrl(document)
        console.log("url - ", url)
        return `${url}?${params}`
      }

      return prev
    },
  },
  plugins: [
    deskTool(
      {
      structure,
      defaultDocumentNode,
    }
    ),
    visionTool(),
    media(), 
    googleMapsInput({
      apiKey: "AIzaSyD-iPk4tHZ8FEhcbTWFWLPopgVd6yqS0lI"
    }),
    
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: Logo
    }
  }
})