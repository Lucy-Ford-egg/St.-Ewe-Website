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

import {presentationTool} from 'sanity/presentation'
import {locate} from './locate'
  
export default defineConfig({
  name: 'default',
  title: 'Taylor Money',
  projectId:  '0y4lutj5',
  dataset: 'production',
  theme,
  plugins: [
    structureTool({ 
        structure: deskStructure, 
      }),
    presentationTool({
      // Required: set the base URL to the preview location in the front end
      previewUrl: 'http://localhost:8000', //'https://taylormoney.netlify.app'
      locate: locate,
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

