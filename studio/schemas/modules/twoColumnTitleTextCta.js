import { defineField, defineType } from 'sanity'
import { MdDashboard } from "react-icons/md";

export default defineType({
  name: "twoColumnTitleTextCta",
  type: "object",
  title: "Two Column, Title, Text, CTA Module",
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
  ],
  preview: {
    select: {
      title: 'columns',
      subtitle: 'imageSize'
    },
    prepare(selection) {
      const {title, subtitle} = selection
debugger
      return {
        title: title && title !== "undefined" ? title[0].title[0].children[0].text : "Empty Columns",
        subtitle: `Used for Booking Information and Special Features | Module : Two Column, Title, Text, CTA Module`,
        icon: MdDashboard
      }
    }
  },
})

