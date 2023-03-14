import { defineField, defineType } from 'sanity'

export default defineType({
  name: "imageAlt",
  type: 'image',
  title: "Image",
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      validation: Rule => Rule.required(),
    }),
  ],
  validation: Rule => Rule.required(),
})