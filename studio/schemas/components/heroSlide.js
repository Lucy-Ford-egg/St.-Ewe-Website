import { defineField, defineType } from 'sanity'

export default defineType({
  name: "heroSlide",
  type: "object",
  title: "Title Text",
  fields: [
    defineField({
      name: 'image',
      type: 'imageCaption',
      title: 'Image',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle'
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title'
    }),
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
      title: 'Text',
      description: 'The text is restricted to 170 characters as to not break the design',
      validation: Rule => Rule.required().min(50).max(170)
    }),
    defineField({
      name: 'linkGroup',
      title: 'Call To Action',
      type: 'linkGroup'
    })
  ]
})