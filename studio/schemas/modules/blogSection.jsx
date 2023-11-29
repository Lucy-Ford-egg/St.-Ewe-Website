import { defineField, defineType } from 'sanity'
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md"

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
      name: 'topPadding',
      type: 'boolean',
      title: 'Remove top padding',
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
        icon: MdOutlinePhotoSizeSelectActual
      }
    }
  },
})