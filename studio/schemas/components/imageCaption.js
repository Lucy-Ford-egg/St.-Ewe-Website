import { defineField, defineType } from 'sanity'

export default defineType({
  name: "imageCaption",
  type: 'image',
  title: "Image",
  fields: [
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption'
    })
  ],
  validation: Rule => Rule.required(),
})