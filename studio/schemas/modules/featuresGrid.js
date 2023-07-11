import { defineField, defineType } from 'sanity'
import {MdWebStories} from "react-icons/md"

export default defineType({
  name: "featureGrid",
  type: "object",
  title: "Feature Grid module",
  preview: {
    select: {
      title: 'title',
      subtitle: 'carousel'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: `Feature Grid module`,
        subtitle: ``,
        icon: MdWebStories
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
      name: 'features',
      title: 'Add Feature',
      type: 'array',
      description: 'Leave empty to show the latest features or add specific features to a grid.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'feature' }],
        },
     ],
     // validation: Rule => Rule.required().min(2)
    }),
  ]
})