import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    defineType({
    title: 'Internal Link',
    name: 'internalLink',
    description: 'Select pages for navigation',
    type: 'reference',
    to: [{ type: 'page' },{ type: 'post' }], 
    }),
    defineType({
      name: 'externalUrl',
      title: 'External URL',
      description:"Use fully qualified URLS for external link",
      type: 'url',
    }),
  ]
});