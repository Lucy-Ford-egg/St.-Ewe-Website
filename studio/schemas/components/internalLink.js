
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'internalLink',
  type: 'object',
  title: 'Internal link',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Link Label'
    }),
    defineField({
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [
        { type: 'post' },
        { type: 'page' },
        // other types you may want to link to
      ]
    })
  ]
})