import { defineField, defineType } from 'sanity'

export default defineType({
  name: "linkGroup",
  type: "object",
  title: "Link",
  fields: [
    defineField({
        name: 'externalLinkGroup',
        type: 'externalLink',
        title: 'External link',
    }),
    defineField({
        name: 'internalLinkGroup',
        type: 'internalLink',
        title: 'Internal Link'
    }),
  ]
})