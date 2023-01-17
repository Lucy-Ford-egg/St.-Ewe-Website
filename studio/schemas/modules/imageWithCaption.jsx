import { defineField, defineType } from 'sanity'
import sizes from '../sizes'

export default defineType({
  name: "imageWithCaption",
  type: "object",
  title: "Image w/caption Module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'imageSize',
      image: 'image'
    },
    prepare(selection) {
      const {title, subtitle, image} = selection
      return {
        title: `Image with caption module`,
        subtitle: `Image Size ${subtitle} - ${image.alt}`
      }
    }
  },
  fields: [
    defineField({
      name: 'image',
      type: 'imageCaption',
      title: 'Image',
    }),
    defineField({
      title: 'Image Size',
      name: 'imageSize',
      type: 'string',
      options: {
        list: [
          ...sizes
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
        title: 'Make Portrait',
        name: 'portrait',
        type: 'boolean',
        initialValue: false,
    }),
    defineField({
      name: 'editorTitle',
      type: 'string',
      title: 'Editor Title',
      description: 'Add a title to make it easier to know which sections are which.'
    }),
  ]
})