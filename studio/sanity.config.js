import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { Logo } from './plugins/logo/logo'
import { googleMapsInput } from "@sanity/google-maps-input"
import {media} from 'sanity-plugin-media'
import {structure, defaultDocumentNode} from './structure/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Architectural Holidays',
  projectId: 'e1fodg96',
  dataset: 'production',
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
  parts: [
    {
      "implements": "part:@sanity/base/document-actions/resolver", 
      "path": "./previews/resolveDocumentActions.js"
    }
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