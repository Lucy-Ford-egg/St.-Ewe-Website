import { defineField, defineType } from 'sanity'
import { MdCenterFocusWeak } from "react-icons/md"

export default defineType({
  name: "heroInfoCallToAction",
  type: "object",
  title: "Hero, Info, CTA, Caption Module",
  description: "As the text is on the left selecting an image with some clear space to the left and visual focus to the right would be correct.",
  fields: [
    defineField({
      name: 'image',
      type: 'imageCaption',
      title: 'Image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      type: 'imageCaption',
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'linkGroup',
      title: 'Call To Action',
      type: 'linkGroup'
    })
  ],
  preview: {
    select: {
      title: 'text',
      media: 'image'
    },
    prepare(selection) {
  
      const { title, media } = selection
      return {
        title: title[0].children[0].text,
        subtitle: `Module: Hero, Info, CTA, Caption Module`,
        media: media,
        icon: MdCenterFocusWeak
      }
    }
  },
})