import { defineField, defineType } from 'sanity'
import { MdDashboard } from "react-icons/md";

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

      return {
        title: `Two Column, Title, Text, Call to Action module`,
        subtitle: `Used for Booking Information and Special Features`,
        icon: MdDashboard
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

