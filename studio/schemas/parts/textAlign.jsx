import { defineType } from 'sanity'

export default defineType({
  name: 'textAlign',
  title: 'Text Align',
  type: "string",
  options: {
    list: [
      { title: 'Left', type: 'string', value: 'left' },
      { title: 'Center', type: 'string', value: 'center' },
    ],
    layout: 'radio',
    direction: 'horizontal'
  },
  initialValue: () => 'center',
  preview: {
    select: {
      list: 'list',
    },
    prepare(selection) {
      const { list } = selection

      return {
        title: list,
      }
    },
  },
})
