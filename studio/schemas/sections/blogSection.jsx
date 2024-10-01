import { defineField, defineType } from 'sanity'
import {LiaImage} from "react-icons/lia"

export default defineType({
  name: "blogSection",
  type: "object",
  title: "Blog Section",
  fields: [
    defineField({
      name: 'showArchive',
      type: 'showArchive',
      title: 'Show Archive',
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: 'Background Colour',
      name: 'backgroundColour',
      type: 'simplerColor',
      description: 'Add a background colour',
  }),
  defineField({
      name: 'verticalSpace',
      type: 'verticalSpace',
      title: 'Set the space required between sections',
  }), 
  ],
  preview: {
    select: {
      showArchive: 'showArchive'
    },
    prepare(selection) {
      const { showArchive } = selection

      return {
        title: showArchive.setArchive === true ? 'Displaying All Posts' : 'By Category',
        subtitle: `Blog Section`,
        // media: media,
        icon: LiaImage
      }
    }
  },
})