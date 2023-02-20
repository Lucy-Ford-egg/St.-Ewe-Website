import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blockquote',
  type: 'object',
  title: 'Quote',
  fields: [
    defineField({
      name: 'text',
      type: 'text', // <= This can also be a Portable Text field
      title: 'Text',
    }),
    defineField({
      name: 'cite',
      type: 'string', // <= This could be a reference to an author document type, if you had that
      title: 'Citation',
    })
  ]
})