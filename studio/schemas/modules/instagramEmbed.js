import { defineField, defineType } from 'sanity'

export default defineType({
  name: "instagramEmbed",
  type: "object",
  title: "Instagram Embed Module",
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title } = selection
      return {
        title: `Instagram Embed Module`,
      }
    }
  },
  fields: [
    defineField({
      name: 'instagramUrl',
      type: 'instagramUrl',
      title: 'Instagram Url'
    })
  ]
})