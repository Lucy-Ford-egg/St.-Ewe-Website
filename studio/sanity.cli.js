import {defineCliConfig} from 'sanity/cli'
import {nodePolyfills} from 'vite-plugin-node-polyfills'


export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  },
  graphql: [
    {
      id: 'production',
      workspace: 'default',
    },
    {
      id: 'beta',
      workspace: 'beta',
    },
  ],
  vite: (prev) => ({
    ...prev,
    plugins: [...prev.plugins, nodePolyfills({util: true,  module: true })],
    define: {
      ...prev.define,
      'process.env': {},
    },
  }),
})

