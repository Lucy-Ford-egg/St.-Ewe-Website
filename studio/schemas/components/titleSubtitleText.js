import { defineField, defineType } from 'sanity'
import titleSize from '../titleSize'
import widths from '../widths'
import moduleSpacing from '../moduleSpacingSizes'

export default defineType({
  name: "titleSubtitleText",
  type: "object",
  title: "Title, Subtitle, Text",
  initialValue: {
    titleWidth: {
      list: "100%"
    }
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title'
    }),
    defineField({
      title: 'Select title size',
      name: 'titleSize',
      type: 'string',
      options: {
        list: [
          ...titleSize
        ],
      },
    }),
    defineField({
      title: 'Adjust the width of the title',
      name: 'titleWidth',
      type: 'string',
      description: 'Sometimes adjusting the width of the title nudging text onto 2 lines makes for a nicer design',
      options: {
        list: [
          ...widths
        ],
      },
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