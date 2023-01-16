import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { Logo } from './plugins/logo/logo'
import { googleMapsInput } from "@sanity/google-maps-input"
// import {SeoPane} from "./plugins/sanity-plugin-seo-pane/"

export default defineConfig({
  name: 'default',
  title: 'Architectural Holidays',
  projectId: 'e1fodg96',
  dataset: 'production',
  plugins: [
    deskTool(), 
    visionTool(), 
    googleMapsInput({
      apiKey: "AIzaSyD-iPk4tHZ8FEhcbTWFWLPopgVd6yqS0lI"
    }),
    // SeoPane()
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
