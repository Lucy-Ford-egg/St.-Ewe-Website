import { defineField, defineType } from 'sanity'
import {MdGridView} from "react-icons/md"

export default defineType({
  name: "placesGrid",
  type: "object",
  title: "Places grid module",
  fields: [
    defineField({
      name: 'gridTitleSubtitleText',
      type: 'titleSubtitleText',
      title: 'Add a Title, subtitle, text' 
    }),
    defineField({
      name: 'places',
      title: 'Add Places',
      type: 'array',
      description: 'Leave empty to show the latest places or add specific places to a grid.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'place' }],
        },
     ]
    }),
    defineField({
      name: 'showFilter',
      type: 'boolean',
      title: 'Show Filter?',
      initialValue: false,
      description: 'By checking this the module will display with the filter. Defaults to false'
    }),
  ],
  preview: {
    select: {
      title: 'gridTitleSubtitleText',
      subtitle: 'places'
    },
    prepare(selection) {
      const {title, subtitle} = selection

      return {
        title: title ? title?.displayTitle[0].children[0].text : "Empty Title",
        subtitle: `${subtitle && subtitle?.length > 0 ? "Curated Places" : "All Places"} | Module: Places Grid module`,
        icon: MdGridView
      }
    }
  },
})