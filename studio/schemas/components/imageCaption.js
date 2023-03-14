import { defineField, defineType } from 'sanity'

export default defineType({
  name: "imageCaption",
  type: 'image',
  title: "Image",
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption'
    })
  ],
  validation: Rule => Rule.required(),
})