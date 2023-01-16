import { defineField, defineType } from 'sanity'

export default defineType({
  name: "map",
  type: "object",
  title: "Map with marker Module",
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title } = selection
      return {
        title: `Map with marker module`,
      }
    }
  },
  fields: [
    defineField({
      name: 'map',
      type: 'geopoint',
      title: 'Map'
    })
  ]
})