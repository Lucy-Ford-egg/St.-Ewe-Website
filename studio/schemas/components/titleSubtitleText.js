import { defineField, defineType } from 'sanity'
import moduleSpacing from '../moduleSpacingSizes'

export default defineType({
  name: "titleSubtitleText",
  type: "object",
  title: "Title, Subtitle, Text",
  fields: [
    defineField({
      name: 'displayTitle',
      type: 'array',
      title: 'Display Title',
      of: [{ 
        type: 'block',
        lists: [], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          // { title: 'Heading 3', value: 'h3' },
          // { title: 'Heading 4', value: 'h4' },
        ],
        marks: {
          decorators: [],
          annotations: []
        }
      }],
      description: "Sometimes titles look better being broken onto 2 lines. Use a soft return (shift + return) in the position of the string of text to achieve this.",   
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
    }),
    defineField({
      title: 'Module Spacing',
      name: 'moduleSpacing',
      type: 'string',
      options: {
        list: [
          ...moduleSpacing
        ],
      },
    }),
  ]
})