import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, brandColors, googleMaps} from './schemas'

import {Logo} from './plugins/logo/logo'
import {googleMapsInput} from '@sanity/google-maps-input'
import {colorInput} from '@sanity/color-input'
import {media} from 'sanity-plugin-media'
import {deskStructure} from './structure/deskStructure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {theme} from './structure/theme'

import {simplerColorInput} from 'sanity-plugin-simpler-color-input'

import {presentationTool} from 'sanity/presentation'
import {locate} from './locate'


export default defineConfig([{
  name: 'default',
  title: 'St Ewe Eggs',
  projectId: 'vmhe5utz',
  dataset: 'production',
  basePath: '/production',
  apiVersion: '2023-08-01',
  theme,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    presentationTool({
      previewUrl: async () => {
        const url = process.env.SANITY_STUDIO_PRODUCTION_PREVIEW_URL || 'http://localhost:8000'
        return url
      },
      locate: locate,
    }),
    visionTool(),
    media(),
    unsplashImageAsset(),
    colorInput(),
    googleMapsInput(googleMaps),
    simplerColorInput(brandColors),
  ],
  schema: {
    types: schemaTypes,
  },
  icon: Logo("production"),
}, 
{
  name: 'beta',
  title: 'Beta St Ewe',
  projectId: 'vmhe5utz',
  dataset: 'beta',
  basePath: '/beta',
  apiVersion: '2023-08-01',
  theme,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    presentationTool({
      previewUrl: async () => {
        const url = process.env.SANITY_STUDIO_PRODUCTION_PREVIEW_URL || 'http://localhost:8000'
        return url
      },
      locate: locate,
    }),
    visionTool(),
    media(),
    unsplashImageAsset(),
    colorInput(),
    googleMapsInput(googleMaps),
    simplerColorInput(brandColors),
  ],
  schema: {
    types: schemaTypes,
  },
  icon: Logo("beta"),
}
])
