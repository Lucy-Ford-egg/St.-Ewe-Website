import { defineField, defineType } from 'sanity'

export default defineType({
  name: "titleText",
  type: "object",
  title: "Title, Text",
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title'
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{ 
        type: 'block',
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Numbered', value: 'number'}
        ] // yes please, both bullet and numbered
      }],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'}
        ]
      }
    }),
  ]
})