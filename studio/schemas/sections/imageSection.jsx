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
      of: [
        // {
        //   type: 'image', 
        //   options: {
        //     hotspot: true,
        //   },
        // },
        {type: 'imageLink'},]
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Product', value: 'product'},
          {title: 'Mood', value: 'mood'},
          {title: 'Icons', value: 'icons'},
        ],
        layout: 'radio',
      },
      intialValue: 'mood',
      description: 'Select product to show square images which can be user scrolled and clicked. Select Mood for a scroll activated gallery.'
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
      media: 'images',
      type: 'type'

    },
    prepare(selection) {
      const { title, media, showSearch, type  } = selection

      return {
        title: title,
        subtitle: `Image Section (${type})`,
        media: media[0]?.image,
        icon: LiaGripHorizontalSolid
      }
    }
  },
})