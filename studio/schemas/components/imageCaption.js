import { defineField, defineType } from 'sanity'

export default defineType({
  name: "imageCaption",
  type: 'image',
  title: "Image",
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text'
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption'
    })
  ],
})