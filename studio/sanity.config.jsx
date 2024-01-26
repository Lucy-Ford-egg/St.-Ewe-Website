import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { Logo } from './plugins/logo/logo'
import { googleMapsInput } from "@sanity/google-maps-input"
import { colorInput } from '@sanity/color-input'
import {media} from 'sanity-plugin-media'
import {deskStructure} from './structure/deskStructure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import {theme} from './structure/studioTheme'
  
export default defineConfig({
  name: 'default',
  title: 'Heligan Campsite',
  projectId:  'mq5c1tyr',
  dataset: 'production',
  theme,
  plugins: [
    // deskTool({ 
    //   structure: deskStructure, 
    // }),
    structureTool({ 
        structure: deskStructure, 
      }),
    visionTool(),
    media(),
    unsplashImageAsset(),
    colorInput(),
    googleMapsInput({
      apiKey: "AIzaSyD-iPk4tHZ8FEhcbTWFWLPopgVd6yqS0lI"
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  icon: Logo,
})

