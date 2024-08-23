import { defineField, defineType } from 'sanity'
import { MdEditNote } from "react-icons/lia";

export default defineType({
  name: "embedBlock",
  title: "Embed Module",
  type: 'object',
  preview: {
    select: {
      title: '',
      subtitle: 'title'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: `Embed Module`,
        subtitle: ``,
        icon: MdEditNote,
      }
    }
  },
  fields: [
    defineField({
      name: 'content',
      title: 'Embed Module',
      type: 'array',
      of: [{
        type: 'block',
        styles: [],
        lists: [
          // {title: 'Bullet', value: 'bullet'},
          // {title: 'Numbered', value: 'number'}
        ], // yes please, both bullet and numbered
        marks: {
          decorators: [],
          annotations: []
        }
      },
      ],
    }),
  ],
})