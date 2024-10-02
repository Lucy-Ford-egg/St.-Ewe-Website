import { defineField, defineType } from 'sanity'
import { LiaGripHorizontalSolid } from "react-icons/lia"

export default defineType({
  name: "imageSection",
  type: "object",
  title: "Image Section",
  fields: [
    defineField({
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{
        type: 'image', options: {
          hotspot: true,
        },
      }]
    }),
    defineField({
      title: 'Side Assets',
      name: 'sideAssets',
      type: 'supportingAssets',
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
      title: 'title',
      textAlign: 'textAlign',
      media: 'images'

    },
    prepare(selection) {
      const { title, media, showSearch, textAlign } = selection
      return {
        title: title,
        subtitle: `Image Section`,
        media: media[0],
        icon: LiaGripHorizontalSolid
      }
    }
  },
})