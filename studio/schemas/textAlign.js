export default {
  title: 'Text Align',
  name: 'textAlign',
  type: 'string',
  options: {
    list: [
      { title: 'Left', type: 'string', value: 'left' },
      { title: 'Center', type: 'string', value: 'center' },
    ], // &lt;-- predefined values
    layout: 'radio',
    direction: 'horizontal'
  },
  initialValue: {
    title: 'Center', 
  },
  initialValue: 'center',
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
}