import { defineField, defineType } from 'sanity'
import {MdWebStories} from "react-icons/md"

export default defineType({
  name: "featureGrid",
  type: "object",
  title: "Feature Grid module",
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
  ],
  preview: {
    select: {
      title: 'gridTitleSubtitleText',
      subtitle: 'features'
    },
    prepare(selection) {
      const {title, subtitle} = selection

      return {
        title: title ? title.displayTitle[0].children[0].text : "Empty Title",
        subtitle: `${subtitle.length > 0 ? "All Features" : "Curated Features"} | Module: Feature Grid module`,
        icon: MdWebStories
      }
    }
  },
})