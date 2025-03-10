import { defineField, defineType } from 'sanity'

export default defineType({
  name: "map",
  type: "object",
  title: "Map, Marker Module",
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title } = selection
      return {
        title: `Map, Marker Module`,
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