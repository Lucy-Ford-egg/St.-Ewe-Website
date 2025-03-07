import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'

import {schema, brandColors} from './schemas'

import {Logo} from './plugins/logo/logo'
import {colorInput} from '@sanity/color-input'
import {media} from 'sanity-plugin-media'
import {deskStructure} from './structure/deskStructure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {theme} from './structure/theme'

import {simplerColorInput} from 'sanity-plugin-simpler-color-input'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'

import {presentationTool} from 'sanity/presentation'
// import {locate} from './locate'

// Config shared between datasets
const sharedConfig = {
  projectId: 'vmhe5utz',
  schema: schema,
  scheduledPublishing: {
    enabled: false,
  },
  apiVersion: '2023-08-01',
  theme,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    media(),
    unsplashImageAsset(),
    colorInput(),
    codeInput(),
    simplerColorInput(brandColors),
    imageHotspotArrayPlugin(),
    presentationTool({
      previewUrl: async () => {
        const url = process.env.SANITY_STUDIO_PRODUCTION_PREVIEW_URL || 'http://localhost:8000'
        return url
      },
      //locate: locate,
    }),
  ],
}

export default defineConfig([
  {
    name: 'default',
    title: 'St Ewe Eggs',
    dataset: 'production',
    basePath: '/production',
    ...sharedConfig,
    icon: Logo('production'),
  },
  {
    name: 'beta',
    title: 'Beta St Ewe',
    dataset: 'beta',
    basePath: '/beta',
    ...sharedConfig,
    icon: Logo('beta'),
  },
])
