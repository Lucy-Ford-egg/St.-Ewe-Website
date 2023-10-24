import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { Logo } from './plugins/logo/logo'
import { googleMapsInput } from "@sanity/google-maps-input"
import { colorInput } from '@sanity/color-input'
import {media} from 'sanity-plugin-media'
import {deskStructure} from './structure/deskStructure'
import {theme} from './structure/studioTheme'
  
export default defineConfig({
  name: 'default',
  title: 'Heligan Campsite',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',
  theme,
  plugins: [
    deskTool({ 
      structure: deskStructure, 
    }),
    visionTool(),
    media(),
    colorInput(),
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
  },
})

