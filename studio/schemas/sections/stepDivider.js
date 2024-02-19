import { defineField, defineType } from 'sanity'
import {MdInfoOutline} from "react-icons/md"

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
      debugger
      return {
        title: `${ title}`,
        subtitle: `Step Divider`,
        icon: MdInfoOutline
      }
    }
  },
})