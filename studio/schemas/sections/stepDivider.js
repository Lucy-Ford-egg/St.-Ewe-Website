import { defineField, defineType } from 'sanity'
import {LiaInfoCircleSolid} from "react-icons/lia"

export default defineType({
  name: "stepDivider",
  type: "object",
  title: "Step Divider",
  fields: [
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Title',
      name: 'title',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection
      
      return {
        title: `${ title}`,
        subtitle: `Step Divider`,
        icon: LiaInfoCircleSolid
      }
    }
  },
})