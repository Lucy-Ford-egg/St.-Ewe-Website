import { defineField, defineType } from 'sanity'
import {MdViewColumn} from "react-icons/md";

export default defineType({
  name: "twoColumnTitleTextCta",
  type: "object",
  title: "Two Column, Title, Text, Call to Action Module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'imageSize'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      debugger
      return {
        title: `Two Column, Title, Text, Call to Action module`,
        subtitle: title,
        icon: MdViewColumn
      }
    }
  },
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [{ 
        type: 'titleText', 
        options: {
        },
      }],
    }),
    defineField({
      name: 'linkGroup',
      title: 'Call To Action',
      type: 'linkGroup'
    })
  ]
})

