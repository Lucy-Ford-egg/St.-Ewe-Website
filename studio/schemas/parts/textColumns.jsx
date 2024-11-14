import {defineField, defineType} from 'sanity'
import {LiaColumnsSolid} from 'react-icons/lia'

export default defineType({
  name: 'textColumns',
  type: 'object',
  title: 'Text Columns',
  icon: LiaColumnsSolid,
  fields: [
    defineField({
      name: 'columns',
      type: 'string',
      title: 'Number of Columns',
      options: {
        list: [
          {title: '1 Column', value: '1'},
          {title: '2 Columns', value: '2'},
          {title: '3 Columns', value: '3'},
          {title: '4 Columns', value: '4'},
          //{title: "Screen", value: "screen", description: "Removes original colour and applies a colour to the image"},
        ],
      },
    }),
  ],
  description:
    'Text columns will be disabled if you highlight more than one paragraph of text. Remove the paragraph space, select the whole text block and the text will be allowed to columnise',
})
