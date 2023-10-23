import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { Logo } from './plugins/logo/logo'
import { googleMapsInput } from "@sanity/google-maps-input"
import {media} from 'sanity-plugin-media'
import {deskStructure} from './structure/deskStructure'
import {theme} from 'https://themer.sanity.build/api/hues?default=484947;600;darkest:4a4c28&primary=4d502a;600&transparent=484947;600&positive=43d675;300&caution=fbd027;200&lightest=fdfdfc&darkest=080807'

export default defineConfig({
  name: 'default',
  title: 'Heligan Campsite',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',
  theme,
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

