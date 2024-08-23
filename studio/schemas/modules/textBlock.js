import { defineField, defineType } from 'sanity'
import {MdEditNote} from "react-icons/lia";

export default defineType({
  name: "textBlock",
  title: "Text Module",
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Text Module',
      type: 'array',
      of: [{ 
        type: 'block', 
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ] // yes please, both bullet and numbered
        },
        {
          type: 'blockquote',
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: ''
    },
    prepare(selection) {

      const {title, subtitle} = selection
      return {
        title: title[0].children[0].text,
        subtitle: `Module: Text Module`,
        icon: MdEditNote,
      }
    }
  },
})