import { defineField, defineType } from 'sanity'
import { MdCenterFocusWeak } from "react-icons/md"

export default defineType({
  name: "heroInfoCallToAction",
  type: "object",
  title: "Hero Image, Text, Call to Action Module",
  description: "As the text is on the left selecting an image with some clear space to the left and visual focus to the right would be correct.",
  preview: {
    select: {
      title: 'title',
      subtitle: 'imageSize',

    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: `Hero Call to action caption module`,
        subtitle: title,
        icon: MdCenterFocusWeak
      }
    }
  },
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
    defineField({
      name: 'mobileImage',
      type: 'image',
      title: 'Mobile Image',
      description: 'Set this and use the Sanity hotspot crop feature to use this image for mobile',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'text',
      type: 'array',
      title: 'Text',
      of: [{
        type: 'block',
        // lists: [], // yes please, both bullet and numbered
        styles: [
          // { title: 'Heading 2', value: 'h2' },
          // { title: 'Heading 3', value: 'h3' },
          // { title: 'Heading 4', value: 'h4' },
        ],
        // marks: {
        //   decorators: [],
        //   annotations: []
        // }
      }],
    }),
    defineField({
      name: 'linkGroup',
      title: 'Call To Action',
      type: 'linkGroup'
    })
  ]
})