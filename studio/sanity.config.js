import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { Logo } from './plugins/logo/logo'
import { googleMapsInput } from "@sanity/google-maps-input"
import {media} from 'sanity-plugin-media'
import {deskStructure} from './structure/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Heligan Campsite',
  projectId: 'mq5c1tyr',
  dataset: 'production',
  plugins: [
    deskTool({ structure: deskStructure }),
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