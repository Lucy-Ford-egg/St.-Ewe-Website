import {defineType} from 'sanity'

export default defineType({
  name: 'alignment',
  title: 'Align Component',
  type: 'string',
  options: {
    list: [
      {title: 'Left', type: 'string', value: 'left'},
      {title: 'Center', type: 'string', value: 'center'},
      {title: 'Right', type: 'string', value: 'right'},
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
  initialValue: () => 'center',
  preview: {
    select: {
      list: 'list',
    },
    prepare(selection) {
      const {list} = selection

      return {
        title: list,
      }
    },
  },
})
