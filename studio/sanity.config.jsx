import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, brandColors, googleMaps } from './schemas'


import { Logo } from './plugins/logo/logo'
import { googleMapsInput } from "@sanity/google-maps-input"
import { colorInput } from '@sanity/color-input'
import {media} from 'sanity-plugin-media'
import {deskStructure} from './structure/deskStructure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import {theme} from './structure/studioTheme'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'

import {presentationTool} from 'sanity/presentation'
import {locate} from './locate'

export default defineConfig({
  name: 'default',
  title: 'Taylor Money',
  projectId: '0y4lutj5',
  dataset: 'production',
  apiVersion: "2023-08-01",
  theme,
  graphql: [
    {
      playground: true,
      tag: 'production',
      workspace: 'production',
      id: 'production',
    },
  ],
  plugins: [
    structureTool({ 
        structure: deskStructure, 
      }),
    presentationTool({
      previewUrl: 'https://taylormoney.netlify.app', //'http://localhost:8000', //'https://taylormoney.netlify.app'
      locate: locate,
    }),
    visionTool(),
    media(),
    unsplashImageAsset(),
    colorInput(),
    googleMapsInput(googleMaps),
    simplerColorInput(brandColors)
  ],
  schema: {
    types: schemaTypes,
  },
  icon: Logo,
})
