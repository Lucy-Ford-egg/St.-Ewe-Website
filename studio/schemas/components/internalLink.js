
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'internalLink',
  type: 'object',
  title: 'Internal link',
  fields: [
    defineField({
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [
        { type: 'place' },
        { type: 'news' },
        // other types you may want to link to
      ]
    })
  ]
})