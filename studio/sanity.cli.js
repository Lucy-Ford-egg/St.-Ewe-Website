import {defineCliConfig} from 'sanity/cli'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

export default defineCliConfig({
  api: {
    projectId: 'e1fodg96',
    dataset: 'production',
    vite: (prev) => ({
      ...prev,
      plugins: [...prev.plugins, nodePolyfills({util: true})],
      define: {
        ...prev.define,
        'process.env': {},
      },
    }),
  }
})
