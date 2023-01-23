import { defineField, defineType } from 'sanity'
import {MdGridView} from "react-icons/md"

export default defineType({
  name: "placesGrid",
  type: "object",
  title: "Places grid module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'carousel'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Places Grid module`,
        subtitle: ``,
        icon: MdGridView
      }
    }
  },
  fields: [
    defineField({
      name: 'gridTitleSubtitleText',
      type: 'titleSubtitleText',
      title: 'Add a Title, subtitle, text' 
    }),
    defineField({
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      description: 'Leave empty to show the latest places or add specific places to a grid.',
      to: [
        { type: 'place' },
        // other types you may want to link to
      ]
    })
  ]
})