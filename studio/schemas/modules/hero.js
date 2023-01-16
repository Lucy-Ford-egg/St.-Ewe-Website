import { defineField, defineType } from 'sanity'

export default defineType({
  name: "hero",
  type: "object",
  title: "Hero",
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading'
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      title: 'Tagline'
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        })
      ]
    })
  ]
})