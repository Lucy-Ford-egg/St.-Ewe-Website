import { defineField, defineType } from 'sanity'
import moduleSpacingSizes from '../schemas/moduleSpacingSizes'

export default defineType({
  name: "moduleSpacing",
  type: 'object',
  title: "Space Between Modules",
  description: "Some components require different top and bottom space between them.",
  fields: [
    defineField({
      title: 'Top module spacing',
      name: 'topModuleSpacing',
      type: 'number',
      options: {
        list: [
          ...moduleSpacingSizes
        ],
      },
    }),
    defineField({
      title: 'Bottom module spacing',
      name: 'bottomModuleSpacing',
      type: 'number',
      options: {
        list: [
          ...moduleSpacingSizes
        ],
      },
    }),
  ],
})