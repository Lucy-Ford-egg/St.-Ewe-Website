import { defineField, defineType } from 'sanity'

export default defineType({
  name: "titleSubtitleText",
  type: "object",
  title: "Title, Subtitle, Text",
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title'
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle'
    }),
    defineField({
      name: 'subtitlePosition',
      type: 'boolean',
      title: 'Subtitle Below Title',
      description: 'Set this to display the subtitle below the title'
    }),
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
      title: 'Text',
      description: 'Add some textual content. Optional'
    })
  ]
})