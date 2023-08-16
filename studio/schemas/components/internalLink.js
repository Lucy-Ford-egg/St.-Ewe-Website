
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
        { type: 'place' },
        { type: 'post' },
        { type: 'page' },
        { type: 'feature' },
        // other types you may want to link to
      ]
    })
  ]
})