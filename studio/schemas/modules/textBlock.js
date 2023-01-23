import { defineField, defineType } from 'sanity'
import {MdEditNote} from "react-icons/md";

export default defineType({
  name: "textBlock",
  title: "Text Module",
  type: 'object',
  preview: {
    select: {
      title: '',
      subtitle: 'title'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Text Module`,
        subtitle: ``,
        icon: MdEditNote,
      }
    }
  },
  fields: [
    defineField({
      name: 'content',
      title: 'Text Module',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})