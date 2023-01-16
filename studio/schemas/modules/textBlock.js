import { defineField, defineType } from 'sanity'
import sizes from '../sizes'

export default defineType({
  name: "textBlock",
  type: 'object',
  title: "Text Module",
  fields: [
    defineField({
      name: 'content',
      title: 'Text Module',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})