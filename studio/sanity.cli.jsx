import {defineCliConfig} from 'sanity/cli'
import {nodePolyfills} from 'vite-plugin-node-polyfills'


export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: 'production',
  },
  graphql: [
    {
      playground: false,
      workspace: 'prodcuction',
      id: 'production-schema',
    },
  ],
  vite: (prev) => ({
    ...prev,
    plugins: [...prev.plugins, nodePolyfills({util: true})],
    define: {
      ...prev.define,
      'process.env': {},
    },
  }),
})
