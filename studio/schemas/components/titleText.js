import { defineField, defineType } from 'sanity'

export default defineType({
  name: "titleText",
  type: "object",
  title: "Title Text",
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title'
    }),
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
      title: 'Text'
    })
  ]
})