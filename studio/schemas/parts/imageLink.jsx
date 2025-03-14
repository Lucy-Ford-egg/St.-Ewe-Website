import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageLink',
  type: 'object',
  title: 'Image & Link',
  fields: [
    defineField({
        name: 'image',
        type: 'image', 
        options: {
            hotspot: true,
        },
    }),
    defineField({
      type: 'link',
      name: 'link', 
    })
  ],
  preview: {
    select: {
        media: 'image'
    },
    prepare({ title, media }) {
        return {
            title: `Link`,
            subtitle: ``,
            media: media,
        }
    },
},
})